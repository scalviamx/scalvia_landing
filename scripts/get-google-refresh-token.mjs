/**
 * Run once to get your Google OAuth2 refresh token.
 * Usage: node scripts/get-google-refresh-token.mjs
 */
import { createServer } from 'http'
import { google } from 'googleapis'
import { exec } from 'child_process'

// Set these before running: export GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=...
const CLIENT_ID     = process.env.GOOGLE_CLIENT_ID     || 'REPLACE_WITH_CLIENT_ID'
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'REPLACE_WITH_CLIENT_SECRET'
const REDIRECT_URI  = 'http://localhost:3333/callback'

const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const authUrl = oauth2.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: ['https://www.googleapis.com/auth/calendar'],
})

console.log('\nAbriendo navegador para autorizar...\n')
exec(`open "${authUrl}"`)

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3333')
  const code = url.searchParams.get('code')
  if (!code) { res.end('Sin código'); return }

  try {
    const { tokens } = await oauth2.getToken(code)
    res.end('<h2>✅ Autorizado. Cierra esta ventana y ve la terminal.</h2>')
    server.close()

    console.log('\n─────────────────────────────────────────────')
    console.log('Agrega estas vars a .env.local y a Vercel:\n')
    console.log(`GOOGLE_CLIENT_ID=${CLIENT_ID}`)
    console.log(`GOOGLE_CLIENT_SECRET=${CLIENT_SECRET}`)
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`)
    console.log(`GOOGLE_CALENDAR_ID=<tu-email-de-gmail>`)
    console.log('─────────────────────────────────────────────\n')
  } catch (err) {
    res.end('Error: ' + err.message)
    server.close()
  }
}).listen(3333)

console.log('Esperando autorización en http://localhost:3333/callback ...')
