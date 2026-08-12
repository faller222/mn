import type { CollectionAfterChangeHook, CollectionConfig, FieldHook, TextFieldValidation } from 'payload'
import { revalidatePath } from 'next/cache'
import { publicPostWhere } from '@/lib/post-types'
import { isValidSlug, normalizeSlug } from '@/lib/slug'

const normalizeSlugHook: FieldHook = ({ value }) => {
  if (typeof value !== 'string') return value
  return normalizeSlug(value)
}

const validateSlug: TextFieldValidation = (value) => {
  if (value == null || value === '') return 'El slug es obligatorio.'
  if (typeof value !== 'string') return 'Slug inválido.'
  // Validamos el valor normalizado para no marcar error mientras tipean un guión al final.
  const normalized = normalizeSlug(value)
  if (!isValidSlug(normalized)) {
    return 'Usá solo minúsculas, números y guiones (ej: entrevista-leticia-correa).'
  }
  return true
}

const revalidatePublicPosts: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  revalidatePath('/noticias')
  revalidatePath('/')
  if (doc?.slug) {
    revalidatePath(`/noticias/${doc.slug}`)
    revalidatePath(`/api/share/noticias/${doc.slug}`)
  }
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    revalidatePath(`/noticias/${previousDoc.slug}`)
    revalidatePath(`/api/share/noticias/${previousDoc.slug}`)
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
      hooks: {
        beforeValidate: [normalizeSlugHook],
      },
      validate: validateSlug,
      admin: {
        position: 'sidebar',
        description: 'Se corrige solo: espacios→guión, sin tildes. Ej: entrevista-leticia-correa',
        placeholder: 'entrevista-nombre-apellido',
        components: {
          Field: '@/components/admin/SlugField#SlugField',
        },
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
