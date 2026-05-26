'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BlurFade } from '@/components/ui/BlurFade'

type FormState = 'idle' | 'loading' | 'success' | 'error'
type ContactChallenge = { submittedAt: string; submittedSig: string }
type ContactApiResponse = {
  success?: boolean
  error?: string
  code?: string
  challenge?: ContactChallenge
}

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
const CHALLENGE_MAX_AGE_MS = 90 * 60 * 1000

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string
      execute: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

let turnstileScriptPromise: Promise<void> | null = null

function loadTurnstileScript() {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  if (turnstileScriptPromise) return turnstileScriptPromise

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TURNSTILE_SCRIPT_SRC}"]`
    )
    if (existing) {
      if (window.turnstile) {
        resolve()
        return
      }

      const onLoad = () => resolve()
      const onError = () => reject(new Error('turnstile_script_error'))
      existing.addEventListener('load', onLoad, { once: true })
      existing.addEventListener('error', onError, { once: true })
      window.setTimeout(() => {
        if (window.turnstile) {
          resolve()
        } else {
          reject(new Error('turnstile_script_timeout'))
        }
      }, 4_000)
      return
    }

    const script = document.createElement('script')
    script.src = TURNSTILE_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('turnstile_script_error'))
    document.head.appendChild(script)
  })

  return turnstileScriptPromise
}

export function Contacto() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [sector, setSector] = useState('')
  const [challenge, setChallenge] = useState<ContactChallenge | null>(null)
  const [challengeFetchedAt, setChallengeFetchedAt] = useState(0)

  const setTransientError = useCallback((message: string) => {
    setErrorMsg(message)
    setState('error')
    window.setTimeout(() => setState('idle'), 5000)
  }, [])

  const fetchChallenge = useCallback(async () => {
    try {
      const res = await fetch('/api/contact/challenge', { cache: 'no-store' })
      const json = (await res.json().catch(() => null)) as ContactChallenge | null
      if (!res.ok || !json?.submittedAt || !json?.submittedSig) return null
      setChallenge(json)
      setChallengeFetchedAt(Date.now())
      return json
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    void fetchChallenge()
  }, [fetchChallenge])

  const ensureChallenge = useCallback(async () => {
    if (challenge && Date.now() - challengeFetchedAt < CHALLENGE_MAX_AGE_MS) {
      return challenge
    }
    return fetchChallenge()
  }, [challenge, challengeFetchedAt, fetchChallenge])

  const requestTurnstileToken = useCallback(async () => {
    if (!TURNSTILE_SITE_KEY) return null

    try {
      await loadTurnstileScript()
      if (!window.turnstile) return null
      const turnstile = window.turnstile

      return await new Promise<string | null>((resolve) => {
        const host = document.createElement('div')
        host.style.display = 'none'
        document.body.appendChild(host)

        let widgetId: string | null = null
        let settled = false
        const finish = (value: string | null) => {
          if (settled) return
          settled = true
          if (widgetId) {
            turnstile.remove(widgetId)
          }
          host.remove()
          resolve(value)
        }

        widgetId = turnstile.render(host, {
          sitekey: TURNSTILE_SITE_KEY,
          size: 'invisible',
          callback: (token: string) => finish(token),
          'error-callback': () => finish(null),
          'expired-callback': () => finish(null),
        })

        turnstile.execute(widgetId)
        window.setTimeout(() => finish(null), 9_000)
      })
    } catch {
      return null
    }
  }, [])

  const postContact = useCallback(async (payload: Record<string, unknown>) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = (await res.json().catch(() => ({}))) as ContactApiResponse
    return { res, json }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')
    setState('loading')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const contactChallenge = await ensureChallenge()
      if (!contactChallenge) {
        setTransientError('No pudimos validar tu envío. Intenta de nuevo.')
        return
      }

      const basePayload: Record<string, unknown> = {
        ...data,
        submittedAt: contactChallenge.submittedAt,
        submittedSig: contactChallenge.submittedSig,
      }

      let { res, json } = await postContact(basePayload)

      if (res.status === 403 && json.code === 'challenge_required') {
        const serverChallenge =
          json.challenge?.submittedAt && json.challenge?.submittedSig ? json.challenge : null
        if (serverChallenge) {
          setChallenge(serverChallenge)
          setChallengeFetchedAt(Date.now())
        }

        const turnstileToken = await requestTurnstileToken()
        if (!turnstileToken) {
          setTransientError('No pudimos validar tu envío. Intenta de nuevo.')
          return
        }

        const retryChallenge = serverChallenge ?? (await ensureChallenge())
        if (!retryChallenge) {
          setTransientError('No pudimos validar tu envío. Intenta de nuevo.')
          return
        }

        ;({ res, json } = await postContact({
          ...data,
          turnstileToken,
          submittedAt: retryChallenge.submittedAt,
          submittedSig: retryChallenge.submittedSig,
        }))
      }

      if (res.ok && json.success) {
        setState('success')
        form.reset()
        setSector('')
        void fetchChallenge()
      } else {
        setTransientError(json.error || 'Error al enviar. Intenta de nuevo.')
      }
    } catch {
      setTransientError('Error de red. Intenta de nuevo.')
    }
  }

  return (
    <>
      {/* Hero forest */}
      <section className="bg-forest pt-28 pb-20 px-6 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(61,187,122,0.10) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-w-[760px] mx-auto text-center">
          <BlurFade delay={0.05}>
            <div className="inline-flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-growth bg-growth/10 border border-growth/20 px-3.5 py-1.5 rounded-full mb-6">
              Diagnóstico gratuito
            </div>
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
              ¿Listo para que tu empresa trabaje más{' '}
              <span className="text-growth">inteligente</span>?
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-[520px] mx-auto">
              Analizamos tu operación en 30 minutos y te mostramos exactamente qué procesos puedes automatizar con IA, sin costo.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Formulario */}
      <section id="contacto" className="flex-1 flex items-center py-16 px-6 bg-white" aria-labelledby="cta-title">
        <div className="w-full max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <BlurFade className="flex flex-col">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold tracking-widest uppercase text-growth">Contacto</p>
                <h2
                  id="cta-title"
                  className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight leading-tight text-ink"
                >
                  ¿Listo para que tu empresa trabaje más{' '}
                  <span className="text-growth">inteligente</span>?
                </h2>
                <p className="text-base text-ink-60 leading-relaxed">
                  Agenda un diagnóstico gratuito. Analizamos tu operación y te mostramos exactamente qué se puede
                  automatizar.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.15}>
              <form
                id="formulario-contacto"
                onSubmit={handleSubmit}
                noValidate
                className="bg-surface border border-border rounded-3xl p-8 sm:p-10 text-left flex flex-col gap-5"
                aria-label="Formulario de contacto"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8125rem] font-semibold text-ink-60" htmlFor="nombre">
                      Nombre completo <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Tu nombre"
                      className="text-ink bg-white border border-border rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth transition-all placeholder:text-ink/45"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8125rem] font-semibold text-ink-60" htmlFor="empresa">
                      Empresa <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      required
                      autoComplete="organization"
                      placeholder="Nombre de tu empresa"
                      className="text-ink bg-white border border-border rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth transition-all placeholder:text-ink/45"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8125rem] font-semibold text-ink-60" htmlFor="email">
                      Correo electrónico <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="tu@empresa.com"
                      className="text-ink bg-white border border-border rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth transition-all placeholder:text-ink/45"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8125rem] font-semibold text-ink-60" htmlFor="whatsapp">
                      WhatsApp <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+52 81 1234 5678"
                      className="text-ink bg-white border border-border rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth transition-all placeholder:text-ink/45"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.8125rem] font-semibold text-ink-60" htmlFor="sector">
                    Sector
                  </label>
                  <div className="relative">
                    <select
                      id="sector"
                      name="sector"
                      value={sector}
                      onChange={(event) => setSector(event.target.value)}
                      className={`w-full bg-white border border-border rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth transition-all appearance-none cursor-pointer ${
                        sector === '' ? 'text-ink/55' : 'text-ink'
                      }`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(30,41,59,0.45)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                        paddingRight: '36px',
                      }}
                    >
                      <option value="">Selecciona tu sector</option>
                      <option value="industrial" className="bg-white text-ink">
                        Industrial / Manufactura
                      </option>
                      <option value="bienes_raices" className="bg-white text-ink">
                        Bienes Raíces
                      </option>
                      <option value="despacho" className="bg-white text-ink">
                        Despacho / Servicios Profesionales
                      </option>
                      <option value="otro" className="bg-white text-ink">
                        Otro
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.8125rem] font-semibold text-ink-60" htmlFor="reto">
                    ¿Cómo te podemos ayudar?
                  </label>
                  <textarea
                    id="reto"
                    name="reto"
                    rows={3}
                    placeholder="Ej. Tardamos demasiado en responder leads, el equipo de RH está saturado..."
                    className="text-ink bg-white border border-border rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth transition-all placeholder:text-ink/45 resize-none leading-relaxed"
                  />
                </div>

                <div style={{ display: 'none' }} aria-hidden="true">
                  <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" />
                </div>

                <motion.button
                  type="submit"
                  disabled={state === 'loading' || state === 'success'}
                  whileHover={state === 'idle' ? { y: -1 } : {}}
                  whileTap={state === 'idle' ? { y: 0 } : {}}
                  className={`w-full font-bold text-base py-4 rounded-xl transition-all duration-200 ${
                    state === 'success'
                      ? 'bg-green text-white cursor-default'
                      : state === 'error'
                      ? 'bg-red-600 text-white'
                      : 'bg-growth text-ink hover:bg-[#2ea865] hover:shadow-[0_8px_28px_rgba(61,187,122,0.35)]'
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {state === 'loading' && 'Enviando...'}
                  {state === 'success' && '¡Diagnóstico agendado! Te contactamos pronto ✓'}
                  {state === 'error' && (errorMsg || 'Error, intenta de nuevo')}
                  {state === 'idle' && 'Solicitar diagnóstico gratuito →'}
                </motion.button>
              </form>
            </BlurFade>
          </div>
        </div>
      </section>
    </>
  )
}
