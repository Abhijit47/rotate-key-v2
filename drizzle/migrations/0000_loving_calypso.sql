CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
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
	"type" text NOT NULL,
	"address" varchar(250) NOT NULL,
	"city" text NOT NULL,
	"state" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"zipcode" varchar NOT NULL,
	"images" jsonb NOT NULL,
	"description" varchar(3000) NOT NULL,
	"area" integer NOT NULL,
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"owner_name" text,
	"owner_email" text,
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
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"client_ip" text DEFAULT 'N/A' NOT NULL,
	"user_agent" text DEFAULT 'N/A' NOT NULL,
	"domain_name" text,
	"logo_image_url" text,
	"logo_url" text,
	"name" text,
	"url" text,
	"browser_name" text,
	"device_type" text,
	"ip_address" text,
	"location" text,
	"operating_system" text,
	"revoke_session_url" text,
	"session_created_at" text,
	"sign_in_method" text,
	"support_email" text,
	"delivered_by_clerk" boolean,
	"from_email_name" text,
	"evt_id" text,
	"object" text,
	"reply_to_email_name" text,
	"slug" text,
	"status" text,
	"subject" text,
	"to_email_address" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_info_id_unique" UNIQUE("id"),
	CONSTRAINT "user_info_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"full_name" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text DEFAULT '',
	"gender" "gender" DEFAULT 'other' NOT NULL,
	"birthdate" timestamp with time zone NOT NULL,
	"role" "role" DEFAULT 'guest' NOT NULL,
	"bio" text,
	"avatar_url" text,
	"preferences" jsonb DEFAULT '{"fromLocation":{"city":"N/A","state":"N/A","country":"N/A"},"toLocation":{"city":"N/A","state":"N/A","country":"N/A"}}'::jsonb,
	"location_lat" numeric(10, 8),
	"location_lng" numeric(11, 8),
	"last_active" timestamp with time zone DEFAULT now(),
	"is_verified" boolean DEFAULT false,
	"is_online" boolean DEFAULT false,
	"stream_token" varchar,
	"expire_time" integer,
	"issued_at" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"viewer_id" text,
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
CREATE INDEX "idx_properties_type" ON "properties" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_properties_city" ON "properties" USING btree ("city");--> statement-breakpoint
CREATE INDEX "idx_properties_is_available" ON "properties" USING btree ("is_available");--> statement-breakpoint
CREATE INDEX "idx_properties_created_at" ON "properties" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_properties_author" ON "properties" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "idx_swaps_property1" ON "swaps" USING btree ("property1_id");--> statement-breakpoint
CREATE INDEX "idx_swaps_property2" ON "swaps" USING btree ("property2_id");--> statement-breakpoint
CREATE INDEX "idx_swaps_user1" ON "swaps" USING btree ("user1_id");--> statement-breakpoint
CREATE INDEX "idx_swaps_user2" ON "swaps" USING btree ("user2_id");--> statement-breakpoint
CREATE INDEX "idx_swaps_match" ON "swaps" USING btree ("match_id");--> statement-breakpoint
CREATE INDEX "idx_swaps_status" ON "swaps" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "uniq_swap_pure" ON "swaps" USING btree ("user1_id","user2_id","property1_id","property2_id","match_id");--> statement-breakpoint
CREATE INDEX "idx_users_username" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "idx_users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_users_gender" ON "users" USING btree ("gender");--> statement-breakpoint
CREATE INDEX "idx_users_birthdate" ON "users" USING btree ("birthdate");--> statement-breakpoint
CREATE INDEX "idx_users_location" ON "users" USING btree ("location_lat","location_lng");--> statement-breakpoint
CREATE INDEX "idx_users_last_active" ON "users" USING btree ("last_active");--> statement-breakpoint
CREATE INDEX "idx_users_created_at" ON "users" USING btree ("created_at");