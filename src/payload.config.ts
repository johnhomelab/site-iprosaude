// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Leads } from './collections/Leads'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { HeaderSettings } from './globals/HeaderSettings'
import { FooterSettings } from './globals/FooterSettings';
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { tratamentos } from './collections/Tratamentos'
import { LandingPages } from './collections/LandingPages'
import { Settings } from './globals/Settings'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
    url: ({ data, collectionConfig }) => {
      // landing-pages: slug home => "/"
      if (collectionConfig.slug === 'landing-pages') {
        const slug = (data as any)?.slug
        return slug === 'home' ? '/' : `/${slug || ''}`
      }

      // fallback
      return '/'
    },

    breakpoints: [
      { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
      { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
      { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
    ],
  },
  },
  routes: {
    admin: "/cms/admin",
    api: "/cms/api",
  },
  
  
  // 👇 GLOBALS DEVE FICAR AQUI, NA RAIZ DO BUILDCONFIG 👇
  globals: [
    HeaderSettings,
    FooterSettings,
    Settings, // Adicionei o Settings aqui já que você o importou no topo
  ],
  
  
  collections: [Users, Media, tratamentos, LandingPages, Leads],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    prodMigrations: migrations,
    push: false,
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
