'use client'

import { Button, toast, useDocumentInfo, useForm } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  asAttachmentList,
  formatBytes,
  formatEmailDateLong,
} from '@/lib/email-format'
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
  const [isRead, setIsRead] = useState(() => Boolean((initialData as { isRead?: boolean } | undefined)?.isRead))

  // Prefer document payload (hidden fields may be omitted from the form state).
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

  const patch = useCallback(
    async (body: Record<string, unknown>, opts?: { silent?: boolean; okMsg?: string }) => {
      if (!id) return
      if (!opts?.silent) setBusy(true)
      try {
        const res = await fetch(`/api/inbox-emails/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          credentials: 'include',
        })
        const json = (await res.json()) as { errors?: Array<{ message?: string }> }
        if (!res.ok) {
          throw new Error(json.errors?.[0]?.message || `Error ${res.status}`)
        }
        if (typeof body.isRead === 'boolean') setIsRead(body.isRead)
        if (!opts?.silent && opts?.okMsg) toast.success(opts.okMsg)
        setModified(false)
        router.refresh()
      } catch (err) {
        if (!opts?.silent) {
          toast.error(err instanceof Error ? err.message : 'No se pudo actualizar')
        }
      } finally {
        if (!opts?.silent) setBusy(false)
      }
    },
    [id, router, setModified],
  )

  useEffect(() => {
    setIsRead(Boolean((initialData as { isRead?: boolean } | undefined)?.isRead))
  }, [initialData])

  useEffect(() => {
    if (!id || isRead) return
    void patch({ isRead: true }, { silent: true })
    // Auto-mark once when opening an unread email
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function onDelete() {
    if (!id) return
    if (!window.confirm('¿Eliminar este email de la bandeja?')) return
    setBusy(true)
    try {
      const res = await fetch(`/api/inbox-emails/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      toast.success('Email eliminado')
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

        {(cc.length || bcc.length || replyTo.length) ? (
          <details className="email-view__more" open={headersOpen} onToggle={(e) => setHeadersOpen((e.target as HTMLDetailsElement).open)}>
            <summary>CC / CCO / Reply-To</summary>
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
            disabled={busy}
            onClick={() => void patch({ isRead: true }, { okMsg: 'Marcado como leído' })}
          >
            Marcar leído
          </Button>
          <Button
            type="button"
            buttonStyle="secondary"
            disabled={busy}
            onClick={() => void patch({ isRead: false }, { okMsg: 'Marcado como no leído' })}
          >
            Marcar no leído
          </Button>
          <Button type="button" buttonStyle="secondary" disabled aria-label="Responder (próximamente)">
            Responder
          </Button>
          <Button type="button" buttonStyle="secondary" disabled aria-label="Reenviar (próximamente)">
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
            // Sanitized with DOMPurify — required to render inbound HTML safely.
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        ) : (
          <pre className="email-view__text">{text || 'Este email no tiene contenido.'}</pre>
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
