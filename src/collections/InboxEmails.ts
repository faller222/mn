import type { CollectionConfig } from 'payload'

export const InboxEmails: CollectionConfig = {
  slug: 'inbox-emails',
  labels: {
    singular: 'Email recibido',
    plural: 'Bandeja de entrada',
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'from', 'receivedAt', 'updatedAt'],
    group: 'Email',
    description: 'Emails recibidos vía Resend (sincronizados por API o webhook).',
    components: {
      beforeList: ['@/components/admin/SyncInboxButton#SyncInboxButton'],
    },
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => false,
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'subject',
      type: 'text',
      label: 'Asunto',
      required: true,
    },
    {
      name: 'from',
      type: 'text',
      label: 'De',
      required: true,
      index: true,
    },
    {
      name: 'to',
      type: 'json',
      label: 'Para',
      required: true,
    },
    {
      name: 'cc',
      type: 'json',
      label: 'CC',
      admin: { readOnly: true },
    },
    {
      name: 'bcc',
      type: 'json',
      label: 'CCO',
      admin: { readOnly: true },
    },
    {
      name: 'replyTo',
      type: 'json',
      label: 'Reply-To',
      admin: { readOnly: true },
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Texto plano',
      admin: { readOnly: true },
    },
    {
      name: 'html',
      type: 'textarea',
      label: 'HTML',
      admin: {
        readOnly: true,
        description: 'Cuerpo HTML tal como lo devuelve Resend.',
      },
    },
    {
      name: 'receivedAt',
      type: 'date',
      label: 'Recibido',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
    },
    {
      name: 'resendId',
      type: 'text',
      label: 'Resend ID',
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'ID único en Resend — usado para evitar duplicados.',
      },
    },
    {
      name: 'messageId',
      type: 'text',
      label: 'Message-ID',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'receivedFor',
      type: 'json',
      label: 'Received-For',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'attachmentsMeta',
      type: 'json',
      label: 'Adjuntos (metadata)',
      admin: {
        readOnly: true,
        description: 'Metadata de adjuntos. Descarga vía API de Resend si hace falta.',
      },
    },
    {
      name: 'svixId',
      type: 'text',
      label: 'Svix event ID',
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'ID del evento webhook (dedupe de entregas).',
      },
    },
  ],
}
