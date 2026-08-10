'use client'

import { SPOTIFY_SHOW_URL } from '@/lib/constants'
import { usePlayer } from './PlayerProvider'

export function LiveButton({
  className = 'btn btn--primary',
  label = 'Escuchar en vivo',
}: {
  className?: string
  label?: string
}) {
  const { playing, onAir, toggle } = usePlayer()

  if (!onAir) {
    return (
      <a className={className} href={SPOTIFY_SHOW_URL} target="_blank" rel="noopener noreferrer">
        Abrir en Spotify
      </a>
    )
  }

  return (
    <button
      type="button"
      className={className}
      onClick={toggle}
      aria-pressed={playing}
      aria-label="Escuchar en vivo — programa de Martín Nocetti"
    >
      {playing ? 'Pausar en vivo' : label}
    </button>
  )
}
