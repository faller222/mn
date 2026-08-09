import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SpotifyEmbed } from '@/components/SpotifyEmbed'
import { INSTAGRAM_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sobre Martín Nocetti',
  description:
    'Martín Nocetti es periodista y comunicador en Maldonado. Programa, archivo en Spotify y plataforma MN.',
}

const TRAYECTORIA = [
  'Programa — La mejor manera de comenzar la mañana (emisión en vivo + streaming en MN).',
  'Spotify — Podcast / archivo on-demand (~180 episodios).',
  'MN (nocetti.uy) — Plataforma digital propia: notas, archivo, contacto comercial.',
  'Cobertura comunitaria — Deporte local, organizaciones sociales, agenda departamental.',
  'Reconocimiento institucional — Labor referida en ámbitos locales (Junta Departamental de Maldonado / actas).',
]

const INVITADOS = [
  'Leticia Correa — Alcaldesa del Municipio de Maldonado',
  'Osvaldo Matteu — Presidente de la Junta Departamental de Maldonado',
  'Eduardo Antonini — Senador de la República',
  'Fernando Perdomo — Edil (Partido Nacional)',
  'Fernando Borges — Edil (Frente Amplio)',
  'Rosmari González — Edila (Frente Amplio)',
  'Verónica González — Directora Departamental de INAU',
  'Cultura / homenajes: José Hualde; Virginia Ferreti; Marita Cirilo (Teatro de la Mancha)',
]

export default function SobrePage() {
  return (
    <>
      <section className="about-intro" aria-labelledby="about-name">
        <div className="about-intro__media">
          <Image
            className="about-photo"
            src="/brand/martin.png"
            alt="Martín Nocetti, periodista en Maldonado"
            fill
            sizes="(min-width: 900px) 40vw, 360px"
            priority
          />
        </div>

        <div className="about-intro__content">
          <h1 id="about-name">Martín Nocetti</h1>
          <p className="about-kicker">Periodismo · Maldonado</p>

          <div className="about-bio">
            <h2 className="visually-hidden">Biografía</h2>
            <p>
              Martín Nocetti es un periodista y comunicador radicado en Maldonado, Uruguay. Su
              trabajo se centra en la actualidad local, las entrevistas en profundidad y el vínculo
              entre instituciones, deporte, cultura y ciudadanía.
            </p>
            <p>
              Conduce <em>La mejor manera de comenzar la mañana</em>, un programa matutino de
              interés general. Allí recibe a actores de la vida pública departamental y nacional,
              referentes sociales y figuras de la cultura. El material se conserva y distribuye en
              Spotify, donde el archivo público supera las 180 entrevistas y las 100 horas de
              contenido.
            </p>
            <p>
              Además del periodismo, Martín desarrolla actividad comercial como publicista:
              menciones, pautas y campañas puntuales —incluida publicidad callejera cuando el
              cliente lo requiere— siempre con la premisa de separar con claridad lo editorial de lo
              publicitario.
            </p>
            <p>
              MN es su plataforma digital: marca propia, archivo vivo y canal para escuchar el
              programa en vivo, leer notas y contactar por pautas o entrevistas. El foco geográfico
              es Maldonado y la región; el alcance, el que permita internet.
            </p>
          </div>
        </div>
      </section>

      <section className="trayectoria" aria-labelledby="trayectoria-title">
        <h2 id="trayectoria-title">Trayectoria</h2>
        <ul>
          {TRAYECTORIA.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="guests" aria-labelledby="guests-title">
        <h2 id="guests-title">Han pasado por su micrófono</h2>
        <ul>
          {INVITADOS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="about-podcast">
        <h2 id="about-podcast">Podcast en Spotify</h2>
        <p className="section__lead">+180 entrevistas · +100 horas</p>
        <SpotifyEmbed source="sobre" />
      </section>

      <section className="section" aria-labelledby="redes-title">
        <h2 id="redes-title">Redes</h2>
        <a
          className="btn btn--ghost"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram @mnocetti1
        </a>
      </section>

      <section className="about-contact" aria-labelledby="about-contact-title">
        <h2 id="about-contact-title">Contacto</h2>
        <p className="section__lead">
          Para pautas, entrevistas o consultas, escribinos desde el formulario.
        </p>
        <Link className="btn btn--primary" href="/contacto">
          Contactar
        </Link>
      </section>
    </>
  )
}
