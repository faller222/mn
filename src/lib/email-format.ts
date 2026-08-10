export function previewText(text?: string | null, html?: string | null, max = 90): string {
  const raw =
    text?.trim() ||
    html
      ?.replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() ||
    ''
  if (!raw) return 'Sin contenido'
  return raw.length > max ? `${raw.slice(0, max).trim()}…` : raw
}

export function senderName(from: string): string {
  const match = from.match(/^\s*"?([^"<]+?)"?\s*<[^>]+>\s*$/)
  if (match?.[1]) return match[1].trim()
  const email = from.includes('@') ? from.split('@')[0] : from
  return email || from || 'Desconocido'
}

export function senderDomain(from: string): string {
  const emailMatch = from.match(/<([^>]+)>/) || from.match(/([^\s<>]+@[^\s<>]+)/)
  const email = emailMatch?.[1] || from
  const domain = email.split('@')[1]
  return domain || ''
}

export function formatInboxWhen(iso?: string | null): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''

  const now = new Date()
  const sameDay =
    date.toLocaleDateString('es-UY', { timeZone: 'America/Montevideo' }) ===
    now.toLocaleDateString('es-UY', { timeZone: 'America/Montevideo' })

  if (sameDay) {
    return date.toLocaleTimeString('es-UY', {
      timeZone: 'America/Montevideo',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
  }

  return date.toLocaleDateString('es-UY', {
    timeZone: 'America/Montevideo',
    day: 'numeric',
    month: 'short',
  })
}

export function formatEmailDateLong(iso?: string | null): string {
  if (!iso) return '—'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('es-UY', {
    timeZone: 'America/Montevideo',
    dateStyle: 'long',
    timeStyle: 'short',
  })
}

export function formatBytes(size?: number | null): string {
  if (size == null || Number.isNaN(size)) return ''
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(size < 10_240 ? 1 : 0)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export type AttachmentMeta = {
  id?: string
  filename?: string | null
  contentType?: string | null
  content_type?: string | null
  size?: number | null
}

export function asAttachmentList(value: unknown): AttachmentMeta[] {
  if (!Array.isArray(value)) return []
  return value.filter((item) => item && typeof item === 'object') as AttachmentMeta[]
}
