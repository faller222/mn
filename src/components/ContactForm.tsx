'use client'

import Link from 'next/link'
import { useMemo, useState, type FormEvent } from 'react'
import { FORMSPREE_ENDPOINT } from '@/lib/constants'
import { trackContactSubmit } from '@/lib/ga'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const ASUNTOS = ['Publicidad', 'Entrevista', 'Otro'] as const

export function ContactForm({ initialAsunto }: { initialAsunto?: string }) {
  const defaultAsunto = useMemo(() => {
    if (!initialAsunto) return 'Publicidad'
    const match = ASUNTOS.find(
      (a) => a.toLowerCase() === initialAsunto.toLowerCase(),
    )
    return match || 'Publicidad'
  }, [initialAsunto])

  const [status, setStatus] = useState<Status>('idle')
  const [fieldError, setFieldError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFieldError(null)
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') || '')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError('Email: formato inválido')
      setStatus('error')
      return
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('fail')
      trackContactSubmit()
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-status" role="status">
        <h2>Mensaje enviado</h2>
        <p>Te respondemos a la brevedad.</p>
        <Link className="btn btn--primary" href="/">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <p className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </p>

      <div className="field">
        <label htmlFor="nombre">Nombre *</label>
        <input id="nombre" name="name" required disabled={status === 'submitting'} />
      </div>

      <div className="field">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-invalid={fieldError ? true : undefined}
          aria-describedby={fieldError ? 'email-error' : undefined}
          disabled={status === 'submitting'}
        />
        {fieldError ? (
          <p id="email-error" className="field-error">
            {fieldError}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="asunto">Asunto *</label>
        <select
          id="asunto"
          name="asunto"
          required
          defaultValue={defaultAsunto}
          disabled={status === 'submitting'}
        >
          {ASUNTOS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="mensaje">Mensaje *</label>
        <textarea
          id="mensaje"
          name="message"
          rows={6}
          required
          disabled={status === 'submitting'}
        />
      </div>

      {status === 'error' && !fieldError ? (
        <p className="form-error" role="alert">
          No se pudo enviar. Revisá los campos o intentá de nuevo.
        </p>
      ) : null}

      <button className="btn btn--primary" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Enviando…' : 'Enviar mensaje'}
      </button>

      <p className="form-note">
        Los datos se usan solo para responder tu consulta. No se venden ni se ceden a terceros con
        fines de marketing.
      </p>
    </form>
  )
}
