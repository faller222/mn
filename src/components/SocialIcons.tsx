import type { ReactNode } from 'react'
import { INSTAGRAM_URL, THREADS_URL, X_URL } from '@/lib/constants'

type Props = {
  className?: string
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="social-icon"
    >
      {children}
    </a>
  )
}

export function SocialIcons({ className = '' }: Props) {
  return (
    <div className={`social-icons ${className}`.trim()} aria-label="Redes sociales">
      <IconLink href={INSTAGRAM_URL} label="Instagram">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.25 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
      </IconLink>

      <IconLink href={X_URL} label="X">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.833L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      </IconLink>

      <IconLink href={THREADS_URL} label="Threads">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
          <path d="M12.186 2.03c-2.76-.13-5.31 1.1-6.85 3.3C3.88 7.75 3.2 10.7 3.86 13.5c.7 2.95 2.8 5.25 5.55 6.2 1.35.47 2.8.6 4.22.4 1.65-.24 3.15-.95 4.35-2.05.35-.32.3-.9-.1-1.15-.35-.22-.8-.14-1.1.15-1.7 1.55-4.05 2.1-6.25 1.35-2.05-.7-3.55-2.45-4.05-4.55-.35-1.55-.1-3.2.7-4.55 1.05-1.8 2.95-2.85 5.05-2.85h.2c1.85.05 3.45.9 4.4 2.35.45.7.7 1.5.75 2.35.05.7-.1 1.4-.4 2.05-.45.95-1.2 1.7-2.15 2.15.55.2 1.05.55 1.4 1 .7.95.9 2.2.5 3.35-.55 1.55-1.95 2.55-3.7 2.7-1.2.1-2.35-.25-3.2-.95-.7-.55-.8-1.55-.25-2.25.5-.65 1.4-.8 2.1-.35.35.25.75.35 1.15.3.75-.1 1.25-.75 1.15-1.5-.1-.65-.65-1.1-1.3-1.1-.35 0-.7.15-.95.4-.35.35-.9.35-1.25 0-.35-.35-.35-.9 0-1.25.7-.7 1.7-1.1 2.7-1.05 1.85.1 3.3 1.55 3.45 3.4.1 1.35-.35 2.65-1.25 3.6-.95 1-2.3 1.6-3.75 1.7-2.35.15-4.45-1.1-5.4-3.2-.7-1.55-.65-3.3.15-4.8.95-1.8 2.75-3 4.8-3.2 2.55-.25 4.95.95 6.25 3.05.45.7 1.4.9 2.1.45.7-.45.9-1.4.45-2.1C18.9 5.55 15.8 3.55 12.4 3.2c-.07-.01-.14-.01-.21-.01l-.004-.16z" />
        </svg>
      </IconLink>
    </div>
  )
}
