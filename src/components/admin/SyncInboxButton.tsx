'use client'

import { Button, toast } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

/** Admin list action: sync Resend received emails into Payload. */
export function SyncInboxButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSync() {
    setLoading(true)
    try {
      const res = await fetch('/api/inbox/sync', { method: 'POST' })
      const data = (await res.json()) as {
        ok?: boolean
        created?: number
        updated?: number
        total?: number
        error?: string
      }

      if (!res.ok) {
        throw new Error(data.error || `Error ${res.status}`)
      }

      toast.success(
        `Sincronizado: ${data.total ?? 0} leídos · ${data.created ?? 0} nuevos · ${data.updated ?? 0} actualizados`,
      )
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo sincronizar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button type="button" onClick={() => void onSync()} disabled={loading}>
      {loading ? 'Sincronizando…' : 'Sincronizar con Resend'}
    </Button>
  )
}
