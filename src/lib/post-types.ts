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
