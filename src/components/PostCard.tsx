'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { PublicPost } from '@/lib/post-types'
import { formatPostDate } from '@/lib/post-types'
import { trackClickArticle } from '@/lib/ga'

export function PostCard({ post }: { post: PublicPost }) {
  return (
    <article className="post-card">
      <Link
        href={`/noticias/${post.slug}`}
        className="post-card__link"
        onClick={() => trackClickArticle(post.slug)}
      >
        {post.coverUrl ? (
          <div className="post-card__media">
            <Image
              src={post.coverUrl}
              alt={post.coverAlt || ''}
              width={640}
              height={400}
            />
          </div>
        ) : (
          <div className="post-card__media post-card__media--empty" aria-hidden="true" />
        )}
        <div className="post-card__body">
          <h3>{post.title}</h3>
          {post.excerpt ? <p>{post.excerpt}</p> : null}
          <time dateTime={post.publishedAt || undefined}>{formatPostDate(post.publishedAt)}</time>
        </div>
      </Link>
    </article>
  )
}
