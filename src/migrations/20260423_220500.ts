import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "header_settings_menu_items"
    ADD COLUMN IF NOT EXISTS "new_tab" boolean DEFAULT false;

    ALTER TABLE "header_settings"
    ADD COLUMN IF NOT EXISTS "show_announcement" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "announcement_text" varchar,
    ADD COLUMN IF NOT EXISTS "announcement_color" varchar DEFAULT 'amber',
    ADD COLUMN IF NOT EXISTS "whatsapp_message" varchar;
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "header_settings_menu_items"
    DROP COLUMN IF EXISTS "new_tab";

    ALTER TABLE "header_settings"
    DROP COLUMN IF EXISTS "show_announcement",
    DROP COLUMN IF EXISTS "announcement_text",
    DROP COLUMN IF EXISTS "announcement_color",
    DROP COLUMN IF EXISTS "whatsapp_message";
  `)
}
