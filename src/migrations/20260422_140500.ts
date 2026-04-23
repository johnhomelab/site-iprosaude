import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "landing_pages_blocks_form"
    ADD COLUMN IF NOT EXISTS "title" varchar,
    ADD COLUMN IF NOT EXISTS "description" varchar,
    ADD COLUMN IF NOT EXISTS "show_button" boolean DEFAULT true,
    ADD COLUMN IF NOT EXISTS "button_text" varchar DEFAULT 'Solicitar Atendimento',
    ADD COLUMN IF NOT EXISTS "webhook_url" varchar;

    UPDATE "landing_pages_blocks_form"
    SET
      "show_button" = COALESCE("show_button", true),
      "button_text" = COALESCE(NULLIF("button_text", ''), 'Solicitar Atendimento')
    WHERE "show_button" IS NULL
      OR "button_text" IS NULL
      OR "button_text" = '';

    ALTER TABLE "leads"
    ADD COLUMN IF NOT EXISTS "email" varchar,
    ADD COLUMN IF NOT EXISTS "page_slug" varchar,
    ADD COLUMN IF NOT EXISTS "source" varchar;
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "landing_pages_blocks_form"
    DROP COLUMN IF EXISTS "title",
    DROP COLUMN IF EXISTS "description",
    DROP COLUMN IF EXISTS "show_button",
    DROP COLUMN IF EXISTS "button_text",
    DROP COLUMN IF EXISTS "webhook_url";

    ALTER TABLE "leads"
    DROP COLUMN IF EXISTS "email",
    DROP COLUMN IF EXISTS "page_slug",
    DROP COLUMN IF EXISTS "source";
  `)
}
