'use client'

import { useEffect } from 'react'

const SRC = 'https://ficus-faller.vercel.app/embed/footer.js'

function hostsNeedInit() {
  return [...document.querySelectorAll('[data-ficus]')].some((el) => !el.shadowRoot)
}

/** Credit "Desarrollado por Ficus" — mount point + async embed script. */
export function FicusFooter() {
  useEffect(() => {
    if (!hostsNeedInit()) return

    const existing = document.querySelector<HTMLScriptElement>('script[src*="embed/footer.js"]')
    existing?.remove()

    const script = document.createElement('script')
    script.src = existing ? `${SRC}?lang=es&r=${Date.now()}` : `${SRC}?lang=es`
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="ficus-footer">
      <div data-ficus="es" />
    </div>
  )
}
