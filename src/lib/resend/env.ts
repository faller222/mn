import 'server-only'

/**
 * Resend env keys:
 * - API: `resend` (as in `secrets`)
 * - Webhook signing: `resend-signing-secret` locally / `resend_signing_secret` on Vercel
 *   (Vercel rejects hyphens in env names; both are accepted here.)
 */
export function getResendApiKey(): string {
  const key = process.env.resend?.trim()
  if (!key) {
    throw new Error('Missing env `resend` (Resend API key).')
  }
  return key
}

export function getResendWebhookSecret(): string {
  const secret =
    process.env['resend-signing-secret']?.trim() ||
    process.env.resend_signing_secret?.trim()
  if (!secret) {
    throw new Error(
      'Missing env `resend-signing-secret` or `resend_signing_secret` (Resend webhook signing secret).',
    )
  }
  return secret
}
