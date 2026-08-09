import type { Metadata } from 'next'
import Link from 'next/link'
import { PostCard } from '@/components/PostCard'
import { getPublishedPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Notas y entrevistas publicadas en MN.',
}

export default async function NoticiasPage() {
  const posts = await getPublishedPosts(24)

  return (
    <section className="section" aria-labelledby="noticias-title">
      <h1
        id="noticias-title"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}
      >
        Noticias
      </h1>
      <p className="section__lead">Entrevistas, historias y actualidad desde Maldonado.</p>

      {posts.length ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Todavía no hay notas publicadas. El archivo de entrevistas está en Spotify.</p>
          <p>
            <Link className="text-link" href="/#podcast">
              Ir al podcast →
            </Link>
          </p>
        </div>
      )}
    </section>
  )
}
