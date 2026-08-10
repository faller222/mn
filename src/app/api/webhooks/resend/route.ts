import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import { ingestReceivedEmailId, verifyResendWebhook } from '@/lib/resend'

export const runtime = 'nodejs'

type ReceivedEvent = {
  type: string
  data?: {
    email_id?: string
  }
}

/**
 * Resend inbound webhook.
 * Configure in Resend → Webhooks → event `email.received`
 * URL: https://nocetti.uy/api/webhooks/resend
 */
export async function POST(req: Request) {
  const rawBody = await req.text()

  const svixId = req.headers.get('svix-id') || ''
  const svixTimestamp = req.headers.get('svix-timestamp') || ''
  const svixSignature = req.headers.get('svix-signature') || ''

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  let event: ReceivedEvent
  try {
    event = verifyResendWebhook(rawBody, {
      id: svixId,
      timestamp: svixTimestamp,
      signature: svixSignature,
    }) as ReceivedEvent
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'email.received') {
    return NextResponse.json({ ok: true, ignored: event.type })
  }

  const emailId = event.data?.email_id
  if (!emailId) {
    return NextResponse.json({ error: 'Missing email_id' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })
    const result = await ingestReceivedEmailId(payload, emailId, { svixId })
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Inbox ingest failed'
    console.error('[resend webhook]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
