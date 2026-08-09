import Link from 'next/link'
import { INSTAGRAM_URL } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">© MN · nocetti.uy · Maldonado</p>
        <nav aria-label="Pie">
          <Link href="/contacto">Contacto</Link>
          <Link href="/sobre">Sobre Martín</Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  )
}
