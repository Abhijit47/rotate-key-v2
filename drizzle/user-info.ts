import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const userInfo = pgTable('user_info', {
  userId: text('user_id').primaryKey().unique().notNull(),
  clientIp: text('client_ip').notNull().default('N/A'), // always available
  userAgent: text('user_agent').notNull().default('N/A'), // always available
  domainName: text('domain_name'),
  logoImageUrl: text('logo_image_url'),
  logoUrl: text('logo_url'),
  name: text('name'),
  url: text('url'),
  browserName: text('browser_name'),
  deviceType: text('device_type'),
  ipAddress: text('ip_address'),
  location: text('location'),
  operatingSystem: text('operating_system'),
  revokeSessionUrl: text('revoke_session_url'),
  sessionCreatedAt: text('session_created_at'),
  signInMethod: text('sign_in_method'),
  supportEmail: text('support_email'),
  deliveredByClerk: boolean('delivered_by_clerk'),
  fromEmailName: text('from_email_name'),
  evtId: text('evt_id'),
  object: text('object'),
  replyToEmailName: text('reply_to_email_name'),
  slug: text('slug'),
  status: text('status'),
  subject: text('subject'),
  toEmailAddress: text('to_email_address'),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
});

export type InsertUserInfo = typeof userInfo.$inferInsert;
export type SelectUserInfo = typeof userInfo.$inferSelect;
