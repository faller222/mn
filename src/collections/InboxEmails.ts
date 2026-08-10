import type { CollectionConfig } from 'payload'

const hiddenData = {
  readOnly: true,
  hidden: true,
} as const

export const InboxEmails: CollectionConfig = {
  slug: 'inbox-emails',
  labels: {
    singular: 'Email',
    plural: 'Emails',
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['from', 'to', 'subject', 'receivedAt'],
    group: 'Email',
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
    read: ({ req: { user } }) => {
      if (!user) return false
      return {
        deleted: {
          not_equals: true,
        },
      }
    },
    create: () => false,
    update: ({ req: { user } }) => Boolean(user),
    delete: () => false,
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
      },
    },
    {
      name: 'deleted',
      type: 'checkbox',
      label: 'Eliminado',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'from',
      type: 'text',
      label: 'Emisor',
      required: true,
      index: true,
      admin: hiddenData,
    },
    {
      name: 'to',
      type: 'json',
      label: 'Receptor',
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
      label: 'Fecha',
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
      label: 'Adjuntos',
      admin: hiddenData,
    },
    {
      type: 'collapsible',
      label: 'Detalles técnicos',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'resendId',
          type: 'text',
          label: 'Resend ID',
          required: true,
          unique: true,
          index: true,
          admin: { readOnly: true },
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
          admin: { readOnly: true },
        },
        {
          name: 'receivedFor',
          type: 'json',
          label: 'Recibido para',
          admin: { readOnly: true },
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
