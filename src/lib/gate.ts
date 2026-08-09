const GATE_COOKIE = 'mn_site_gate'
const GATE_MAX_AGE = 60 * 60 * 24 * 14 // 14 days

export { GATE_COOKIE, GATE_MAX_AGE }

export function isGateEnabled(): boolean {
  return process.env.SITE_GATE_ENABLED !== 'false'
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function hmac(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))
  return toHex(sig)
}

export async function createGateToken(): Promise<string | null> {
  const secret = process.env.SITE_GATE_SECRET
  if (!secret) return null
  const issuedAt = Date.now().toString()
  const signature = await hmac(secret, issuedAt)
  return `${issuedAt}.${signature}`
}

export async function verifyGateToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const secret = process.env.SITE_GATE_SECRET
  if (!secret) return false

  const [issuedAt, signature] = token.split('.')
  if (!issuedAt || !signature) return false

  const expected = await hmac(secret, issuedAt)
  if (expected.length !== signature.length) return false

  let ok = true
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== signature[i]) ok = false
  }
  if (!ok) return false

  const ageMs = Date.now() - Number(issuedAt)
  if (!Number.isFinite(ageMs) || ageMs < 0 || ageMs > GATE_MAX_AGE * 1000) return false
  return true
}

export function checkGatePassword(password: string): boolean {
  const expected = process.env.SITE_GATE_PASSWORD
  if (!expected) return false
  if (password.length !== expected.length) return false
  let ok = true
  for (let i = 0; i < expected.length; i++) {
    if (password[i] !== expected[i]) ok = false
  }
  return ok
}

export function gateMisconfigured(): boolean {
  return isGateEnabled() && (!process.env.SITE_GATE_PASSWORD || !process.env.SITE_GATE_SECRET)
}
