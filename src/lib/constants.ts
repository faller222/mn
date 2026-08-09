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

export const INSTAGRAM_URL = 'https://www.instagram.com/mnocetti1/'

/** Default ARCHIVO until Martín confirms schedule. Set NEXT_PUBLIC_ON_AIR=true to force live hero. */
export function isOnAir(): boolean {
  return process.env.NEXT_PUBLIC_ON_AIR === 'true'
}
