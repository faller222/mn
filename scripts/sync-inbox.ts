/**
 * One-off local sync: Resend receiving → Payload inbox-emails.
 * Usage: npx tsx scripts/sync-inbox.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

async function main() {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) throw new Error('Missing env `RESEND_API_KEY`')

  const listRes = await fetch('https://api.resend.com/emails/receiving?limit=50', {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  const listJson = (await listRes.json()) as {
    data?: Array<{ id: string }>
    message?: string
  }
  if (!listRes.ok) throw new Error(listJson.message || `List failed ${listRes.status}`)

  const ids = listJson.data?.map((e) => e.id) || []
  console.log(`Found ${ids.length} received email(s)`)

  const { getPayload } = await import('payload')
  const { default: payloadConfig } = await import('../src/payload.config')
  const payload = await getPayload({ config: payloadConfig })

  let created = 0
  let updated = 0

  for (const id of ids) {
    const getRes = await fetch(`https://api.resend.com/emails/receiving/${id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    const email = (await getRes.json()) as {
      id: string
      from: string
      to: string[]
      cc?: string[] | null
      bcc?: string[] | null
      reply_to?: string[] | null
      subject: string
      text?: string | null
      html?: string | null
      created_at: string
      message_id?: string
      received_for?: string[]
      attachments?: Array<Record<string, unknown>>
      message?: string
    }
    if (!getRes.ok) throw new Error(email.message || `Get failed ${getRes.status}`)

    const data = {
      resendId: email.id,
      messageId: email.message_id || undefined,
      from: email.from,
      to: email.to || [],
      cc: email.cc || [],
      bcc: email.bcc || [],
      replyTo: email.reply_to || [],
      subject: email.subject || '(sin asunto)',
      text: email.text || undefined,
      html: email.html || undefined,
      receivedAt: email.created_at,
      receivedFor: email.received_for || [],
      attachmentsMeta: (email.attachments || []).map((a) => ({
        id: a.id,
        filename: a.filename,
        contentType: a.content_type,
        contentDisposition: a.content_disposition,
        contentId: a.content_id,
        size: a.size,
      })),
    }

    const existing = await payload.find({
      collection: 'inbox-emails',
      where: { resendId: { equals: email.id } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'inbox-emails',
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
        depth: 0,
      })
      updated += 1
      console.log('updated', email.subject)
    } else {
      await payload.create({
        collection: 'inbox-emails',
        data,
        overrideAccess: true,
        depth: 0,
      })
      created += 1
      console.log('created', email.subject)
    }
  }

  console.log(JSON.stringify({ created, updated, total: ids.length }, null, 2))
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
