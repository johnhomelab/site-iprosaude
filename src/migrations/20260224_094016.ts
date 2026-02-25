import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_landing_pages_blocks_cta_style" AS ENUM('default', 'urgent');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tratamentos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"descricao" varchar,
  	"imagem_destaque_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages_blocks_hero_gold" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"cta_text" varchar,
  	"cta_link" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"testimonial" varchar,
  	"rating" numeric,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"url" varchar,
  	"label" varchar,
  	"style" "enum_landing_pages_blocks_cta_style" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages_blocks_treatment_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Nossos Tratamentos',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages_blocks_before_after" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"before_image_id" integer NOT NULL,
  	"after_image_id" integer NOT NULL,
  	"label_before" varchar DEFAULT 'Antes',
  	"label_after" varchar DEFAULT 'Depois',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "landing_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"show_floating_button" boolean DEFAULT true,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"tratamentos_id" integer,
  	"landing_pages_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"analytics_header_scripts" varchar,
  	"analytics_body_scripts" varchar,
  	"contact_whatsapp" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "tratamentos" ADD CONSTRAINT "tratamentos_imagem_destaque_id_media_id_fk" FOREIGN KEY ("imagem_destaque_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_hero" ADD CONSTRAINT "landing_pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_hero" ADD CONSTRAINT "landing_pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_hero_gold" ADD CONSTRAINT "landing_pages_blocks_hero_gold_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_hero_gold" ADD CONSTRAINT "landing_pages_blocks_hero_gold_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_content" ADD CONSTRAINT "landing_pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_features_features" ADD CONSTRAINT "landing_pages_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_features" ADD CONSTRAINT "landing_pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_testimonials_items" ADD CONSTRAINT "landing_pages_blocks_testimonials_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_testimonials_items" ADD CONSTRAINT "landing_pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_testimonials" ADD CONSTRAINT "landing_pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_form" ADD CONSTRAINT "landing_pages_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_cta" ADD CONSTRAINT "landing_pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_treatment_list" ADD CONSTRAINT "landing_pages_blocks_treatment_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_before_after" ADD CONSTRAINT "landing_pages_blocks_before_after_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_before_after" ADD CONSTRAINT "landing_pages_blocks_before_after_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages_blocks_before_after" ADD CONSTRAINT "landing_pages_blocks_before_after_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tratamentos_fk" FOREIGN KEY ("tratamentos_id") REFERENCES "public"."tratamentos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_landing_pages_fk" FOREIGN KEY ("landing_pages_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE UNIQUE INDEX IF NOT EXISTS "tratamentos_slug_idx" ON "tratamentos" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "tratamentos_imagem_destaque_idx" ON "tratamentos" USING btree ("imagem_destaque_id");
  CREATE INDEX IF NOT EXISTS "tratamentos_updated_at_idx" ON "tratamentos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tratamentos_created_at_idx" ON "tratamentos" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_hero_order_idx" ON "landing_pages_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_hero_parent_id_idx" ON "landing_pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_hero_path_idx" ON "landing_pages_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_hero_background_image_idx" ON "landing_pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_hero_gold_order_idx" ON "landing_pages_blocks_hero_gold" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_hero_gold_parent_id_idx" ON "landing_pages_blocks_hero_gold" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_hero_gold_path_idx" ON "landing_pages_blocks_hero_gold" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_hero_gold_image_idx" ON "landing_pages_blocks_hero_gold" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_content_order_idx" ON "landing_pages_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_content_parent_id_idx" ON "landing_pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_content_path_idx" ON "landing_pages_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_features_features_order_idx" ON "landing_pages_blocks_features_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_features_features_parent_id_idx" ON "landing_pages_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_features_order_idx" ON "landing_pages_blocks_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_features_parent_id_idx" ON "landing_pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_features_path_idx" ON "landing_pages_blocks_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_testimonials_items_order_idx" ON "landing_pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_testimonials_items_parent_id_idx" ON "landing_pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_testimonials_items_image_idx" ON "landing_pages_blocks_testimonials_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_testimonials_order_idx" ON "landing_pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_testimonials_parent_id_idx" ON "landing_pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_testimonials_path_idx" ON "landing_pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_form_order_idx" ON "landing_pages_blocks_form" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_form_parent_id_idx" ON "landing_pages_blocks_form" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_form_path_idx" ON "landing_pages_blocks_form" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_cta_order_idx" ON "landing_pages_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_cta_parent_id_idx" ON "landing_pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_cta_path_idx" ON "landing_pages_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_treatment_list_order_idx" ON "landing_pages_blocks_treatment_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_treatment_list_parent_id_idx" ON "landing_pages_blocks_treatment_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_treatment_list_path_idx" ON "landing_pages_blocks_treatment_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_before_after_order_idx" ON "landing_pages_blocks_before_after" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_before_after_parent_id_idx" ON "landing_pages_blocks_before_after" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_before_after_path_idx" ON "landing_pages_blocks_before_after" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_before_after_before_image_idx" ON "landing_pages_blocks_before_after" USING btree ("before_image_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_blocks_before_after_after_image_idx" ON "landing_pages_blocks_before_after" USING btree ("after_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "landing_pages_slug_idx" ON "landing_pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "landing_pages_meta_meta_image_idx" ON "landing_pages" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "landing_pages_updated_at_idx" ON "landing_pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "landing_pages_created_at_idx" ON "landing_pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tratamentos_id_idx" ON "payload_locked_documents_rels" USING btree ("tratamentos_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_landing_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("landing_pages_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "tratamentos" CASCADE;
  DROP TABLE "landing_pages_blocks_hero" CASCADE;
  DROP TABLE "landing_pages_blocks_hero_gold" CASCADE;
  DROP TABLE "landing_pages_blocks_content" CASCADE;
  DROP TABLE "landing_pages_blocks_features_features" CASCADE;
  DROP TABLE "landing_pages_blocks_features" CASCADE;
  DROP TABLE "landing_pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "landing_pages_blocks_testimonials" CASCADE;
  DROP TABLE "landing_pages_blocks_form" CASCADE;
  DROP TABLE "landing_pages_blocks_cta" CASCADE;
  DROP TABLE "landing_pages_blocks_treatment_list" CASCADE;
  DROP TABLE "landing_pages_blocks_before_after" CASCADE;
  DROP TABLE "landing_pages" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TYPE "public"."enum_landing_pages_blocks_cta_style";`)
}
