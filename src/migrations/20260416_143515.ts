import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "landing_pages"
    ADD COLUMN IF NOT EXISTS "show_header" boolean DEFAULT true;

    UPDATE "landing_pages"
    SET "show_header" = true
    WHERE "show_header" IS NULL;
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "landing_pages"
    DROP COLUMN IF EXISTS "show_header";
  `)
}
