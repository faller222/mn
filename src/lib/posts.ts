import 'server-only'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media, Post } from '@/payload-types'
import type { PublicPost } from '@/lib/post-types'

export type { PublicPost } from '@/lib/post-types'
export { formatPostDate } from '@/lib/post-types'

function mediaUrl(cover: Post['coverImage']): { url?: string | null; alt?: string | null } {
  if (!cover || typeof cover === 'string' || typeof cover === 'number') {
    return {}
  }
  const media = cover as Media
  return { url: media.url, alt: media.alt }
}

const QUERY_TIMEOUT_MS = 4000

async function withTimeout<T>(promise: Promise<T>, fallback: T): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      promise,
      new Promise<T>((resolve) => {
        timer = setTimeout(() => resolve(fallback), QUERY_TIMEOUT_MS)
      }),
    ])
  } catch {
    return fallback
  } finally {
    if (timer) clearTimeout(timer)
  }
}

export async function getPublishedPosts(limit = 12): Promise<PublicPost[]> {
  return withTimeout(
    (async () => {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'posts',
        where: {
          status: { equals: 'published' },
        },
        sort: '-publishedAt',
        limit,
        // depth 2: popula coverImage + uploads/relaciones dentro del body Lexical
        depth: 2,
      })

      return result.docs.map((doc) => {
        const { url, alt } = mediaUrl(doc.coverImage)
        return {
          id: doc.id,
          title: doc.title,
          slug: doc.slug,
          excerpt: doc.excerpt,
          publishedAt: doc.publishedAt,
          coverUrl: url,
          coverAlt: alt,
          body: doc.body,
        }
      })
    })(),
    [],
  )
}

export async function getPostBySlug(slug: string): Promise<PublicPost | null> {
  return withTimeout(
    (async () => {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'posts',
        where: {
          and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
        },
        limit: 1,
        // depth 2: popula coverImage + uploads/relaciones dentro del body Lexical
        depth: 2,
      })

      const doc = result.docs[0]
      if (!doc) return null

      const { url, alt } = mediaUrl(doc.coverImage)
      return {
        id: doc.id,
        title: doc.title,
        slug: doc.slug,
        excerpt: doc.excerpt,
        publishedAt: doc.publishedAt,
        coverUrl: url,
        coverAlt: alt,
        body: doc.body,
      }
    })(),
    null,
  )
}
