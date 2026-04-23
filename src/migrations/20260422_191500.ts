import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "header_settings"
    ADD COLUMN IF NOT EXISTS "background_color" varchar,
    ADD COLUMN IF NOT EXISTS "backdrop_blur" boolean DEFAULT true,
    ADD COLUMN IF NOT EXISTS "transparency" numeric DEFAULT 80,
    ADD COLUMN IF NOT EXISTS "height" varchar DEFAULT 'md';
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "header_settings"
    DROP COLUMN IF EXISTS "background_color",
    DROP COLUMN IF EXISTS "backdrop_blur",
    DROP COLUMN IF EXISTS "transparency",
    DROP COLUMN IF EXISTS "height";
  `)
}
