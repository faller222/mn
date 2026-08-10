import type { CollectionConfig } from 'payload'

const hiddenData = {
  readOnly: true,
  hidden: true,
} as const

export const InboxEmails: CollectionConfig = {
  slug: 'inbox-emails',
  labels: {
    singular: 'Email recibido',
    plural: 'Bandeja de entrada',
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'from', 'to', 'receivedAt', 'isRead'],
    group: 'Email',
    description: 'Bandeja de emails recibidos vía Resend.',
    disableCopyToLocale: true,
    components: {
      views: {
        list: {
          Component: '@/components/admin/inbox/InboxListView#InboxListView',
        },
      },
      edit: {
        SaveButton: '@/components/admin/inbox/HiddenSaveButton#HiddenSaveButton',
      },
    },
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => false,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  defaultSort: '-receivedAt',
  fields: [
    {
      name: 'emailView',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/inbox/EmailMessageField#EmailMessageField',
        },
      },
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Asunto',
      required: true,
      admin: hiddenData,
    },
    {
      name: 'isRead',
      type: 'checkbox',
      label: 'Leído',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Estado de lectura en la bandeja.',
      },
    },
    {
      name: 'from',
      type: 'text',
      label: 'De',
      required: true,
      index: true,
      admin: hiddenData,
    },
    // JSON arrays — avoid Payload hasMany join tables (inbox_emails_texts) that may not exist in prod.
    {
      name: 'to',
      type: 'json',
      label: 'Para',
      required: true,
      admin: hiddenData,
    },
    {
      name: 'cc',
      type: 'json',
      label: 'CC',
      admin: hiddenData,
    },
    {
      name: 'bcc',
      type: 'json',
      label: 'CCO',
      admin: hiddenData,
    },
    {
      name: 'replyTo',
      type: 'json',
      label: 'Reply-To',
      admin: hiddenData,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Texto plano',
      admin: hiddenData,
    },
    {
      name: 'html',
      type: 'textarea',
      label: 'HTML',
      admin: hiddenData,
    },
    {
      name: 'receivedAt',
      type: 'date',
      label: 'Recibido',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'attachmentsMeta',
      type: 'json',
      label: 'Adjuntos (metadata)',
      admin: hiddenData,
    },
    {
      type: 'collapsible',
      label: 'Detalles técnicos',
      admin: {
        initCollapsed: true,
        description: 'IDs y metadata de Resend / webhook (debug y dedupe).',
      },
      fields: [
        {
          name: 'resendId',
          type: 'text',
          label: 'Resend ID',
          required: true,
          unique: true,
          index: true,
          admin: {
            readOnly: true,
            description: 'ID único en Resend — evita duplicados.',
          },
        },
        {
          name: 'messageId',
          type: 'text',
          label: 'Message-ID',
          admin: { readOnly: true },
        },
        {
          name: 'svixId',
          type: 'text',
          label: 'Svix event ID',
          index: true,
          admin: {
            readOnly: true,
            description: 'ID del evento webhook (dedupe de entregas).',
          },
        },
        {
          name: 'receivedFor',
          type: 'json',
          label: 'Recibido para',
          admin: {
            readOnly: true,
            description: 'Casilla real del catch-all (Received-For).',
          },
        },
        {
          name: 'attachmentsRaw',
          type: 'ui',
          admin: {
            components: {
              Field: '@/components/admin/inbox/AttachmentsRawField#AttachmentsRawField',
            },
          },
        },
      ],
    },
  ],
}
