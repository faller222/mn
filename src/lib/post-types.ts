import type { Where } from 'payload'

export type PublicPost = {
  id: string | number
  title: string
  slug: string
  excerpt?: string | null
  publishedAt?: string | null
  coverUrl?: string | null
  coverAlt?: string | null
  body?: unknown
}

/** Visible on the public site: published + dated + not in the future. */
export function publicPostWhere(): Where {
  const where: Where = {
    and: [
      { status: { equals: 'published' } },
      { publishedAt: { exists: true } },
      { publishedAt: { less_than_equal: new Date().toISOString() } },
    ],
  }
  return where
}

export function formatPostDate(value?: string | null): string {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('es-UY', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value))
  } catch {
    return ''
  }
}
