import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "landing_pages_blocks_form_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Prefere que a gente te ligue?',
  	"description" varchar DEFAULT 'Deixe seus dados que nossa equipe entra em contato rapidamente.',
  	"button_text" varchar DEFAULT 'Quero atendimento',
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_form_lead" ADD CONSTRAINT "landing_pages_blocks_form_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_form_lead_order_idx" ON "landing_pages_blocks_form_lead" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_form_lead_parent_id_idx" ON "landing_pages_blocks_form_lead" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_form_lead_path_idx" ON "landing_pages_blocks_form_lead" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "landing_pages_blocks_form_lead" CASCADE;`)
}
