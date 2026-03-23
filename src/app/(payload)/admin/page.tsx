export const dynamic = 'force-dynamic'

import config from '@payload-config'
import { RootPage } from '@payloadcms/next/views'
import { importMap } from '../../cms/admin/importMap'

type Args = {
  params: Promise<{
    segments?: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap })

export default Page