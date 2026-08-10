'use client'

import { useDocumentInfo } from '@payloadcms/ui'

/** Technical dump of attachments metadata inside the collapsible. */
export function AttachmentsRawField() {
  const { initialData } = useDocumentInfo()
  const meta = (initialData as { attachmentsMeta?: unknown } | undefined)?.attachmentsMeta

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <p style={{ margin: '0 0 0.4rem', color: 'var(--theme-elevation-500)', fontSize: '0.85rem' }}>
        Metadata de adjuntos (JSON)
      </p>
      <pre
        style={{
          margin: 0,
          padding: '0.75rem',
          borderRadius: 8,
          background: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-150)',
          overflow: 'auto',
          fontSize: '0.8rem',
        }}
      >
        {JSON.stringify(meta ?? [], null, 2)}
      </pre>
    </div>
  )
}
