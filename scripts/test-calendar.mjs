import { google } from 'googleapis'
import { readFileSync } from 'fs'

// Parse .env.local manually
const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => { const [k, ...v] = l.split('='); return [k.trim(), v.join('=').trim()] })
)

const oauth2 = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET)
oauth2.setCredentials({ refresh_token: env.GOOGLE_REFRESH_TOKEN })
const calendar = google.calendar({ version: 'v3', auth: oauth2 })
// Try 'primary' first, which always works for the authenticated user's main calendar
const calId = 'primary'

// 1. Create test event at 3pm tomorrow
console.log('Creating test event at 15:00 on 2026-05-26...')
const event = await calendar.events.insert({
  calendarId: calId,
  requestBody: {
    summary: '🐾 Test Firulais · Baño',
    start: { dateTime: '2026-05-26T15:00:00-06:00', timeZone: 'America/Monterrey' },
    end:   { dateTime: '2026-05-26T16:00:00-06:00', timeZone: 'America/Monterrey' },
  }
})
console.log('✅ Event created:', event.data.id)

// 2. Query freebusy for that day
console.log('\nQuerying freebusy for 2026-05-26...')
const dayStart = new Date('2026-05-26T00:00:00-06:00')
const dayEnd   = new Date('2026-05-27T00:00:00-06:00')
const fb = await calendar.freebusy.query({
  requestBody: {
    timeMin: dayStart.toISOString(),
    timeMax: dayEnd.toISOString(),
    timeZone: 'America/Monterrey',
    items: [{ id: calId }],
  }
})
const busy = fb.data.calendars[calId].busy
console.log('Busy blocks:', JSON.stringify(busy, null, 2))

// 3. Compute startMin/endMin
for (const b of busy) {
  const start = new Date(b.start)
  const end   = new Date(b.end)
  const startMin = Math.round((start.getTime() - dayStart.getTime()) / 60000)
  const endMin   = Math.round((end.getTime()   - dayStart.getTime()) / 60000)
  console.log(`  → startMin=${startMin} (${startMin/60}h), endMin=${endMin} (${endMin/60}h)`)
}

// 4. Clean up test event
await calendar.events.delete({ calendarId: calId, eventId: event.data.id })
console.log('\n🧹 Test event deleted from calendar')
