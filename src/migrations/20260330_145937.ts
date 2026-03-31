import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "landing_pages_blocks_before_after_comparisons_comparisons" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "landing_pages_blocks_before_after_comparisons_comparisons" CASCADE;
  ALTER TABLE "landing_pages_blocks_before_after_comparisons" ADD COLUMN "before_image_id" integer NOT NULL;
  ALTER TABLE "landing_pages_blocks_before_after_comparisons" ADD COLUMN "after_image_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_before_after_comparisons" ADD CONSTRAINT "landing_pages_blocks_before_after_comparisons_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_before_after_comparisons" ADD CONSTRAINT "landing_pages_blocks_before_after_comparisons_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_before_after_comparisons_before_image_idx" ON "landing_pages_blocks_before_after_comparisons" USING btree ("before_image_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_before_after_comparisons_after_image_idx" ON "landing_pages_blocks_before_after_comparisons" USING btree ("after_image_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "landing_pages_blocks_before_after_comparisons_comparisons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"before_image_id" integer NOT NULL,
  	"after_image_id" integer NOT NULL
  );
  
  ALTER TABLE "landing_pages_blocks_before_after_comparisons" DROP CONSTRAINT "landing_pages_blocks_before_after_comparisons_before_image_id_media_id_fk";
  
  ALTER TABLE "landing_pages_blocks_before_after_comparisons" DROP CONSTRAINT "landing_pages_blocks_before_after_comparisons_after_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "landing_pages_blocks_before_after_comparisons_before_image_idx";
  DROP INDEX IF EXISTS "landing_pages_blocks_before_after_comparisons_after_image_idx";
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_before_after_comparisons_comparisons" ADD CONSTRAINT "landing_pages_blocks_before_after_comparisons_comparisons_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_before_after_comparisons_comparisons" ADD CONSTRAINT "landing_pages_blocks_before_after_comparisons_comparisons_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_before_after_comparisons_comparisons" ADD CONSTRAINT "landing_pages_blocks_before_after_comparisons_comparisons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_before_after_comparisons"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_before_after_comparisons_comparisons_order_idx" ON "landing_pages_blocks_before_after_comparisons_comparisons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_before_after_comparisons_comparisons_parent_id_idx" ON "landing_pages_blocks_before_after_comparisons_comparisons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_before_after_comparisons_comparisons_before_image_idx" ON "landing_pages_blocks_before_after_comparisons_comparisons" USING btree ("before_image_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_before_after_comparisons_comparisons_after_image_idx" ON "landing_pages_blocks_before_after_comparisons_comparisons" USING btree ("after_image_id");
  ALTER TABLE "landing_pages_blocks_before_after_comparisons" DROP COLUMN IF EXISTS "before_image_id";
  ALTER TABLE "landing_pages_blocks_before_after_comparisons" DROP COLUMN IF EXISTS "after_image_id";`)
}
