'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/ga'

type Props = {
  title: string
  excerpt?: string | null
  url: string
  coverUrl?: string | null
}

function trackShare(network: string) {
  trackEvent('click_share', { network })
}

export function ShareButtons({ title, excerpt, url, coverUrl }: Props) {
  const [status, setStatus] = useState<string | null>(null)
  const text = excerpt?.trim() ? `${title}\n\n${excerpt}\n\n${url}` : `${title}\n\n${url}`
  const shortText = excerpt?.trim() ? `${title} — ${excerpt}` : title

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(text)}`
  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shortText)}&url=${encodeURIComponent(url)}`
  const threads = `https://www.threads.net/intent/post?text=${encodeURIComponent(`${shortText}\n${url}`)}`

  async function shareInstagramStory() {
    trackShare('instagram_story')
    setStatus(null)

    try {
      if (coverUrl && typeof navigator !== 'undefined' && navigator.share) {
        const res = await fetch(coverUrl)
        const blob = await res.blob()
        const file = new File([blob], 'mn-portada.jpg', {
          type: blob.type || 'image/jpeg',
        })

        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title,
            text: `${shortText}\n${url}`,
            url,
          })
          setStatus('Compartido.')
          return
        }
      }

      if (coverUrl) {
        const a = document.createElement('a')
        a.href = coverUrl
        a.download = 'mn-portada.jpg'
        a.target = '_blank'
        a.rel = 'noopener'
        document.body.appendChild(a)
        a.click()
        a.remove()
      }

      await navigator.clipboard.writeText(url)
      setStatus(
        coverUrl
          ? 'Portada lista para descargar y link copiado. Pegalo en tu Story de Instagram.'
          : 'Link copiado. Pegalo en tu Story de Instagram.',
      )
    } catch {
      try {
        await navigator.clipboard.writeText(url)
        setStatus('Link copiado.')
      } catch {
        setStatus('No se pudo compartir. Copiá el link manualmente.')
      }
    }
  }

  return (
    <div className="share-block">
      <p className="share-block__label">Compartir</p>
      <div className="share-row" role="group" aria-label="Compartir nota">
        <a
          className="share-btn"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir por WhatsApp"
          onClick={() => trackShare('whatsapp')}
        >
          <WhatsAppIcon />
        </a>
        <a
          className="share-btn"
          href={x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en X"
          onClick={() => trackShare('x')}
        >
          <XIcon />
        </a>
        <a
          className="share-btn"
          href={threads}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en Threads"
          onClick={() => trackShare('threads')}
        >
          <ThreadsIcon />
        </a>
        <button
          type="button"
          className="share-btn"
          aria-label="Compartir en Instagram Stories"
          onClick={() => void shareInstagramStory()}
        >
          <InstagramIcon />
        </button>
      </div>
      {status ? (
        <p className="share-block__status" role="status">
          {status}
        </p>
      ) : null}
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.15 6.43 2.15 11.89c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.89-4.43 9.89-9.89C21.94 6.43 17.5 2 12.04 2zm0 18.06h-.01c-1.5 0-2.96-.4-4.23-1.16l-.3-.18-3.15.83.84-3.07-.2-.32a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.27-8.18 8.27z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.833L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M12.186 2.03c-2.76-.13-5.31 1.1-6.85 3.3C3.88 7.75 3.2 10.7 3.86 13.5c.7 2.95 2.8 5.25 5.55 6.2 1.35.47 2.8.6 4.22.4 1.65-.24 3.15-.95 4.35-2.05.35-.32.3-.9-.1-1.15-.35-.22-.8-.14-1.1.15-1.7 1.55-4.05 2.1-6.25 1.35-2.05-.7-3.55-2.45-4.05-4.55-.35-1.55-.1-3.2.7-4.55 1.05-1.8 2.95-2.85 5.05-2.85h.2c1.85.05 3.45.9 4.4 2.35.45.7.7 1.5.75 2.35.05.7-.1 1.4-.4 2.05-.45.95-1.2 1.7-2.15 2.15.55.2 1.05.55 1.4 1 .7.95.9 2.2.5 3.35-.55 1.55-1.95 2.55-3.7 2.7-1.2.1-2.35-.25-3.2-.95-.7-.55-.8-1.55-.25-2.25.5-.65 1.4-.8 2.1-.35.35.25.75.35 1.15.3.75-.1 1.25-.75 1.15-1.5-.1-.65-.65-1.1-1.3-1.1-.35 0-.7.15-.95.4-.35.35-.9.35-1.25 0-.35-.35-.35-.9 0-1.25.7-.7 1.7-1.1 2.7-1.05 1.85.1 3.3 1.55 3.45 3.4.1 1.35-.35 2.65-1.25 3.6-.95 1-2.3 1.6-3.75 1.7-2.35.15-4.45-1.1-5.4-3.2-.7-1.55-.65-3.3.15-4.8.95-1.8 2.75-3 4.8-3.2 2.55-.25 4.95.95 6.25 3.05.45.7 1.4.9 2.1.45.7-.45.9-1.4.45-2.1C18.9 5.55 15.8 3.55 12.4 3.2c-.07-.01-.14-.01-.21-.01l-.004-.16z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.25 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  )
}
