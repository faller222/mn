'use client'

import { GA_MEASUREMENT_ID } from './constants'

type GtagFn = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagFn
  }
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return
  if (!window.gtag) return
  window.gtag('event', name, params)
}

export function trackPlayRadio() {
  trackEvent('play_radio', { stream: 'mn_live' })
}

export function trackContactSubmit() {
  trackEvent('contact_submit')
}

export function trackClickSpotify(source: string) {
  trackEvent('click_spotify', { source })
}

export function trackClickArticle(slug: string) {
  trackEvent('click_article', { slug })
}

export function trackViewArticle(slug: string) {
  trackEvent('view_article', { slug })
}

export function gaId() {
  return GA_MEASUREMENT_ID
}
