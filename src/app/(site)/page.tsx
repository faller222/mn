import Link from 'next/link'
import { LiveButton } from '@/components/LiveButton'
import { PostCard } from '@/components/PostCard'
import { SpotifyEmbed } from '@/components/SpotifyEmbed'
import { isOnAir } from '@/lib/constants'
import { getPublishedPosts } from '@/lib/posts'

export default async function HomePage() {
  const onAir = isOnAir()
  const posts = await getPublishedPosts(3)

  return (
    <>
      <section className="hero" id="en-vivo" aria-label="Inicio">
        <div className="hero__bg" />
        <div className="hero__content">
          {onAir ? (
            <>
              <p className="eyebrow">EN VIVO AHORA</p>
              <h1>La mejor manera de comenzar la mañana</h1>
              <p className="hero__sub">Streaming · MN</p>
              <div className="hero__actions">
                <LiveButton />
              </div>
            </>
          ) : (
            <>
              <p className="eyebrow">ARCHIVO</p>
              <h1>Escuchá la última entrevista</h1>
              <p className="hero__sub">
                Escuchá el programa cuando esté en vivo. Mientras tanto, disfrutá del archivo de
                emisiones en Spotify.
              </p>
              <div className="hero__actions">
                <LiveButton label="Escuchar en vivo" className="btn btn--ghost" />
                <a className="btn btn--primary" href="#podcast">
                  Ver entrevistas
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="destacados-title">
        <h2 id="destacados-title">Hoy · Destacados</h2>
        <p className="section__lead">Notas y entrevistas publicadas en MN.</p>

        {posts.length ? (
          <>
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <p style={{ marginTop: '1.5rem' }}>
              <Link className="text-link" href="/noticias">
                Ver todas →
              </Link>
            </p>
          </>
        ) : (
          <div className="empty-state">
            <p>Pronto en MN. Mientras tanto, explorá el archivo en Spotify.</p>
            <p>
              <a className="text-link" href="#podcast">
                Ir al podcast →
              </a>
            </p>
          </div>
        )}
      </section>

      <section className="section" id="podcast" aria-labelledby="podcast-title">
        <h2 id="podcast-title">Podcast · Entrevistas</h2>
        <p className="section__lead">Más de 180 entrevistas. Del micrófono al archivo.</p>
        <SpotifyEmbed source="home" />
      </section>

      <section className="commercial" aria-labelledby="comercial-title">
        <h2 id="comercial-title">Publicá con MN</h2>
        <p className="section__lead">
          Anunciantes en Maldonado y la región. Entrevistas, web y presencia en un mismo paquete.
        </p>
        <Link className="btn btn--primary" href="/contacto?asunto=Publicidad">
          Contactar
        </Link>
      </section>
    </>
  )
}
