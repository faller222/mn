import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ViewArticleTracker } from './ViewArticleTracker'
import { ShareButtons } from '@/components/ShareButtons'
import { RichText } from '@/lib/richtext'
import { formatPostDate, getPostBySlug, getPublishedPosts } from '@/lib/posts'
import { SITE_URL } from '@/lib/constants'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts(50)
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Nota' }
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverUrl ? [{ url: post.coverUrl }] : undefined,
    },
  }
}

export default async function NotaPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const shareUrl = `${SITE_URL}/noticias/${post.slug}`

  return (
    <article className="article">
      <ViewArticleTracker slug={post.slug} />
      <p className="eyebrow">Nota</p>
      <h1>{post.title}</h1>
      <time dateTime={post.publishedAt || undefined}>{formatPostDate(post.publishedAt)}</time>

      {post.coverUrl ? (
        <div className="article__cover">
          <Image
            src={post.coverUrl}
            alt={post.coverAlt || post.title}
            width={1200}
            height={675}
            priority
          />
        </div>
      ) : null}

      {post.excerpt ? <p className="section__lead">{post.excerpt}</p> : null}

      <RichText data={post.body} />

      <ShareButtons
        title={post.title}
        excerpt={post.excerpt}
        url={shareUrl}
        coverUrl={post.coverUrl}
      />

      <div className="article-cta">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', margin: '0 0 0.6rem' }}>
          ¿Querés pautar en MN?
        </h2>
        <Link className="btn btn--primary" href="/contacto?asunto=Publicidad">
          Contactar
        </Link>
      </div>
    </article>
  )
}
