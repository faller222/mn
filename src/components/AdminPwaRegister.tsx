'use client'

import { useEffect } from 'react'

/** Registers /admin/sw.js so Android Chrome can install MN Admin as PWA. */
export function AdminPwaRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    if (!window.location.pathname.startsWith('/admin')) return

    void navigator.serviceWorker.register('/admin/sw.js', { scope: '/admin/' }).catch(() => {
      // Ignore; install may still work via Add to Home Screen on some browsers.
    })
  }, [])

  return null
}
