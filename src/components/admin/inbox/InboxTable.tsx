'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { formatInboxWhen } from '@/lib/email-format'
import './inbox.css'

export type InboxRow = {
  id: number | string
  subject?: string | null
  from?: string | null
  to?: string[] | null
  receivedAt?: string | null
  isRead?: boolean | null
}

function toLine(to?: string[] | null): string {
  if (!Array.isArray(to) || !to.length) return '—'
  return to.join(', ')
}

type Props = {
  docs: InboxRow[]
  page: number
  totalPages: number
  totalDocs: number
}

export function InboxTable({ docs, page, totalPages, totalDocs }: Props) {
  const router = useRouter()
  const synced = useRef(false)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    if (synced.current) return
    synced.current = true

    let cancelled = false
    ;(async () => {
      setSyncing(true)
      try {
        const res = await fetch('/api/inbox/sync', { method: 'POST', credentials: 'include' })
        if (!cancelled && res.ok) router.refresh()
      } catch {
        // Silent: list already rendered with cached docs
      } finally {
        if (!cancelled) setSyncing(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [router])

  const unreadOnPage = useMemo(() => docs.filter((d) => !d.isRead).length, [docs])

  return (
    <div className="inbox">
      <header className="inbox__header">
        <div>
          <h1 className="inbox__title">Emails</h1>
          <p className="inbox__meta">
            {totalDocs} recibidos
            {unreadOnPage > 0 ? ` · ${unreadOnPage} sin leer` : ''}
            {syncing ? ' · Actualizando…' : ''}
          </p>
        </div>
      </header>

      <div className="inbox-table-wrap">
        <table className="inbox-table">
          <thead>
            <tr>
              <th scope="col" className="inbox-table__status">
                <span className="sr-only">Estado</span>
              </th>
              <th scope="col">Emisor</th>
              <th scope="col">Receptor</th>
              <th scope="col">Asunto</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {docs.length === 0 ? (
              <tr>
                <td colSpan={5} className="inbox-table__empty">
                  No hay emails recibidos.
                </td>
              </tr>
            ) : (
              docs.map((doc) => {
                const unread = !doc.isRead
                return (
                  <tr key={doc.id} className={unread ? 'is-unread' : undefined}>
                    <td className="inbox-table__status">
                      <span className={`inbox__dot ${unread ? 'is-on' : ''}`} aria-hidden />
                    </td>
                    <td>
                      <Link
                        href={`/admin/collections/inbox-emails/${doc.id}`}
                        className="inbox-table__link"
                      >
                        {doc.from || '—'}
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={`/admin/collections/inbox-emails/${doc.id}`}
                        className="inbox-table__link"
                      >
                        {toLine(doc.to)}
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={`/admin/collections/inbox-emails/${doc.id}`}
                        className="inbox-table__link inbox-table__subject"
                      >
                        {doc.subject?.trim() || '(Sin asunto)'}
                      </Link>
                    </td>
                    <td className="inbox-table__date">{formatInboxWhen(doc.receivedAt)}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <nav className="inbox__pager" aria-label="Paginación">
          {page > 1 ? (
            <Link href={`/admin/collections/inbox-emails?page=${page - 1}`}>Anterior</Link>
          ) : (
            <span />
          )}
          <span>
            Página {page} de {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={`/admin/collections/inbox-emails?page=${page + 1}`}>Siguiente</Link>
          ) : (
            <span />
          )}
        </nav>
      ) : null}
    </div>
  )
}
