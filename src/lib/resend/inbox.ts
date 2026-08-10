import 'server-only'

import type { Payload } from 'payload'
import { getReceivedEmail, listReceivedEmails, type ReceivedEmail } from './service'

type UpsertResult = {
  resendId: string
  action: 'created' | 'updated' | 'skipped'
  id?: number | string
}

function attachmentMeta(email: ReceivedEmail) {
  return (email.attachments || []).map((a) => ({
    id: a.id,
    filename: a.filename,
    contentType: a.content_type,
    contentDisposition: a.content_disposition,
    contentId: a.content_id,
    size: a.size,
  }))
}

function toDocData(email: ReceivedEmail) {
  return {
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
    attachmentsMeta: attachmentMeta(email),
  }
}

/** Upsert by unique `resendId` — safe for webhook retries. */
export async function upsertInboxEmail(
  payload: Payload,
  email: ReceivedEmail,
  options?: { svixId?: string },
): Promise<UpsertResult> {
  if (options?.svixId) {
    const byEvent = await payload.find({
      collection: 'inbox-emails',
      where: { svixId: { equals: options.svixId } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    if (byEvent.docs[0]) {
      return { resendId: email.id, action: 'skipped', id: byEvent.docs[0].id }
    }
  }

  const existing = await payload.find({
    collection: 'inbox-emails',
    where: { resendId: { equals: email.id } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const data = {
    ...toDocData(email),
    ...(options?.svixId ? { svixId: options.svixId } : {}),
  }

  if (existing.docs[0]) {
    const doc = await payload.update({
      collection: 'inbox-emails',
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
      depth: 0,
    })
    return { resendId: email.id, action: 'updated', id: doc.id }
  }

  const doc = await payload.create({
    collection: 'inbox-emails',
    data,
    overrideAccess: true,
    depth: 0,
  })
  return { resendId: email.id, action: 'created', id: doc.id }
}

/** Pull from Resend Receiving API and sync into Payload. */
export async function syncInboxFromResend(
  payload: Payload,
  options?: { limit?: number; maxPages?: number },
): Promise<{ created: number; updated: number; total: number }> {
  const limit = options?.limit ?? 50
  const maxPages = options?.maxPages ?? 5

  let after: string | undefined
  let created = 0
  let updated = 0
  let total = 0

  for (let page = 0; page < maxPages; page++) {
    const { emails, hasMore } = await listReceivedEmails({ limit, after })
    if (!emails.length) break

    for (const item of emails) {
      total += 1
      const full = await getReceivedEmail(item.id)
      const result = await upsertInboxEmail(payload, full)
      if (result.action === 'created') created += 1
      if (result.action === 'updated') updated += 1
    }

    if (!hasMore) break
    after = emails[emails.length - 1]?.id
    if (!after) break
  }

  return { created, updated, total }
}

/** Webhook path: fetch full email by id, then upsert. */
export async function ingestReceivedEmailId(
  payload: Payload,
  emailId: string,
  options?: { svixId?: string },
): Promise<UpsertResult> {
  const email = await getReceivedEmail(emailId)
  return upsertInboxEmail(payload, email, options)
}
