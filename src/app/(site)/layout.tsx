import type { Metadata } from 'next'
import { Analytics } from '@/components/Analytics'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { MiniPlayer } from '@/components/MiniPlayer'
import { PlayerProvider } from '@/components/PlayerProvider'
import { isGateEnabled } from '@/lib/gate'
import { SITE_URL } from '@/lib/constants'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MN — Martín Nocetti | Periodismo y entrevistas en Maldonado',
    template: '%s | MN',
  },
  description:
    'Periodismo, entrevistas y actualidad desde Maldonado. Escuchá en vivo a Martín Nocetti y explorá el archivo en MN.',
  authors: [{ name: 'Martín Nocetti' }],
  robots: isGateEnabled()
    ? { index: false, follow: false }
    : { index: true, follow: true },
  openGraph: {
    title: 'MN — Martín Nocetti',
    description:
      'Periodismo, entrevistas y actualidad desde Maldonado. Escuchá en vivo y explorá el archivo en MN.',
    url: SITE_URL,
    siteName: 'MN',
    locale: 'es_UY',
    type: 'website',
    images: [{ url: '/brand/martin.png' }],
  },
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <PlayerProvider>
          <div className="site-shell">
            <Header />
            <div className="site-main">{children}</div>
            <Footer />
            <MiniPlayer />
          </div>
        </PlayerProvider>
        <Analytics />
      </body>
    </html>
  )
}
