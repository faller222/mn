'use client'

import { useEffect } from 'react'
import { trackViewArticle } from '@/lib/ga'

export function ViewArticleTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackViewArticle(slug)
  }, [slug])
  return null
}
