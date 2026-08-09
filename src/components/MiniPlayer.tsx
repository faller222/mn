'use client'

import { usePlayer } from './PlayerProvider'

export function MiniPlayer() {
  const { playing, toggle } = usePlayer()
  if (!playing) return null

  return (
    <div className="mini-player" role="region" aria-label="Reproductor en vivo">
      <div className="mini-player__pulse" aria-hidden="true" />
      <p>En vivo · La mejor manera de comenzar la mañana</p>
      <button type="button" onClick={toggle} aria-label="Pausar transmisión en vivo">
        Pausar
      </button>
    </div>
  )
}
