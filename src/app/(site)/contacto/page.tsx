import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { INSTAGRAM_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contacto y pautas',
  description: 'Contacto comercial y consultas para pautas o entrevistas en MN.',
}

type Props = {
  searchParams: Promise<{ asunto?: string }>
}

export default async function ContactoPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <div className="contact-layout">
      <div>
        <h1>Contacto</h1>
        <p className="section__lead">Para pautas, entrevistas y consultas.</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>Directo</h2>
        <p style={{ color: 'var(--muted)' }}>Maldonado, Uruguay</p>
        <p>
          <a
            className="text-link"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram @mnocetti1
          </a>
        </p>
      </div>

      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>Escribinos</h2>
        <ContactForm initialAsunto={params.asunto} />
      </div>
    </div>
  )
}
