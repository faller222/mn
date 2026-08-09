import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Acceso — MN',
  robots: { index: false, follow: false },
}

export default function AccesoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
