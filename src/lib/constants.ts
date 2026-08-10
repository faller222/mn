export const SITE_NAME = 'MN'
export const SITE_TAGLINE = 'Periodismo · Entrevistas · Actualidad'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nocetti.uy'

export const STREAM_URL =
  process.env.NEXT_PUBLIC_STREAM_URL || 'https://fmbrava-2.nty.uy'

export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xzepdwlp'

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-RHQPTDD0RN'

export const SPOTIFY_SHOW_URL = 'https://open.spotify.com/show/1WxPXeCzGu3D8dJeTwwAd3'
export const SPOTIFY_EMBED_URL =
  'https://open.spotify.com/embed/show/1WxPXeCzGu3D8dJeTwwAd3?utm_source=generator'

export const INSTAGRAM_URL = 'https://www.instagram.com/nocettiuy/'
export const THREADS_URL = 'https://www.threads.com/@mnocetti1'
export const X_URL = 'https://x.com/mnocetti1'

/**
 * Live window: Mon–Fri 08:00–11:00 America/Montevideo.
 * Internal only — never publish this schedule in UI.
 * Override: NEXT_PUBLIC_ON_AIR=force | off | (unset = schedule)
 */
export function isOnAir(now = new Date()): boolean {
  const override = process.env.NEXT_PUBLIC_ON_AIR
  if (override === 'force' || override === 'true') return true
  if (override === 'off' || override === 'false') return false

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Montevideo',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now)

  const weekday = parts.find((p) => p.type === 'weekday')?.value
  const hour = Number(parts.find((p) => p.type === 'hour')?.value)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value)

  const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday || '')
  if (!isWeekday) return false

  const minutes = hour * 60 + minute
  return minutes >= 8 * 60 && minutes < 11 * 60
}
