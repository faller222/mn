'use client'

import { usePlayer } from './PlayerProvider'

export function LiveButton({
  className = 'btn btn--primary',
  label = 'Escuchar en vivo',
}: {
  className?: string
  label?: string
}) {
  const { playing, toggle } = usePlayer()
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
