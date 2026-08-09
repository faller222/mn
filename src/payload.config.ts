import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cloudinaryStorage } from 'payload-cloudinary'

import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const cloudinaryEnabled = Boolean(
  cloudName && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET,
)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — MN Admin',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'es',
    supportedLanguages: { es },
  },
  collections: [Users, Media, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'change-me-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 10000,
      max: 5,
    },
  }),
  sharp,
  plugins: cloudinaryEnabled
    ? [
        cloudinaryStorage({
          config: {
            cloud_name: cloudName!,
            api_key: process.env.CLOUDINARY_API_KEY!,
            api_secret: process.env.CLOUDINARY_API_SECRET!,
          },
          collections: {
            media: true,
          },
          folder: 'mn',
          disableLocalStorage: true,
        }),
      ]
    : [],
})
