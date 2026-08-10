import 'server-only'

import type { CreateEmailOptions, GetReceivingEmailResponseSuccess } from 'resend'
import { getResendClient } from './client'
import { getResendWebhookSecret } from './env'

export type ReceivedEmail = GetReceivingEmailResponseSuccess

export type ListReceivedResult = {
  emails: Array<Omit<ReceivedEmail, 'html' | 'text' | 'headers' | 'raw' | 'object'>>
  hasMore: boolean
}

/** List inbound emails from Resend (metadata; no body). */
export async function listReceivedEmails(options?: {
  limit?: number
  after?: string
}): Promise<ListReceivedResult> {
  const resend = getResendClient()
  const { data, error } = await resend.emails.receiving.list({
    limit: options?.limit ?? 50,
    ...(options?.after ? { after: options.after } : {}),
  })

  if (error || !data) {
    throw new Error(error?.message || 'Failed to list received emails from Resend')
  }

  return {
    emails: data.data,
    hasMore: data.has_more,
  }
}

/** Fetch a single received email including html/text. */
export async function getReceivedEmail(emailId: string): Promise<ReceivedEmail> {
  const resend = getResendClient()
  const { data, error } = await resend.emails.receiving.get(emailId)

  if (error || !data) {
    throw new Error(error?.message || `Failed to get received email ${emailId}`)
  }

  return data
}

/** Send an email via Resend (no UI — service only). */
export async function sendEmail(payload: CreateEmailOptions) {
  const resend = getResendClient()
  const { data, error } = await resend.emails.send(payload)

  if (error || !data) {
    throw new Error(error?.message || 'Failed to send email via Resend')
  }

  return data
}

export type ResendWebhookHeaders = {
  id: string
  timestamp: string
  signature: string
}

/** Verify Resend/Svix webhook signature; throws if invalid. */
export function verifyResendWebhook(rawBody: string, headers: ResendWebhookHeaders) {
  const resend = getResendClient()
  return resend.webhooks.verify({
    payload: rawBody,
    headers,
    webhookSecret: getResendWebhookSecret(),
  })
}
