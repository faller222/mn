import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import { syncInboxFromResend } from '@/lib/resend'

export const runtime = 'nodejs'

/** Auth-only: pull received emails from Resend into Payload inbox. */
export async function POST() {
  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: await getHeaders() })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await syncInboxFromResend(payload)
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Sync failed'
    console.error('[inbox sync]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
