import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medio',
    plural: 'Medios',
  },
  admin: {
    description: 'Imágenes y archivos (Cloudinary).',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true,
      admin: {
        description:
          'Una frase que describa la imagen (accesibilidad + buscadores). Tocá (?) para la guía.',
        components: {
          Label: '@/components/admin/AltTextLabel#AltTextLabel',
        },
      },
    },
  ],
  upload: true,
}
