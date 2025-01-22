CREATE TABLE IF NOT EXISTS "products" (
	"productid" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services" (
	"serviceid" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
