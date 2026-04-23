import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "settings"
    ADD COLUMN IF NOT EXISTS "metadata_site_icon_id" integer;

    DO $$ BEGIN
      ALTER TABLE "settings"
      ADD CONSTRAINT "settings_metadata_site_icon_id_media_id_fk"
      FOREIGN KEY ("metadata_site_icon_id")
      REFERENCES "public"."media"("id")
      ON DELETE set null
      ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "settings_metadata_site_icon_idx"
    ON "settings" USING btree ("metadata_site_icon_id");
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "settings"
    DROP CONSTRAINT IF EXISTS "settings_metadata_site_icon_id_media_id_fk";

    DROP INDEX IF EXISTS "settings_metadata_site_icon_idx";

    ALTER TABLE "settings"
    DROP COLUMN IF EXISTS "metadata_site_icon_id";
  `)
}
