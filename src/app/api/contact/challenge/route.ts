import { NextResponse } from 'next/server'
import { createSignedTimingToken } from '@/lib/contactSecurity'

export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json(createSignedTimingToken(), {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}
