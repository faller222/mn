const STORAGE_KEY = 'mn-inbox-read-ids'

function readSet(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as unknown) : []
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((v): v is string => typeof v === 'string'))
  } catch {
    return new Set()
  }
}

function writeSet(ids: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
}

export function isInboxReadLocal(id: string | number): boolean {
  return readSet().has(String(id))
}

export function setInboxReadLocal(id: string | number, read: boolean) {
  const ids = readSet()
  const key = String(id)
  if (read) ids.add(key)
  else ids.delete(key)
  writeSet(ids)
}

export function getInboxReadMap(ids: Array<string | number>): Record<string, boolean> {
  const set = readSet()
  const out: Record<string, boolean> = {}
  for (const id of ids) out[String(id)] = set.has(String(id))
  return out
}
