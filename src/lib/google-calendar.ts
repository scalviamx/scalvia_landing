import { google } from 'googleapis'

function getAuth() {
  const clientId     = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN
  if (!clientId || !clientSecret || !refreshToken)
    throw new Error('Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_REFRESH_TOKEN')
  const oauth2 = new google.auth.OAuth2(clientId, clientSecret)
  oauth2.setCredentials({ refresh_token: refreshToken })
  return oauth2
}

export type BusyBlock = { startMin: number; endMin: number }

/**
 * Returns busy time blocks (in minutes-since-midnight) for a given date.
 * dateStr: 'YYYY-MM-DD'
 */
export async function getBusySlots(dateStr: string): Promise<BusyBlock[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary'

  const auth = getAuth()
  const calendar = google.calendar({ version: 'v3', auth })

  const dayStart = new Date(`${dateStr}T00:00:00-06:00`)
  const dayEnd = new Date(`${dateStr}T00:00:00-06:00`)
  dayEnd.setDate(dayEnd.getDate() + 1)

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      timeZone: 'America/Monterrey',
      items: [{ id: calendarId }],
    },
  })

  const busy = res.data.calendars?.[calendarId]?.busy ?? []
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

  const auth = getAuth()
  const calendar = google.calendar({ version: 'v3', auth })

  const toISO = (dateStr: string, min: number) => {
    const d = new Date(`${dateStr}T00:00:00-06:00`)
    d.setMinutes(d.getMinutes() + min)
    return d.toISOString()
  }

  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: input.summary,
      description: input.description,
      start: { dateTime: toISO(input.date, input.startMin), timeZone: 'America/Monterrey' },
      end:   { dateTime: toISO(input.date, input.startMin + input.durationMin), timeZone: 'America/Monterrey' },
    },
  })
  const id = res.data.id
  if (!id) throw new Error('Calendar event created but no ID returned')
  return id
}
