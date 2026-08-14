'use client'

import { useEffect, useRef } from 'react'

const SRC = 'https://ficus-ochre.vercel.app/embed/footer.js?lang=es'

type LoadState = 'idle' | 'loading' | 'ok' | 'fail'

let loadState: LoadState = 'idle'

function hostOf(root: HTMLElement | null) {
  return root?.querySelector('[data-ficus]') ?? null
}

function markReady(root: HTMLElement | null) {
  if (hostOf(root)?.shadowRoot) root?.classList.add('ficus-footer--ready')
}

function hideAll() {
  document.querySelectorAll('.ficus-footer').forEach((el) => {
    el.setAttribute('hidden', '')
  })
}

function inject(src: string, onOk: () => void) {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  script.onload = onOk
  script.onerror = () => {
    loadState = 'fail'
    script.remove()
    hideAll()
  }
  document.body.appendChild(script)
}

/** Credit Ficus: browser-only. A dead embed must not affect Payload or the Vercel build. */
export function FicusFooter() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (loadState === 'fail') {
      root.setAttribute('hidden', '')
      return
    }

    if (hostOf(root)?.shadowRoot) {
      markReady(root)
      return
    }

    if (loadState === 'ok') {
      inject(`${SRC}&r=${Date.now()}`, () => markReady(root))
      return
    }

    if (loadState === 'loading') return

    loadState = 'loading'
    inject(SRC, () => {
      loadState = hostOf(root)?.shadowRoot ? 'ok' : 'fail'
      if (loadState === 'ok') markReady(root)
      else hideAll()
    })
  }, [])

  return (
    <div ref={rootRef} className="ficus-footer">
      <div data-ficus="es" />
    </div>
  )
}
