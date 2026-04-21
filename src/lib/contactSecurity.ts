import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'

export const CONTACT_BODY_MAX_BYTES = 16 * 1024
export const CONTACT_RATE_LIMIT_MAX_ATTEMPTS = 5
export const CONTACT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
export const CONTACT_RAPID_WINDOW_MS = 60 * 1000
export const CONTACT_RAPID_THRESHOLD = 2
export const CONTACT_MIN_HUMAN_FILL_MS = 3_000
export const CONTACT_MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000

export const VALID_SECTORS = new Set([
  'industrial',
  'bienes_raices',
  'despacho',
  'otro',
] as const)

export type SectorKey = 'industrial' | 'bienes_raices' | 'despacho' | 'otro'

type RateLimitBucket = {
  attempts: number[]
}

const rateLimitBuckets = new Map<string, RateLimitBucket>()
const fallbackSigningSecret = randomBytes(32).toString('hex')

export type ContactPayload = {
  nombre: string
  email: string
  empresa: string
  whatsapp?: string
  sector?: SectorKey
  reto?: string
  _honeypot?: string
  turnstileToken?: string
  submittedAt?: string
  submittedSig?: string
}

export function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return ''
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (normalized.length > maxLength) return ''
  return normalized
}

export function normalizeOptionalText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return undefined
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (!normalized) return undefined
  if (normalized.length > maxLength) return null
  return normalized
}

export function isEmailValid(email: string) {
  if (email.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isWhatsappValid(whatsapp: string) {
  if (whatsapp.length < 7 || whatsapp.length > 24) return false
  return /^[+()\-\d\s.]+$/.test(whatsapp)
}

export function normalizeContactPayload(raw: unknown): ContactPayload | null {
  if (!raw || typeof raw !== 'object') return null

  const payload = raw as Record<string, unknown>
  const nombre = normalizeText(payload.nombre, 120)
  const email = normalizeText(payload.email, 254).toLowerCase()
  const empresa = normalizeText(payload.empresa, 120)
  const whatsapp = normalizeOptionalText(payload.whatsapp, 24)
  const sectorRaw = normalizeOptionalText(payload.sector, 32)
  const reto = normalizeOptionalText(payload.reto, 1_000)
  const _honeypot = normalizeOptionalText(payload._honeypot, 160)
  const turnstileToken = normalizeOptionalText(payload.turnstileToken, 4_096)
  const submittedAt = normalizeOptionalText(payload.submittedAt, 32)
  const submittedSig = normalizeOptionalText(payload.submittedSig, 128)

  if (!nombre || !email || !empresa) return null
  if (whatsapp === null) return null
  if (sectorRaw === null) return null
  if (reto === null) return null
  if (_honeypot === null) return null
  if (turnstileToken === null) return null
  if (submittedAt === null) return null
  if (submittedSig === null) return null

  if (!isEmailValid(email)) return null
  if (whatsapp && !isWhatsappValid(whatsapp)) return null

  if (sectorRaw && !VALID_SECTORS.has(sectorRaw as SectorKey)) {
    return null
  }

  return {
    nombre,
    email,
    empresa,
    whatsapp,
    sector: sectorRaw as SectorKey | undefined,
    reto,
    _honeypot,
    turnstileToken,
    submittedAt,
    submittedSig,
  }
}

function pruneAttempts(attempts: number[], now: number) {
  return attempts.filter((ts) => now - ts <= CONTACT_RATE_LIMIT_WINDOW_MS)
}

export function registerIpAttempt(ip: string, now = Date.now()) {
  const bucket = rateLimitBuckets.get(ip) ?? { attempts: [] }
  const attempts = pruneAttempts(bucket.attempts, now)
  if (!attempts.length) {
    rateLimitBuckets.delete(ip)
  }

  const blocked = attempts.length >= CONTACT_RATE_LIMIT_MAX_ATTEMPTS

  if (!blocked) {
    attempts.push(now)
  }

  bucket.attempts = attempts
  rateLimitBuckets.set(ip, bucket)

  const rapidAttempts = attempts.filter((ts) => now - ts <= CONTACT_RAPID_WINDOW_MS).length
  const retryAfterMs = blocked
    ? Math.max(1_000, CONTACT_RATE_LIMIT_WINDOW_MS - (now - attempts[0]))
    : 0

  return {
    blocked,
    rapidAttempts,
    retryAfterMs,
  }
}

export function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}

function normalizeOrigin(value: string) {
  return value.replace(/\/+$/, '').toLowerCase()
}

export function getAllowedOrigins(req: NextRequest) {
  const fromEnv = (process.env.CONTACT_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((item) => normalizeOrigin(item.trim()))
    .filter(Boolean)

  if (fromEnv.length) return fromEnv

  const proto = req.headers.get('x-forwarded-proto') || 'https'
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host')
  if (!host) return []

  const normalizedHost = host.toLowerCase()
  const origins = new Set<string>()
  origins.add(normalizeOrigin(`${proto}://${normalizedHost}`))

  if (normalizedHost.startsWith('www.')) {
    origins.add(normalizeOrigin(`${proto}://${normalizedHost.slice(4)}`))
  } else {
    origins.add(normalizeOrigin(`${proto}://www.${normalizedHost}`))
  }

  return [...origins]
}

export function isOriginAllowed(req: NextRequest) {
  const origin = req.headers.get('origin')
  if (!origin) return false

  const normalizedOrigin = normalizeOrigin(origin)
  return getAllowedOrigins(req).includes(normalizedOrigin)
}

function getSigningSecret() {
  return process.env.CONTACT_FORM_SIGNING_SECRET || fallbackSigningSecret
}

export function signTimestamp(timestamp: string) {
  return createHmac('sha256', getSigningSecret()).update(timestamp).digest('hex')
}

export function createSignedTimingToken(now = Date.now()) {
  const submittedAt = String(now)
  const submittedSig = signTimestamp(submittedAt)
  return { submittedAt, submittedSig }
}

export function verifySignedTimingToken(
  submittedAt: string | undefined,
  submittedSig: string | undefined,
  now = Date.now()
) {
  if (!submittedAt || !submittedSig) return { valid: false, tooFast: false }
  if (!/^\d{10,16}$/.test(submittedAt)) return { valid: false, tooFast: false }
  if (!/^[a-f0-9]{64}$/i.test(submittedSig)) return { valid: false, tooFast: false }

  const expectedSig = signTimestamp(submittedAt)
  const providedBuffer = Buffer.from(submittedSig, 'utf8')
  const expectedBuffer = Buffer.from(expectedSig, 'utf8')
  const sigValid =
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)

  if (!sigValid) return { valid: false, tooFast: false }

  const submittedAtMs = Number(submittedAt)
  if (!Number.isFinite(submittedAtMs)) return { valid: false, tooFast: false }

  const ageMs = now - submittedAtMs
  if (ageMs < CONTACT_MIN_HUMAN_FILL_MS) return { valid: false, tooFast: true }
  if (ageMs > CONTACT_MAX_FORM_AGE_MS) return { valid: false, tooFast: false }

  return { valid: true, tooFast: false }
}

export async function verifyTurnstileToken(token: string | undefined, ip?: string) {
  if (!token) return false

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return false

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    })
    if (ip && ip !== 'unknown') {
      body.set('remoteip', ip)
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      cache: 'no-store',
    })

    if (!response.ok) return false
    const json = (await response.json()) as { success?: boolean }
    return Boolean(json.success)
  } catch {
    return false
  }
}
