import Image from 'next/image'
import { AccessForm } from './AccessForm'
import { gateMisconfigured, isGateEnabled } from '@/lib/gate'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{ next?: string; error?: string }>
}

export const metadata = {
  title: 'Acceso — MN',
  robots: { index: false, follow: false },
}

export default async function AccesoPage({ searchParams }: Props) {
  if (!isGateEnabled()) {
    redirect('/')
  }

  const params = await searchParams
  const misconfigured = gateMisconfigured()

  return (
    <main className="access-page">
      <div className="access-card">
        <div className="access-brand">
          <Image
            src="/brand/logo.png"
            alt="MN"
            width={72}
            height={72}
            priority
            className="access-logo"
          />
          <h1>Martín Nocetti</h1>
        </div>
        <p className="access-sub">Sitio en revisión. Ingresá la contraseña para continuar.</p>

        {misconfigured || params.error === 'config' ? (
          <p className="access-error" role="alert">
            Gate mal configurado: definí <code>SITE_GATE_PASSWORD</code> y{' '}
            <code>SITE_GATE_SECRET</code> en el entorno.
          </p>
        ) : (
          <AccessForm nextPath={params.next || '/'} />
        )}
      </div>
    </main>
  )
}
