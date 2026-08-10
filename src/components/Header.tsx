'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useId, useState } from 'react'
import { SPOTIFY_SHOW_URL } from '@/lib/constants'
import { usePlayer } from './PlayerProvider'

const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/#en-vivo', label: 'En vivo' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/sobre', label: 'Sobre Martín' },
  { href: '/contacto', label: 'Contacto' },
]

export function Header() {
  const { playing, onAir, toggle } = usePlayer()
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="Martín Nocetti — inicio">
          <Image src="/brand/logo.png" alt="MN" width={44} height={44} priority />
          <span className="brand__text">Martín Nocetti</span>
        </Link>

        <nav className="nav-desktop" aria-label="Principal">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          {onAir ? (
            <button
              type="button"
              className={`live-btn ${playing ? 'is-live' : ''}`}
              onClick={toggle}
              aria-pressed={playing}
              aria-label="Escuchar en vivo — programa de Martín Nocetti"
            >
              {playing ? '● EN VIVO' : '> LIVE'}
            </button>
          ) : (
            <a
              className="live-btn"
              href={SPOTIFY_SHOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir archivo en Spotify"
            >
              Spotify
            </a>
          )}

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Cerrar' : 'Menú'}
          </button>
        </div>
      </div>

      {open ? (
        <div className="nav-overlay" id={menuId} role="dialog" aria-modal="true">
          <nav aria-label="Móvil">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            {onAir ? (
              <button
                type="button"
                className="live-btn live-btn--block"
                onClick={() => {
                  toggle()
                  setOpen(false)
                }}
                aria-pressed={playing}
                aria-label="Escuchar en vivo — programa de Martín Nocetti"
              >
                {playing ? 'Pausar en vivo' : 'Escuchar en vivo'}
              </button>
            ) : (
              <a
                className="live-btn live-btn--block"
                href={SPOTIFY_SHOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Abrir en Spotify
              </a>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
