import type { ListViewServerProps } from 'payload'
import Link from 'next/link'
import { Gutter } from '@payloadcms/ui'
import {
  formatInboxWhen,
  previewText,
  senderDomain,
  senderName,
} from '@/lib/email-format'
import { SyncInboxButton } from '../SyncInboxButton'
import './inbox.css'

type InboxDoc = {
  id: number | string
  subject?: string | null
  from?: string | null
  to?: string[] | null
  text?: string | null
  html?: string | null
  receivedAt?: string | null
  isRead?: boolean | null
}

export function InboxListView(props: ListViewServerProps) {
  const data = props.data as
    | { docs?: InboxDoc[]; page?: number; totalPages?: number; totalDocs?: number }
    | undefined
  const docs = (data?.docs || []) as InboxDoc[]
  const page = Number(data?.page || 1)
  const totalPages = Number(data?.totalPages || 1)
  const totalDocs = Number(data?.totalDocs || docs.length)
  const unread = docs.filter((d) => !d.isRead).length
  const loadFailed = !data

  return (
    <div className="inbox">
      <Gutter className="inbox__gutter">
        <header className="inbox__header">
          <div>
            <h1 className="inbox__title">Bandeja de entrada</h1>
            <p className="inbox__meta">
              {loadFailed
                ? 'No se pudo cargar la lista'
                : `${totalDocs} correo${totalDocs === 1 ? '' : 's'}${
                    unread > 0 ? ` · ${unread} sin leer en esta página` : ''
                  }`}
            </p>
          </div>
          <SyncInboxButton />
        </header>

        {loadFailed ? (
          <p className="inbox__empty">
            Error al cargar emails. Revisá el schema de la base (columnas/tablas de inbox) y
            volvé a sincronizar.
          </p>
        ) : null}

        <div className="inbox__list" role="list">
          {!loadFailed && docs.length === 0 ? (
            <p className="inbox__empty">No hay emails. Sincronizá con Resend o esperá el webhook.</p>
          ) : null}
          {!loadFailed && docs.length > 0 ? (
            docs.map((doc) => {
              const href = `/admin/collections/inbox-emails/${doc.id}`
              const unreadDot = !doc.isRead
              const toLine = (doc.to || []).join(', ')
              return (
                <Link
                  key={doc.id}
                  href={href}
                  className={`inbox__row ${unreadDot ? 'is-unread' : ''}`}
                  role="listitem"
                >
                  <span className="inbox__dot" aria-hidden="true" />
                  <span className="inbox__main">
                    <span className="inbox__line1">
                      <span className="inbox__from">{senderName(doc.from || '')}</span>
                      <span className="inbox__subject">
                        {doc.subject?.trim() || '(Sin asunto)'}
                      </span>
                      <span className="inbox__when">{formatInboxWhen(doc.receivedAt)}</span>
                    </span>
                    <span className="inbox__line2">
                      <span className="inbox__domain">{senderDomain(doc.from || '') || '—'}</span>
                      <span className="inbox__preview">
                        {previewText(doc.text, doc.html)}
                        {toLine ? ` · Para: ${toLine}` : ''}
                      </span>
                    </span>
                  </span>
                </Link>
              )
            })
          ) : null}
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
      </Gutter>
    </div>
  )
}
