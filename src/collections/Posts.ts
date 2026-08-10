import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { publicPostWhere } from '@/lib/post-types'

const revalidatePublicPosts: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  revalidatePath('/noticias')
  revalidatePath('/')
  if (doc?.slug) revalidatePath(`/noticias/${doc.slug}`)
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    revalidatePath(`/noticias/${previousDoc.slug}`)
  }
  return doc
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Nota',
    plural: 'Notas',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'updatedAt'],
    description: 'Notas y entrevistas publicadas en MN.',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return publicPostWhere()
    },
  },
  hooks: {
    afterChange: [revalidatePublicPosts],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Identificador en la URL. Ej: entrevista-leticia-correa',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Resumen',
      admin: {
        description: 'Texto corto para listados y cards.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Cuerpo',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Imagen de portada',
      relationTo: 'media',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Fecha de publicación',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Obligatoria para que la nota aparezca en el sitio.',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
        { label: 'Oculto', value: 'hidden' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Solo “Publicado” se muestra en el sitio (con fecha).',
      },
    },
  ],
}
