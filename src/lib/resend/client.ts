import 'server-only'

import { Resend } from 'resend'
import { getResendApiKey } from './env'

let client: Resend | null = null

export function getResendClient(): Resend {
  if (!client) {
    client = new Resend(getResendApiKey())
  }
  return client
}
