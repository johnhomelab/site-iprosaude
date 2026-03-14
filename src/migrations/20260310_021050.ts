import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "header_settings_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS "header_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_text_primary" varchar DEFAULT 'IPRO' NOT NULL,
  	"logo_text_highlight" varchar DEFAULT '-Saúde' NOT NULL,
  	"logo_image_id" integer,
  	"show_whatsapp_button" boolean DEFAULT true,
  	"whatsapp_number" varchar DEFAULT '5575991904849',
  	"whatsapp_button_text" varchar DEFAULT 'Agendar Avaliação',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "header_settings_menu_items" ADD CONSTRAINT "header_settings_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_settings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_settings" ADD CONSTRAINT "header_settings_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_settings_menu_items_order_idx" ON "header_settings_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_settings_menu_items_parent_id_idx" ON "header_settings_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_settings_logo_image_idx" ON "header_settings" USING btree ("logo_image_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "header_settings_menu_items" CASCADE;
  DROP TABLE "header_settings" CASCADE;`)
}
