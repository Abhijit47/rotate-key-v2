CREATE TYPE "public"."plan" AS ENUM('basic', 'pro', 'enterprise', 'free');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'moderator', 'guest');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'approved', 'declined', 'completed');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"guest_count" integer NOT NULL,
	"match_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "bookings_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "connection_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_user_id" text NOT NULL,
	"property_id" uuid NOT NULL,
	"author_id" text NOT NULL,
	"match_id" uuid,
	"guests" integer DEFAULT 1 NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "connection_requests_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "likes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_user_id" text NOT NULL,
	"property_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "likes_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user1_id" text NOT NULL,
	"user2_id" text NOT NULL,
	"property1_id" uuid NOT NULL,
	"property2_id" uuid NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"channel_id" varchar,
	"channel_type" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "matches_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"address" varchar(250) NOT NULL,
	"country" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"zipcode" varchar(10) NOT NULL,
	"area" varchar(50) NOT NULL,
	"area_unit" varchar(20) NOT NULL,
	"description" varchar(5000) NOT NULL,
	"type" varchar(50) NOT NULL,
	"ownership" varchar(50) NOT NULL,
	"swapping" varchar(50) NOT NULL,
	"rental_period" varchar(50) NOT NULL,
	"surrounding" varchar(50) NOT NULL,
	"environment" varchar(50) NOT NULL,
	"owner_name" varchar(100),
	"owner_email" varchar(200),
	"owner_phone" varchar(20),
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"beds" integer NOT NULL,
	"guests" integer NOT NULL,
	"host_languages" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"accomodation" varchar(50) NOT NULL,
	"amenities" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"rules" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"accessibilities" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"duration_days" integer DEFAULT 0 NOT NULL,
	"images" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"author_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "properties_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "swaps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user1_id" text NOT NULL,
	"user2_id" text NOT NULL,
	"match_id" uuid NOT NULL,
	"property1_id" uuid NOT NULL,
	"property2_id" uuid NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "swaps_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user_info" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"client_ip" varchar DEFAULT 'N/A' NOT NULL,
	"user_agent" varchar DEFAULT 'N/A' NOT NULL,
	"domain_name" varchar,
	"logo_image_url" varchar,
	"logo_url" varchar,
	"name" varchar,
	"url" varchar,
	"browser_name" varchar,
	"device_type" varchar,
	"ip_address" varchar,
	"location" varchar,
	"operating_system" varchar,
	"revoke_session_url" varchar,
	"session_created_at" varchar,
	"sign_in_method" varchar,
	"support_email" varchar,
	"delivered_by_clerk" boolean,
	"from_email_name" varchar,
	"evt_id" varchar,
	"object" varchar,
	"reply_to_email_name" varchar,
	"slug" varchar,
	"status" varchar,
	"subject" varchar,
	"to_email_address" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_info_id_unique" UNIQUE("id"),
	CONSTRAINT "user_info_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text DEFAULT '',
	"avatar" text DEFAULT 'https://www.gravatar.com/avatar?d=mp' NOT NULL,
	"role" "role" DEFAULT 'guest' NOT NULL,
	"plan" "plan" DEFAULT 'free' NOT NULL,
	"is_subscribed" boolean DEFAULT false NOT NULL,
	"is_email_verified" boolean DEFAULT false,
	"preferences" jsonb DEFAULT '{"fromLocation":{"city":"N/A","state":"N/A","country":"N/A"},"toLocation":{"city":"N/A","state":"N/A","country":"N/A"}}'::jsonb,
	"is_onboarded" boolean DEFAULT false NOT NULL,
	"last_active_at" integer DEFAULT 0 NOT NULL,
	"last_sign_in_at" integer DEFAULT 0 NOT NULL,
	"banned" boolean DEFAULT false NOT NULL,
	"locked" boolean DEFAULT false NOT NULL,
	"password_enabled" boolean DEFAULT false NOT NULL,
	"visitors_count" integer DEFAULT 0 NOT NULL,
	"birthdate" timestamp with time zone NOT NULL,
	"bio" varchar(500) DEFAULT '' NOT NULL,
	"country" varchar(100),
	"state" varchar(100),
	"city" varchar(100),
	"zipcode" varchar(10),
	"phone_number" varchar(20),
	"profile_verification_documents" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_document_verified" boolean DEFAULT false NOT NULL,
	"languages" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_online" boolean DEFAULT false,
	"stream_token" varchar,
	"expire_time" integer,
	"issued_at" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"viewer_id" varchar,
	"viewed_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "views_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connection_requests" ADD CONSTRAINT "connection_requests_from_user_id_users_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connection_requests" ADD CONSTRAINT "connection_requests_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connection_requests" ADD CONSTRAINT "connection_requests_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connection_requests" ADD CONSTRAINT "connection_requests_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_from_user_id_users_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_user1_id_users_id_fk" FOREIGN KEY ("user1_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_user2_id_users_id_fk" FOREIGN KEY ("user2_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_property1_id_properties_id_fk" FOREIGN KEY ("property1_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_property2_id_properties_id_fk" FOREIGN KEY ("property2_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "swaps" ADD CONSTRAINT "swaps_user1_id_users_id_fk" FOREIGN KEY ("user1_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "swaps" ADD CONSTRAINT "swaps_user2_id_users_id_fk" FOREIGN KEY ("user2_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "swaps" ADD CONSTRAINT "swaps_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "swaps" ADD CONSTRAINT "swaps_property1_id_properties_id_fk" FOREIGN KEY ("property1_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "swaps" ADD CONSTRAINT "swaps_property2_id_properties_id_fk" FOREIGN KEY ("property2_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "views" ADD CONSTRAINT "views_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "views" ADD CONSTRAINT "views_viewer_id_users_id_fk" FOREIGN KEY ("viewer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_bookings_user" ON "bookings" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_bookings_property" ON "bookings" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "idx_bookings_match" ON "bookings" USING btree ("match_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uniq_connection_user_property" ON "connection_requests" USING btree ("from_user_id","property_id");--> statement-breakpoint
CREATE INDEX "idx_connection_property" ON "connection_requests" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "idx_connection_author" ON "connection_requests" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "idx_connection_created_at" ON "connection_requests" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "likes_unique" ON "likes" USING btree ("from_user_id","property_id");--> statement-breakpoint
CREATE INDEX "idx_likes_from_user" ON "likes" USING btree ("from_user_id");--> statement-breakpoint
CREATE INDEX "idx_likes_property" ON "likes" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "idx_likes_created_at" ON "likes" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "matches_unique" ON "matches" USING btree ("user1_id","user2_id","property1_id","property2_id");--> statement-breakpoint
CREATE INDEX "idx_matches_user1" ON "matches" USING btree ("user1_id");--> statement-breakpoint
CREATE INDEX "idx_matches_user2" ON "matches" USING btree ("user2_id");--> statement-breakpoint
CREATE INDEX "idx_matches_created_at" ON "matches" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "uniq_property_address" ON "properties" USING btree ("address","city","state","country");--> statement-breakpoint
CREATE UNIQUE INDEX "uniq_property_owner_email" ON "properties" USING btree ("owner_email");--> statement-breakpoint
CREATE UNIQUE INDEX "uniq_property_owner_phone" ON "properties" USING btree ("owner_phone");--> statement-breakpoint
CREATE INDEX "idx_properties_address" ON "properties" USING btree ("address");--> statement-breakpoint
CREATE INDEX "idx_properties_country" ON "properties" USING btree ("country");--> statement-breakpoint
CREATE INDEX "idx_properties_state" ON "properties" USING btree ("state");--> statement-breakpoint
CREATE INDEX "idx_properties_city" ON "properties" USING btree ("city");--> statement-breakpoint
CREATE INDEX "idx_properties_area" ON "properties" USING btree ("area");--> statement-breakpoint
CREATE INDEX "idx_properties_bedrooms" ON "properties" USING btree ("bedrooms");--> statement-breakpoint
CREATE INDEX "idx_properties_bathrooms" ON "properties" USING btree ("bathrooms");--> statement-breakpoint
CREATE INDEX "idx_properties_guests" ON "properties" USING btree ("guests");--> statement-breakpoint
CREATE INDEX "idx_properties_beds" ON "properties" USING btree ("beds");--> statement-breakpoint
CREATE INDEX "idx_properties_is_available" ON "properties" USING btree ("is_available");--> statement-breakpoint
CREATE INDEX "idx_properties_created_at" ON "properties" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_properties_author" ON "properties" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "idx_properties_location" ON "properties" USING btree ("city","state","country");--> statement-breakpoint
CREATE INDEX "idx_properties_type_availability" ON "properties" USING btree ("type","is_available");--> statement-breakpoint
CREATE INDEX "idx_properties_bedrooms_bathrooms" ON "properties" USING btree ("bedrooms","bathrooms");--> statement-breakpoint
CREATE INDEX "idx_properties_guests_beds" ON "properties" USING btree ("guests","beds");--> statement-breakpoint
CREATE INDEX "idx_swaps_property1" ON "swaps" USING btree ("property1_id");--> statement-breakpoint
CREATE INDEX "idx_swaps_property2" ON "swaps" USING btree ("property2_id");--> statement-breakpoint
CREATE INDEX "idx_swaps_user1" ON "swaps" USING btree ("user1_id");--> statement-breakpoint
CREATE INDEX "idx_swaps_user2" ON "swaps" USING btree ("user2_id");--> statement-breakpoint
CREATE INDEX "idx_swaps_match" ON "swaps" USING btree ("match_id");--> statement-breakpoint
CREATE INDEX "idx_swaps_status" ON "swaps" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "uniq_swap_pure" ON "swaps" USING btree ("user1_id","user2_id","property1_id","property2_id","match_id");--> statement-breakpoint
CREATE INDEX "idx_users_clerk_id" ON "users" USING btree ("clerk_id");--> statement-breakpoint
CREATE INDEX "idx_users_full_name" ON "users" USING btree ("full_name");--> statement-breakpoint
CREATE INDEX "idx_users_is_onboarded" ON "users" USING btree ("is_onboarded");--> statement-breakpoint
CREATE INDEX "idx_users_is_email_verified" ON "users" USING btree ("is_email_verified");--> statement-breakpoint
CREATE INDEX "idx_users_role" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "idx_users_plan" ON "users" USING btree ("plan");--> statement-breakpoint
CREATE INDEX "idx_users_is_subscribed" ON "users" USING btree ("is_subscribed");--> statement-breakpoint
CREATE INDEX "idx_users_banned" ON "users" USING btree ("banned");--> statement-breakpoint
CREATE INDEX "idx_users_locked" ON "users" USING btree ("locked");--> statement-breakpoint
CREATE INDEX "idx_users_password_enabled" ON "users" USING btree ("password_enabled");--> statement-breakpoint
CREATE INDEX "idx_users_last_active_at" ON "users" USING btree ("last_active_at");--> statement-breakpoint
CREATE INDEX "idx_users_last_sign_in_at" ON "users" USING btree ("last_sign_in_at");--> statement-breakpoint
CREATE INDEX "idx_users_created_at" ON "users" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_users_updated_at" ON "users" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "idx_users_name_email" ON "users" USING btree ("full_name","email");--> statement-breakpoint
CREATE INDEX "idx_users_location" ON "users" USING btree ("city","state","country");--> statement-breakpoint
CREATE INDEX "idx_users_role_onboarded" ON "users" USING btree ("role","is_onboarded");--> statement-breakpoint
CREATE INDEX "idx_users_email_verified_subscribed" ON "users" USING btree ("is_email_verified","is_subscribed");--> statement-breakpoint
CREATE INDEX "idx_users_active_recent" ON "users" USING btree ("last_active_at","last_sign_in_at");