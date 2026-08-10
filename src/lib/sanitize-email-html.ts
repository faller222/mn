import DOMPurify from 'isomorphic-dompurify'

/** Sanitize inbound email HTML for safe admin rendering (no scripts / active content). */
export function sanitizeEmailHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'link', 'meta'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target'],
  })
}
