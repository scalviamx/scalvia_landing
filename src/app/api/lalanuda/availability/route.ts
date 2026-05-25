import { NextRequest, NextResponse } from 'next/server'
import { getBusySlots } from '@/lib/google-calendar'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Missing or invalid date param (YYYY-MM-DD)' }, { status: 400 })
  }

  try {
    const busy = await getBusySlots(date)
    return NextResponse.json({ date, busy })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[lalanuda/availability] error:', msg)
    return NextResponse.json({ error: 'Failed to fetch availability', detail: msg }, { status: 500 })
  }
}
