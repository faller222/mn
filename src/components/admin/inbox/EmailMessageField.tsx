'use client'

import { Button, toast, useDocumentInfo, useForm } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  asAttachmentList,
  formatBytes,
  formatEmailDateLong,
} from '@/lib/email-format'
import { isInboxReadLocal, setInboxReadLocal } from '@/lib/inbox-read-local'
import { sanitizeEmailHtml } from '@/lib/sanitize-email-html'
import './inbox.css'

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((v): v is string => typeof v === 'string' && v.length > 0)
}

function PaperclipIcon() {
  return (
    <svg
      className="email-view__attach-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}

export function EmailMessageField() {
  const router = useRouter()
  const { id, initialData } = useDocumentInfo()
  const { setModified } = useForm()
  const [busy, setBusy] = useState(false)
  const [headersOpen, setHeadersOpen] = useState(false)
  const [isRead, setIsRead] = useState(false)

  const data = (initialData || {}) as Record<string, unknown>

  const subject = String(data.subject || '').trim() || '(Sin asunto)'
  const from = String(data.from || '')
  const to = asStringList(data.to)
  const cc = asStringList(data.cc)
  const bcc = asStringList(data.bcc)
  const replyTo = asStringList(data.replyTo)
  const text = typeof data.text === 'string' ? data.text : ''
  const html = typeof data.html === 'string' ? data.html : ''
  const receivedAt = typeof data.receivedAt === 'string' ? data.receivedAt : null
  const resendId = typeof data.resendId === 'string' ? data.resendId : ''
  const attachments = asAttachmentList(data.attachmentsMeta)
  const safeHtml = useMemo(() => (html ? sanitizeEmailHtml(html) : ''), [html])

  useEffect(() => {
    if (!id) return
    setInboxReadLocal(id, true)
    setIsRead(true)
  }, [id])

  useEffect(() => {
    if (!id) return
    setIsRead(isInboxReadLocal(id))
  }, [id])

  const setRead = useCallback(
    (read: boolean) => {
      if (!id) return
      setInboxReadLocal(id, read)
      setIsRead(read)
    },
    [id],
  )

  async function onDelete() {
    if (!id) return
    if (!window.confirm('¿Quitar este email de la bandeja?')) return
    setBusy(true)
    try {
      const res = await fetch(`/api/inbox-emails/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deleted: true }),
        credentials: 'include',
      })
      const json = (await res.json()) as { errors?: Array<{ message?: string }> }
      if (!res.ok) throw new Error(json.errors?.[0]?.message || `Error ${res.status}`)
      setModified(false)
      toast.success('Email quitado de la bandeja')
      router.push('/admin/collections/inbox-emails')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo eliminar')
      setBusy(false)
    }
  }

  return (
    <div className="email-view">
      <header className="email-view__header">
        <h1 className="email-view__subject">{subject}</h1>
        <dl className="email-view__meta">
          <div>
            <dt>De</dt>
            <dd>{from || '—'}</dd>
          </div>
          <div>
            <dt>Para</dt>
            <dd>{to.length ? to.join(', ') : '—'}</dd>
          </div>
          <div>
            <dt>Fecha</dt>
            <dd>{formatEmailDateLong(receivedAt)}</dd>
          </div>
        </dl>

        {cc.length || bcc.length || replyTo.length ? (
          <details
            className="email-view__more"
            open={headersOpen}
            onToggle={(e) => setHeadersOpen((e.target as HTMLDetailsElement).open)}
          >
            <summary>Más destinatarios</summary>
            <dl className="email-view__meta">
              {cc.length ? (
                <div>
                  <dt>CC</dt>
                  <dd>{cc.join(', ')}</dd>
                </div>
              ) : null}
              {bcc.length ? (
                <div>
                  <dt>CCO</dt>
                  <dd>{bcc.join(', ')}</dd>
                </div>
              ) : null}
              {replyTo.length ? (
                <div>
                  <dt>Reply-To</dt>
                  <dd>{replyTo.join(', ')}</dd>
                </div>
              ) : null}
            </dl>
          </details>
        ) : null}

        <div className="email-view__actions">
          <Button
            type="button"
            buttonStyle="secondary"
            disabled={busy || isRead}
            onClick={() => setRead(true)}
          >
            Marcar leído
          </Button>
          <Button
            type="button"
            buttonStyle="secondary"
            disabled={busy || !isRead}
            onClick={() => setRead(false)}
          >
            Marcar no leído
          </Button>
          <Button type="button" buttonStyle="secondary" disabled aria-label="Responder">
            Responder
          </Button>
          <Button type="button" buttonStyle="secondary" disabled aria-label="Reenviar">
            Reenviar
          </Button>
          <Button type="button" buttonStyle="pill" disabled={busy} onClick={() => void onDelete()}>
            Eliminar
          </Button>
        </div>
      </header>

      <section className="email-view__body" aria-label="Contenido del email">
        {safeHtml ? (
          <div
            className="email-view__html"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        ) : (
          <pre className="email-view__text">{text || 'Sin contenido.'}</pre>
        )}
      </section>

      {attachments.length ? (
        <section className="email-view__attachments" aria-label="Adjuntos">
          <h2>Adjuntos</h2>
          <ul>
            {attachments.map((file, idx) => {
              const name = file.filename || `adjunto-${idx + 1}`
              const type = file.contentType || file.content_type || 'archivo'
              const ext = type.split('/').pop()?.toUpperCase() || 'FILE'
              const href =
                resendId && file.id
                  ? `/api/inbox/attachments/${resendId}/${file.id}`
                  : undefined
              return (
                <li key={file.id || name}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <PaperclipIcon />
                      <span>
                        <strong>{name}</strong>
                        <small>
                          {ext}
                          {file.size != null ? ` · ${formatBytes(file.size)}` : ''}
                        </small>
                      </span>
                    </a>
                  ) : (
                    <span>
                      <PaperclipIcon />
                      <span>
                        <strong>{name}</strong>
                        <small>
                          {ext}
                          {file.size != null ? ` · ${formatBytes(file.size)}` : ''}
                        </small>
                      </span>
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
