'use client'

import { usePlayer } from './PlayerProvider'

export function MiniPlayer() {
  const { playing, onAir, toggle } = usePlayer()
  if (!playing || !onAir) return null

  return (
    <div className="mini-player" role="region" aria-label="Reproductor en vivo">
      <div className="mini-player__pulse" aria-hidden="true" />
      <p>En vivo · MN</p>
      <button type="button" onClick={toggle} aria-label="Pausar en vivo">
        Pausar
      </button>
    </div>
  )
}
