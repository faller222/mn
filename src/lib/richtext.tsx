import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { DefaultNodeTypes, SerializedRelationshipNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from 'lexical'

type NodeTypes = DefaultNodeTypes | SerializedRelationshipNode

const converters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  relationship: ({ node }) => {
    const value = node.value
    if (!value || typeof value !== 'object') {
      return (
        <aside className="richtext-relationship richtext-relationship--empty">
          Contenido relacionado
        </aside>
      )
    }

    const doc = value as {
      title?: string
      slug?: string
      filename?: string
      alt?: string
    }
    const label = doc.title || doc.filename || doc.alt || 'Contenido relacionado'
    const href =
      node.relationTo === 'posts' && doc.slug ? `/noticias/${doc.slug}` : undefined

    if (href) {
      return (
        <aside className="richtext-relationship">
          <a href={href}>{label}</a>
        </aside>
      )
    }

    return <aside className="richtext-relationship">{label}</aside>
  },
})

export function RichText({ data }: { data: unknown }) {
  if (!data || typeof data !== 'object') return null
  const editorState = data as SerializedEditorState
  if (!editorState.root?.children?.length) return null

  return (
    <PayloadRichText
      className="richtext"
      data={editorState}
      converters={converters}
    />
  )
}
