import 'server-only'

/** Resend API key — env `RESEND_API_KEY`. */
export function getResendApiKey(): string {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) {
    throw new Error('Missing env `RESEND_API_KEY`.')
  }
  return key
}

/** Webhook signing secret — env `RESEND_WEBHOOK_SECRET`. */
export function getResendWebhookSecret(): string {
  const secret = process.env.RESEND_WEBHOOK_SECRET?.trim()
  if (!secret) {
    throw new Error('Missing env `RESEND_WEBHOOK_SECRET`.')
  }
  return secret
}
