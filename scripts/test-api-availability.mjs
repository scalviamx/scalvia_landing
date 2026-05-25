import { google } from 'googleapis'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n').filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => { const [k, ...v] = l.split('='); return [k.trim(), v.join('=').trim()] })
)

const oauth2 = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET)
oauth2.setCredentials({ refresh_token: env.GOOGLE_REFRESH_TOKEN })
const cal = google.calendar({ version: 'v3', auth: oauth2 })

// Step 1: Create event at 3pm
const ev = await cal.events.insert({
  calendarId: 'primary',
  requestBody: {
    summary: '🐾 Test bloqueo 15:00',
    start: { dateTime: '2026-05-26T15:00:00-06:00', timeZone: 'America/Monterrey' },
    end:   { dateTime: '2026-05-26T16:00:00-06:00', timeZone: 'America/Monterrey' },
  }
})
console.log('1. Event created in Google Calendar:', ev.data.id)

// Step 2: Query our API
const res = await fetch('http://localhost:3002/api/lalanuda/availability?date=2026-05-26')
const data = await res.json()
console.log('2. API response:', JSON.stringify(data))

// Step 3: Check if 900min (15:00) is blocked
const blocked = data.busy?.some(b => b.startMin <= 900 && b.endMin >= 960)
console.log('3. 15:00-16:00 slot blocked by API?', blocked ? '✅ YES' : '❌ NO')

// Cleanup
await cal.events.delete({ calendarId: 'primary', eventId: ev.data.id })
console.log('4. Test event cleaned up')
