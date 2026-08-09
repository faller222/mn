'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import {
  GATE_COOKIE,
  GATE_MAX_AGE,
  checkGatePassword,
  createGateToken,
  gateMisconfigured,
  isGateEnabled,
} from '@/lib/gate'

export type GateState = {
  error?: string
}

export async function unlockSite(
  _prev: GateState,
  formData: FormData,
): Promise<GateState> {
  if (!isGateEnabled()) {
    redirect('/')
  }

  if (gateMisconfigured()) {
    return {
      error: 'El acceso está mal configurado. Faltan SITE_GATE_PASSWORD o SITE_GATE_SECRET.',
    }
  }

  const password = String(formData.get('password') || '')
  const next = String(formData.get('next') || '/')

  if (!checkGatePassword(password)) {
    return { error: 'Contraseña incorrecta.' }
  }

  const token = await createGateToken()
  if (!token) {
    return { error: 'No se pudo crear la sesión de acceso.' }
  }

  const jar = await cookies()
  jar.set(GATE_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: GATE_MAX_AGE,
  })

  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/'
  redirect(safeNext)
}
