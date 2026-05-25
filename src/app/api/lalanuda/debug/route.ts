import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { createCalendarEvent } from '@/lib/google-calendar'

export const runtime = 'nodejs'

export async function GET() {
  const results: Record<string, unknown> = {}

  const token = process.env.NOTION_TOKEN
  const dbId  = process.env.NOTION_LALANUDA_DB_ID
  if (!token || !dbId) {
    results.notion = { ok: false, error: 'NOTION_TOKEN or NOTION_LALANUDA_DB_ID not set in env' }
  } else {
    try {
      const notion = new Client({ auth: token })
      const page = await notion.pages.create({
        parent: { database_id: dbId },
        properties: {
          'ID Cita':         { title:     [{ text: { content: 'debug_endpoint_test' } }] },
          'Fecha':           { date:      { start: new Date().toISOString().slice(0, 10) } },
          'Cliente':         { rich_text: [{ text: { content: 'Debug Test' } }] },
          'Email':           { email:     'debug@test.com' },
          'Mascota':         { rich_text: [{ text: { content: 'TestPet · Perro' } }] },
          'Raza':            { rich_text: [{ text: { content: 'Labrador' } }] },
          'Tamaño':          { select:    { name: 'Grande' } },
          'Servicios':       { rich_text: [{ text: { content: 'Baño ($300)' } }] },
          'Total MXN':       { number:    300 },
          'Comisión 6% MXN': { number:    18 },
          'Método de pago':  { select:    { name: 'Efectivo' } },
          'Notas':           { rich_text: [{ text: { content: '—' } }] },
          'Hora inicio':     { rich_text: [{ text: { content: '15:00' } }] },
          'Duración min':    { number:    60 },
        },
      })
      results.notion = { ok: true, pageId: (page as { id: string }).id }
    } catch (err) {
      results.notion = { ok: false, error: err instanceof Error ? err.message : String(err) }
    }
  }

  try {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateStr = tomorrow.toISOString().slice(0, 10)
    const eventId = await createCalendarEvent({
      date: dateStr,
      startMin: 600,
      durationMin: 30,
      summary: '🐾 Debug Test — La Lanuda',
      description: 'Automated debug endpoint test. Safe to delete.',
    })
    results.calendar = { ok: true, eventId, date: dateStr, startMin: 600 }
  } catch (err) {
    results.calendar = { ok: false, error: err instanceof Error ? err.message : String(err) }
  }

  const allOk = Object.values(results).every((r) => (r as { ok: boolean }).ok)
  return NextResponse.json({ allOk, results }, { status: allOk ? 200 : 500 })
}
