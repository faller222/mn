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

  async function nativeShare() {
    trackShare('native')
    setStatus(null)

    try {
      if (!navigator.share) {
        await navigator.clipboard.writeText(url)
        setStatus('Link copiado.')
        return
      }

      if (coverUrl) {
        const res = await fetch(coverUrl)
        const blob = await res.blob()
        const ext = blob.type.includes('png') ? 'png' : 'jpg'
        const file = new File([blob], `mn-${Date.now()}.${ext}`, {
          type: blob.type || 'image/jpeg',
        })

        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title,
            text: `${shortText}\n${url}`,
            url,
          })
          return
        }
      }

      await navigator.share({
        title,
        text: shortText,
        url,
      })
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      try {
        await navigator.clipboard.writeText(url)
        setStatus('Link copiado.')
      } catch {
        setStatus('No se pudo compartir.')
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
          aria-label="Compartir"
          onClick={() => void nativeShare()}
        >
          <ShareIcon />
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
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
      <path d="M12 3v12" />
      <path d="m8 7 4-4 4 4" />
    </svg>
  )
}
