'use client'

import { useActionState } from 'react'
import { unlockSite, type GateState } from './actions'

const initial: GateState = {}

export function AccessForm({ nextPath }: { nextPath: string }) {
  const [state, action, pending] = useActionState(unlockSite, initial)

  return (
    <form action={action} className="access-form">
      <input type="hidden" name="next" value={nextPath} />
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        disabled={pending}
      />
      {state.error ? (
        <p className="access-error" role="alert">
          {state.error}
        </p>
      ) : null}
      <button type="submit" disabled={pending}>
        {pending ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  )
}
