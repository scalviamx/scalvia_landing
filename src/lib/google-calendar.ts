function getCredentials() {
  const clientId     = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN
  if (!clientId || !clientSecret || !refreshToken)
    throw new Error('Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_REFRESH_TOKEN')
  return { clientId, clientSecret, refreshToken }
}

async function getAccessToken() {
  const { clientId, clientSecret, refreshToken } = getCredentials()
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }).toString(),
    cache: 'no-store',
  })

  const body = (await response.json().catch(() => null)) as { access_token?: string; error?: string } | null
  if (!response.ok || !body?.access_token) {
    throw new Error(`Google OAuth token refresh failed (${response.status}${body?.error ? `: ${body.error}` : ''})`)
  }

  return body.access_token
}

async function googleCalendarRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const accessToken = await getAccessToken()
  const response = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  })

  const body = (await response.json().catch(() => null)) as T | ({ error?: { message?: string } } & Record<string, unknown>) | null
  if (!response.ok) {
    const message =
      body && typeof body === 'object' && 'error' in body && body.error && typeof body.error === 'object'
        ? body.error.message
        : undefined
    throw new Error(`Google Calendar request failed (${response.status}${message ? `: ${message}` : ''})`)
  }

  return body as T
}

export type BusyBlock = { startMin: number; endMin: number }

/**
 * Returns busy time blocks (in minutes-since-midnight) for a given date.
 * dateStr: 'YYYY-MM-DD'
 */
export async function getBusySlots(dateStr: string): Promise<BusyBlock[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary'

  const dayStart = new Date(`${dateStr}T00:00:00-06:00`)
  const dayEnd = new Date(`${dateStr}T00:00:00-06:00`)
  dayEnd.setDate(dayEnd.getDate() + 1)

  const res = await googleCalendarRequest<{
    calendars?: Record<string, { busy?: Array<{ start?: string; end?: string }> }>
  }>('/freeBusy', {
    method: 'POST',
    body: JSON.stringify({
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      timeZone: 'America/Monterrey',
      items: [{ id: calendarId }],
    }),
  })

  const busy = res.calendars?.[calendarId]?.busy ?? []
  return busy.map(b => {
    const start = new Date(b.start!)
    const end   = new Date(b.end!)
    const startMin = Math.round((start.getTime() - dayStart.getTime()) / 60000)
    const endMin   = Math.round((end.getTime()   - dayStart.getTime()) / 60000)
    return { startMin, endMin }
  })
}

export interface CalendarEventInput {
  date: string        // 'YYYY-MM-DD'
  startMin: number    // minutes since midnight
  durationMin: number
  summary: string     // e.g. "Baño + Corte — Firulais"
  description?: string
}

export async function createCalendarEvent(input: CalendarEventInput): Promise<string> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary'

  const toISO = (dateStr: string, min: number) => {
    const d = new Date(`${dateStr}T00:00:00-06:00`)
    d.setMinutes(d.getMinutes() + min)
    return d.toISOString()
  }

  const res = await googleCalendarRequest<{ id?: string }>(`/calendars/${encodeURIComponent(calendarId)}/events`, {
    method: 'POST',
    body: JSON.stringify({
      summary: input.summary,
      description: input.description,
      start: { dateTime: toISO(input.date, input.startMin), timeZone: 'America/Monterrey' },
      end:   { dateTime: toISO(input.date, input.startMin + input.durationMin), timeZone: 'America/Monterrey' },
    }),
  })
  const id = res.id
  if (!id) throw new Error('Calendar event created but no ID returned')
  return id
}
