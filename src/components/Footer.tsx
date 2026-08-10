import Link from 'next/link'
import { SocialIcons } from '@/components/SocialIcons'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">© MN · nocetti.uy · Maldonado</p>
        <nav aria-label="Pie" className="site-footer__nav">
          <Link href="/contacto">Contacto</Link>
          <Link href="/sobre">Sobre Martín</Link>
          <SocialIcons />
        </nav>
      </div>
    </footer>
  )
}
