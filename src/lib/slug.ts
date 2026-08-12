/** Solo minúsculas, números y guiones; sin tildes ni caracteres raros. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * Máscara en vivo: corrige mientras escribe o pega.
 * Espacios → guión, tildes → sin tilde, resto inválido se elimina.
 * No recorta guiones al final para no pelear con el tipeo ("entrevista-").
 */
export function maskSlugInput(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
}

/** Valor final para guardar / validar. */
export function normalizeSlug(input: string): string {
  return maskSlugInput(input).replace(/^-+|-+$/g, '')
}

export function isValidSlug(value: unknown): value is string {
  return typeof value === 'string' && SLUG_PATTERN.test(value)
}
