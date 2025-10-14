import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'moderator', 'guest']);

export const planEnum = pgEnum('plan', ['basic', 'pro', 'enterprise', 'free']);

export const swapStatusEnum = pgEnum('status', [
  'pending',
  'approved',
  'declined',
  'completed',
]);

type PreferencesType = {
  fromLocation: {
    city: string;
    state: string;
    country: string;
  };
  toLocation: {
    city: string;
    state: string;
    country: string;
  };
};

const createdAt = timestamp('created_at', {
  mode: 'string',
  withTimezone: true,
})
  .notNull()
  .defaultNow();

const updatedAt = timestamp('updated_at', {
  mode: 'string',
  withTimezone: true,
}).$onUpdate(() => new Date().toISOString());

export const profileUrl = 'https://www.gravatar.com/avatar?d=mp';

// ===============================
// Users Table
// ===============================
export const users = pgTable(
  'users',
  {
    id: text('id').primaryKey().unique().notNull(),
    clerkId: text('clerk_id').unique().notNull(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    fullName: text('full_name').notNull(),
    email: text('email').unique().notNull(),
    password: text('password').default(''),
    avatar: text('avatar').notNull().default(profileUrl),
    username: varchar('username', { length: 50 }).unique().notNull(),

    // automated add by clerk
    role: roleEnum().notNull().default('guest'),
    plan: planEnum().notNull().default('free'),
    isSubscribed: boolean('is_subscribed').notNull().default(false),
    isEmailVerified: boolean('is_email_verified').default(false),

    // signup complete related fields
    preferences: jsonb('preferences')
      .$type<PreferencesType>()
      .default({
        fromLocation: { city: 'N/A', state: 'N/A', country: 'N/A' },
        toLocation: { city: 'N/A', state: 'N/A', country: 'N/A' },
      }),

    // onboarding related field
    isOnboarded: boolean('is_onboarded').notNull().default(false),

    lastActiveAt: integer('last_active_at').notNull().default(0),
    lastSignInAt: integer('last_sign_in_at').notNull().default(0),
    banned: boolean('banned').notNull().default(false),
    locked: boolean('locked').notNull().default(false),
    passwordEnabled: boolean('password_enabled').notNull().default(false),
    visitorsCount: integer('visitors_count').notNull().default(0),

    // profile related details
    birthdate: timestamp('birthdate', {
      withTimezone: true,
    }),
    bio: varchar('bio', { length: 500 }).default('').notNull(),
    country: varchar('country', { length: 100 }),
    state: varchar('state', { length: 100 }),
    city: varchar('city', { length: 100 }),
    zipcode: varchar('zipcode', { length: 10 }),
    phoneNumber: varchar('phone_number', { length: 20 }),
    profileVerificationDocuments: jsonb('profile_verification_documents')
      .$type<string[]>()
      .default([])
      .notNull(),
    isDocumentVerified: boolean('is_document_verified')
      .notNull()
      .default(false),
    languages: jsonb('languages').$type<string[]>().default([]).notNull(),

    // stream related fields
    isOnline: boolean('is_online').default(false),
    streamToken: varchar('stream_token'),
    expireTime: integer('expire_time'),
    issuedAt: integer('issued_at'),

    createdAt,
    updatedAt,
  },
  (t) => [
    index('idx_users_clerk_id').on(t.clerkId),
    index('idx_users_full_name').on(t.fullName),
    index('idx_users_is_onboarded').on(t.isOnboarded),
    index('idx_users_is_email_verified').on(t.isEmailVerified),
    index('idx_users_role').on(t.role),
    index('idx_users_plan').on(t.plan),
    index('idx_users_is_subscribed').on(t.isSubscribed),
    index('idx_users_banned').on(t.banned),
    index('idx_users_locked').on(t.locked),
    index('idx_users_password_enabled').on(t.passwordEnabled),
    index('idx_users_last_active_at').on(t.lastActiveAt),
    index('idx_users_last_sign_in_at').on(t.lastSignInAt),

    index('idx_users_created_at').on(t.createdAt),
    index('idx_users_updated_at').on(t.updatedAt),
    // Compound indexes for common queries
    index('idx_users_name_email').on(t.fullName, t.email),
    index('idx_users_location').on(t.city, t.state, t.country),
    index('idx_users_role_onboarded').on(t.role, t.isOnboarded),
    index('idx_users_email_verified_subscribed').on(
      t.isEmailVerified,
      t.isSubscribed
    ),
    index('idx_users_active_recent').on(t.lastActiveAt, t.lastSignInAt),
  ]
);

// ===============================
// Property Table
// ===============================
export const properties = pgTable(
  'properties',
  {
    id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
    address: varchar('address', { length: 250 }).notNull(),
    country: varchar('country', { length: 100 }).notNull(),
    state: varchar('state', { length: 100 }).notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    zipcode: varchar('zipcode', { length: 10 }).notNull(),
    area: varchar('area', { length: 50 }).notNull(),
    areaUnit: varchar('area_unit', { length: 20 }).notNull(),
    description: varchar('description', { length: 5000 }).notNull(),

    type: varchar('type', { length: 50 }).notNull(),
    ownership: varchar('ownership', { length: 50 }).notNull(),
    swapping: varchar('swapping', { length: 50 }).notNull(),
    rentalPeriod: varchar('rental_period', { length: 50 }).notNull(),
    surrounding: varchar('surrounding', { length: 50 }).notNull(),
    environment: varchar('environment', { length: 50 }).notNull(),

    ownerName: varchar('owner_name', { length: 100 }),
    ownerEmail: varchar('owner_email', { length: 200 }),
    ownerPhone: varchar('owner_phone', { length: 20 }),

    bedRooms: integer('bedrooms').notNull(),
    bathRooms: integer('bathrooms').notNull(),
    beds: integer('beds').notNull(),
    guests: integer('guests').notNull(),
    hostLanguages: jsonb('host_languages')
      .$type<string[]>()
      .default([])
      .notNull(),

    accomodation: varchar('accomodation', { length: 50 }).notNull(),
    amenities: jsonb('amenities').$type<string[]>().default([]).notNull(),
    rules: jsonb('rules').$type<string[]>().default([]).notNull(),
    accessibilities: jsonb('accessibilities')
      .$type<string[]>()
      .default([])
      .notNull(),
    startDate: timestamp('start_date', { withTimezone: true }).notNull(),
    endDate: timestamp('end_date', { withTimezone: true }).notNull(),
    staysDurationInDays: integer('duration_days').default(0).notNull(),
    images: jsonb('images').$type<string[]>().default([]).notNull(),

    isAvailable: boolean('is_available').notNull().default(true),

    authorId: text('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  },
  (t) => [
    uniqueIndex('uniq_property_address').on(
      t.address,
      t.city,
      t.state,
      t.country
    ),
    // uniqueIndex('uniq_property_owner_email').on(t.ownerEmail),
    // uniqueIndex('uniq_property_owner_phone').on(t.ownerPhone),
    index('idx_properties_address').on(t.address),
    index('idx_properties_country').on(t.country),
    index('idx_properties_state').on(t.state),
    index('idx_properties_city').on(t.city),
    index('idx_properties_area').on(t.area),
    index('idx_properties_bedrooms').on(t.bedRooms),
    index('idx_properties_bathrooms').on(t.bathRooms),
    index('idx_properties_guests').on(t.guests),
    index('idx_properties_beds').on(t.beds),
    index('idx_properties_is_available').on(t.isAvailable),
    index('idx_properties_created_at').on(t.createdAt),
    index('idx_properties_author').on(t.authorId),
    // Compound indexes for common queries
    index('idx_properties_location').on(t.city, t.state, t.country),
    index('idx_properties_type_availability').on(t.type, t.isAvailable),
    index('idx_properties_bedrooms_bathrooms').on(t.bedRooms, t.bathRooms),
    index('idx_properties_guests_beds').on(t.guests, t.beds),
    // Add more indexes as needed based on query patterns

    // index('idx_properties_type').on(t.type),
    // index('idx_properties_city').on(t.city),
    // index('idx_properties_is_available').on(t.isAvailable),
    // index('idx_properties_created_at').on(t.createdAt),
    // index('idx_properties_author').on(t.authorId),
  ]
);

// ===============================
// Likes Table
// ===============================
export const likes = pgTable(
  'likes',
  {
    id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
    fromUserId: text('from_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // toUserId: text('to_user_id')
    //   .notNull()
    //   .references(() => users.id, { onDelete: 'cascade' }),
    propertyId: uuid('property_id')
      .notNull()
      .references(() => properties.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  },
  (t) => [
    uniqueIndex('likes_unique').on(t.fromUserId, t.propertyId),
    index('idx_likes_from_user').on(t.fromUserId),
    // index('idx_likes_to_user').on(t.toUserId),
    index('idx_likes_property').on(t.propertyId),
    index('idx_likes_created_at').on(t.createdAt),
  ]
);

// ===============================
// Matches Table
// ===============================
export const matches = pgTable(
  'matches',
  {
    id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
    user1Id: text('user1_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    user2Id: text('user2_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    property1Id: uuid('property1_id')
      .notNull()
      .references(() => properties.id, { onDelete: 'cascade' }),
    property2Id: uuid('property2_id')
      .notNull()
      .references(() => properties.id, { onDelete: 'cascade' }),

    isActive: boolean('is_active').notNull().default(false),

    channelId: varchar('channel_id'),
    channelType: text('channel_type'),
    createdAt,
    updatedAt,
  },
  (t) => [
    // uniqueIndex('matches_unique').on(t.user1Id, t.user2Id),
    uniqueIndex('matches_unique').on(
      t.user1Id,
      t.user2Id,
      t.property1Id,
      t.property2Id
    ),
    index('idx_matches_user1').on(t.user1Id),
    index('idx_matches_user2').on(t.user2Id),
    index('idx_matches_created_at').on(t.createdAt),
  ]
);

// ===============================
// ConnectionRequests Table
// ===============================
export const connectionRequests = pgTable(
  'connection_requests',
  {
    id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
    fromUserId: text('from_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    propertyId: uuid('property_id')
      .notNull()
      .references(() => properties.id, { onDelete: 'cascade' }),
    authorId: text('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    matchId: uuid('match_id').references(() => matches.id, {
      onDelete: 'set null',
    }), // optional
    guests: integer('guests').notNull().default(1),
    startDate: timestamp('start_date', {
      mode: 'string',
      withTimezone: true,
    }).notNull(),
    endDate: timestamp('end_date', {
      mode: 'string',
      withTimezone: true,
    }).notNull(),
    status: swapStatusEnum().notNull().default('pending'),
    createdAt,
    updatedAt,
  },
  (t) => [
    uniqueIndex('uniq_connection_user_property').on(t.fromUserId, t.propertyId),
    index('idx_connection_property').on(t.propertyId),
    index('idx_connection_author').on(t.authorId),
    index('idx_connection_created_at').on(t.createdAt),
  ]
);

// ===============================
// Booking Table
// ===============================
export const bookings = pgTable(
  'bookings',
  {
    id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
    // which property want to book
    propertyId: uuid('property_id')
      .notNull()
      .references(() => properties.id, { onDelete: 'cascade' }),
    // who made this booking that userId
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    startDate: timestamp('start_date', {
      mode: 'string',
      withTimezone: true,
    }).notNull(),
    endDate: timestamp('end_date', {
      mode: 'string',
      withTimezone: true,
    }).notNull(),
    guestCount: integer('guest_count').notNull(),
    // when the two bookings are stored in booking table against the same matchId then we can create one swap rows and wait for approve/decline by admin
    matchId: uuid('match_id')
      .notNull()
      .references(() => matches.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  },
  (t) => [
    index('idx_bookings_user').on(t.userId),
    index('idx_bookings_property').on(t.propertyId),
    index('idx_bookings_match').on(t.matchId),
  ]
);

// ===============================
// Swaps Table
// ===============================
export const swaps = pgTable(
  'swaps',
  {
    id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
    // who was the first user to request the swap
    user1Id: text('user1_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // who was the second user to request the swap
    user2Id: text('user2_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // matchId related two this two users
    matchId: uuid('match_id')
      .notNull()
      .references(() => matches.id, { onDelete: 'cascade' }),
    property1Id: uuid('property1_id')
      .notNull()
      .references(() => properties.id, { onDelete: 'cascade' }), // offered by user1
    property2Id: uuid('property2_id')
      .notNull()
      .references(() => properties.id, { onDelete: 'cascade' }), // offered by user2
    status: swapStatusEnum().notNull().default('pending'),
    createdAt,
    updatedAt,
  },
  (t) => [
    index('idx_swaps_property1').on(t.property1Id),
    index('idx_swaps_property2').on(t.property2Id),
    index('idx_swaps_user1').on(t.user1Id),
    index('idx_swaps_user2').on(t.user2Id),
    index('idx_swaps_match').on(t.matchId),
    index('idx_swaps_status').on(t.status),
    // 💡 This enforces there’s only one *active* (pending/completed/approved etc.) swap per pair
    uniqueIndex('uniq_swap_pure').on(
      t.user1Id,
      t.user2Id,
      t.property1Id,
      t.property2Id,
      t.matchId
    ),
  ]
);

// ===============================
// UserInfo Table (For analytics and tracking purposes)
// ===============================
export const userInfo = pgTable('user_info', {
  id: varchar('id').primaryKey().unique().notNull(),
  userId: varchar('user_id').unique().notNull(),
  clientIp: varchar('client_ip').notNull().default('N/A'), // always available
  userAgent: varchar('user_agent').notNull().default('N/A'), // always available
  domainName: varchar('domain_name'),
  logoImageUrl: varchar('logo_image_url'),
  logoUrl: varchar('logo_url'),
  name: varchar('name'),
  url: varchar('url'),
  browserName: varchar('browser_name'),
  deviceType: varchar('device_type'),
  ipAddress: varchar('ip_address'),
  location: varchar('location'),
  operatingSystem: varchar('operating_system'),
  revokeSessionUrl: varchar('revoke_session_url'),
  sessionCreatedAt: varchar('session_created_at'),
  signInMethod: varchar('sign_in_method'),
  supportEmail: varchar('support_email'),
  deliveredByClerk: boolean('delivered_by_clerk'),
  fromEmailName: varchar('from_email_name'),
  evtId: varchar('evt_id'),
  object: varchar('object'),
  replyToEmailName: varchar('reply_to_email_name'),
  slug: varchar('slug'),
  status: varchar('status'),
  subject: varchar('subject'),
  toEmailAddress: varchar('to_email_address'),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
});

// ===============================
// Views Table (For analytics and tracking purposes)
// ===============================
export const views = pgTable('views', {
  id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
  propertyId: uuid('property_id')
    .notNull()
    .references(() => properties.id, { onDelete: 'cascade' }),
  viewerId: varchar('viewer_id').references(() => users.id, {
    onDelete: 'cascade',
  }), // can be null for anonymous views
  viewedAt: timestamp('viewed_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ============ RELATIONS =============

// User relations: One-to-many for likes, matches
export const usersRelations = relations(users, ({ many }) => ({
  sentLikes: many(likes, { relationName: 'fromUser' }),
  // receivedLikes: many(likes, { relationName: 'toUser' }),
  matchesAsUser1: many(matches, { relationName: 'user1match' }),
  matchesAsUser2: many(matches, { relationName: 'user2match' }),
  properties: many(properties, { relationName: 'author' }),

  // UserInfo relation: one-to-one
  userInfo: many(userInfo, { relationName: 'userInfo' }),

  // In usersRelations
  sentConnectionRequests: many(connectionRequests, {
    relationName: 'fromUser',
  }),
  receivedConnectionRequests: many(connectionRequests, {
    relationName: 'author',
  }),

  bookings: many(bookings, { relationName: 'bookingUser' }), // new
  swapsAsUser1: many(swaps, { relationName: 'swapUser1' }), // new
  swapsAsUser2: many(swaps, { relationName: 'swapUser2' }), // new

  propertyViews: many(views, { relationName: 'viewer' }), // new
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  // Every property has one author (the owner/listing user)
  author: one(users, {
    fields: [properties.authorId],
    references: [users.id],
    relationName: 'author',
  }),
  // All likes received by this property
  receivedLikes: many(likes, { relationName: 'property' }),
  // (Optional) Access all "matches" involving this property's author
  // If you want matches as well:
  matchesAsUser1: many(matches, { relationName: 'user1match' }),
  matchesAsUser2: many(matches, { relationName: 'user2match' }),

  bookings: many(bookings, { relationName: 'bookingProperty' }), // new
  swapsAsProperty1: many(swaps, { relationName: 'swapProperty1' }), // new
  swapsAsProperty2: many(swaps, { relationName: 'swapProperty2' }), // new

  // In propertiesRelations
  connectionRequests: many(connectionRequests, { relationName: 'property' }),

  propertyViews: many(views, { relationName: 'property' }), // new
}));

// Likes relations: many-to-one for users
export const likesRelations = relations(likes, ({ one }) => ({
  fromUser: one(users, {
    fields: [likes.fromUserId],
    references: [users.id],
    relationName: 'fromUser',
  }),
  // toUser: one(users, {
  //   fields: [likes.toUserId],
  //   references: [users.id],
  //   relationName: 'toUser',
  // }),
  property: one(properties, {
    fields: [likes.propertyId],
    references: [properties.id],
    relationName: 'property',
  }),
}));

// Matches relations: many-to-one for users
export const matchesRelations = relations(matches, ({ one, many }) => ({
  user1: one(users, {
    fields: [matches.user1Id],
    references: [users.id],
    relationName: 'user1match',
  }),
  user2: one(users, {
    fields: [matches.user2Id],
    references: [users.id],
    relationName: 'user2match',
  }),
  property1: one(properties, {
    fields: [matches.property1Id],
    references: [properties.id],
    relationName: 'property1match',
  }),
  property2: one(properties, {
    fields: [matches.property2Id],
    references: [properties.id],
    relationName: 'property2match',
  }),

  // In matchesRelations (optional)
  connectionRequests: many(connectionRequests, { relationName: 'match' }),

  bookings: many(bookings, { relationName: 'bookingMatch' }), // new
  swaps: many(swaps, { relationName: 'swapMatch' }), // new
}));

// ConnectionRequests relations: many-to-one for users and properties
export const connectionRequestsRelations = relations(
  connectionRequests,
  ({ one }) => ({
    fromUser: one(users, {
      fields: [connectionRequests.fromUserId],
      references: [users.id],
      relationName: 'fromUser',
    }),
    author: one(users, {
      fields: [connectionRequests.authorId],
      references: [users.id],
      relationName: 'author',
    }),
    property: one(properties, {
      fields: [connectionRequests.propertyId],
      references: [properties.id],
      relationName: 'property',
    }),
    match: one(matches, {
      fields: [connectionRequests.matchId],
      references: [matches.id],
      relationName: 'match',
    }),
    // if you ever want: Swap associated? (Would require a foreign key field in connectionRequests to swaps, not typical unless direct link needed)
  })
);

// Bookings Relations
export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
    relationName: 'bookingUser',
  }),
  property: one(properties, {
    fields: [bookings.propertyId],
    references: [properties.id],
    relationName: 'bookingProperty',
  }),
  match: one(matches, {
    fields: [bookings.matchId],
    references: [matches.id],
    relationName: 'bookingMatch',
  }),
}));

// Swaps relations: many-to-one for users and matches
export const swapsRelations = relations(swaps, ({ one }) => ({
  // user1: one(users, {
  //   fields: [swaps.user1Id],
  //   references: [users.id],
  //   relationName: 'user1swap',
  // }),
  // user2: one(users, {
  //   fields: [swaps.user2Id],
  //   references: [users.id],
  //   relationName: 'user2swap',
  // }),
  // property1: one(properties, {
  //   fields: [swaps.property1Id],
  //   references: [properties.id],
  //   relationName: 'property1swap',
  // }),
  // property2: one(properties, {
  //   fields: [swaps.property2Id],
  //   references: [properties.id],
  //   relationName: 'property2swap',
  // }),
  // match: one(matches, {
  //   fields: [swaps.matchId],
  //   references: [matches.id],
  //   relationName: 'swapMatch',
  // }),
  user1: one(users, {
    fields: [swaps.user1Id],
    references: [users.id],
    relationName: 'swapUser1',
  }),
  user2: one(users, {
    fields: [swaps.user2Id],
    references: [users.id],
    relationName: 'swapUser2',
  }),
  property1: one(properties, {
    fields: [swaps.property1Id],
    references: [properties.id],
    relationName: 'swapProperty1',
  }),
  property2: one(properties, {
    fields: [swaps.property2Id],
    references: [properties.id],
    relationName: 'swapProperty2',
  }),
  match: one(matches, {
    fields: [swaps.matchId],
    references: [matches.id],
    relationName: 'swapMatch',
  }),
}));

// UserInfo relations: one-to-one with Users
export const userInfoRelations = relations(userInfo, ({ one }) => ({
  user: one(users, {
    fields: [userInfo.userId],
    references: [users.id],
    relationName: 'userInfo',
  }),
}));

// Views relations: many-to-one for properties and users (optional)
export const viewsRelations = relations(views, ({ one }) => ({
  property: one(properties, {
    fields: [views.propertyId],
    references: [properties.id],
    relationName: 'property',
  }),
  viewer: one(users, {
    fields: [views.viewerId],
    references: [users.id],
    relationName: 'viewer',
  }),
}));

// ===============================
// Types
export type InsertUser = typeof users.$inferSelect;
export type SelectUser = typeof users.$inferSelect;

export type InsertProperty = typeof properties.$inferSelect;
export type SelectProperty = typeof properties.$inferSelect;

export type InsertLike = typeof likes.$inferSelect;
export type SelectLike = typeof likes.$inferSelect;

export type InsertMatch = typeof matches.$inferSelect;
export type SelectMatch = typeof matches.$inferSelect;

export type InsertConnectionRequest = typeof connectionRequests.$inferSelect;
export type SelectConnectionRequest = typeof connectionRequests.$inferSelect;

export type InsertBooking = typeof bookings.$inferSelect;
export type SelectBooking = typeof bookings.$inferSelect;

export type InsertSwap = typeof swaps.$inferSelect;
export type SelectSwap = typeof swaps.$inferSelect;

export type InsertUserInfo = typeof userInfo.$inferInsert;
export type SelectUserInfo = typeof userInfo.$inferSelect;

export type InsertView = typeof views.$inferInsert;
export type SelectView = typeof views.$inferSelect;
// ===============================
