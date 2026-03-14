import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "footer_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"clinic_name" varchar DEFAULT 'Clínica Odontológica IPRO-Saúde' NOT NULL,
  	"responsible" varchar DEFAULT 'Dr. John' NOT NULL,
  	"cro" varchar NOT NULL,
  	"cnpj" varchar NOT NULL,
  	"specialty" varchar DEFAULT 'Implantes e Prótese',
  	"phone" varchar DEFAULT '5575991904849' NOT NULL,
  	"phone_formatted" varchar DEFAULT '(75) 99190-4849' NOT NULL,
  	"address" varchar DEFAULT 'Feira de Santana - BA' NOT NULL,
  	"maps_query" varchar DEFAULT 'Clínica+IPRO-Saúde,Feira+de+Santana-BA',
  	"instagram_url" varchar DEFAULT 'https://instagram.com/iprosaude',
  	"site_url" varchar DEFAULT 'https://iprosaude.com.br',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "footer_settings" CASCADE;`)
}
