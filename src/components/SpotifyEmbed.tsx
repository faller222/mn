'use client'

import { SPOTIFY_EMBED_URL, SPOTIFY_SHOW_URL } from '@/lib/constants'
import { trackClickSpotify } from '@/lib/ga'

export function SpotifyEmbed({ source }: { source: string }) {
  return (
    <div className="spotify-block">
      <iframe
        title="Podcast MN en Spotify"
        src={SPOTIFY_EMBED_URL}
        width="100%"
        height={352}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="spotify-embed"
      />
      <a
        className="text-link"
        href={SPOTIFY_SHOW_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClickSpotify(source)}
      >
        Abrir en Spotify →
      </a>
    </div>
  )
}
