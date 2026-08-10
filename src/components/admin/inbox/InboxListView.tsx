import type { ListViewServerProps } from 'payload'
import { Gutter } from '@payloadcms/ui'
import { InboxTable, type InboxRow } from './InboxTable'
import './inbox.css'

export function InboxListView(props: ListViewServerProps) {
  const data = props.data as
    | { docs?: InboxRow[]; page?: number; totalPages?: number; totalDocs?: number }
    | undefined

  const docs = (data?.docs || []) as InboxRow[]
  const page = Number(data?.page || 1)
  const totalPages = Number(data?.totalPages || 1)
  const totalDocs = Number(data?.totalDocs || docs.length)

  return (
    <Gutter className="inbox__gutter">
      {!data ? (
        <div className="inbox">
          <h1 className="inbox__title">Emails</h1>
          <p className="inbox__empty">No se pudo cargar la lista.</p>
        </div>
      ) : (
        <InboxTable docs={docs} page={page} totalPages={totalPages} totalDocs={totalDocs} />
      )}
    </Gutter>
  )
}
