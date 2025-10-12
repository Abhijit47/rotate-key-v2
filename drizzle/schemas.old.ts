import { relations } from 'drizzle-orm';
import {
  boolean,
  decimal,
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

export const genderEnum = pgEnum('gender', ['male', 'female', 'other']);

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

// ===============================
// Users Table
// ===============================
export const users = pgTable(
  'users',
  {
    id: text('id').primaryKey().unique().notNull(),
    clerkId: text('clerk_id').unique().notNull(),
    fullName: text('full_name').notNull(),
    username: text('username').unique().notNull(),
    email: text('email').unique().notNull(),
    password: text('password').default(''),

    gender: genderEnum().notNull().default('other'),
    birthdate: timestamp('birthdate', {
      mode: 'string',
      withTimezone: true,
    }).notNull(),

    role: roleEnum().notNull().default('guest'),
    bio: text('bio'),
    avatarUrl: text('avatar_url'),

    preferences: jsonb('preferences')
      .$type<PreferencesType>()
      .default({
        fromLocation: { city: 'N/A', state: 'N/A', country: 'N/A' },
        toLocation: { city: 'N/A', state: 'N/A', country: 'N/A' },
      }),

    locationLat: decimal('location_lat', { precision: 10, scale: 8 }),
    locationLng: decimal('location_lng', { precision: 11, scale: 8 }),

    lastActive: timestamp('last_active', {
      mode: 'string',
      withTimezone: true,
    }).defaultNow(),
    isVerified: boolean('is_verified').default(false),
    isOnline: boolean('is_online').default(false),

    streamToken: varchar('stream_token'),
    expireTime: integer('expire_time'),
    issuedAt: integer('issued_at'),

    createdAt,
    updatedAt,
  },
  (t) => [
    index('idx_users_username').on(t.username),
    index('idx_users_email').on(t.email),
    index('idx_users_gender').on(t.gender),
    index('idx_users_birthdate').on(t.birthdate),
    index('idx_users_location').on(t.locationLat, t.locationLng),
    index('idx_users_last_active').on(t.lastActive),
    index('idx_users_created_at').on(t.createdAt),
  ]
);

// ===============================
// Property Table
// ===============================
export const properties = pgTable(
  'properties',
  {
    id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
    type: text('type').notNull(), // property type
    address: varchar('address', { length: 250 }).notNull(),
    city: text('city').notNull(),
    state: varchar('state', { length: 100 }).notNull(),
    country: varchar('country', { length: 100 }).notNull(),
    zipcode: varchar('zipcode').notNull(),
    images: jsonb('images').$type<string[]>().notNull(),
    description: varchar('description', { length: 3000 }).notNull(),
    area: integer('area').notNull(), // in square feet
    bedrooms: integer('bedrooms').notNull(),
    bathrooms: integer('bathrooms').notNull(),
    ownerName: text('owner_name'),
    ownerEmail: text('owner_email'),
    isAvailable: boolean('is_available').notNull().default(true),

    authorId: text('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  },
  (t) => [
    index('idx_properties_type').on(t.type),
    index('idx_properties_city').on(t.city),
    index('idx_properties_is_available').on(t.isAvailable),
    index('idx_properties_created_at').on(t.createdAt),
    index('idx_properties_author').on(t.authorId),
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
  id: text('id').primaryKey().unique().notNull(),
  userId: text('user_id').unique().notNull(),
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

// ===============================
// Views Table (For analytics and tracking purposes)
// ===============================
export const views = pgTable('views', {
  id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
  propertyId: uuid('property_id')
    .notNull()
    .references(() => properties.id, { onDelete: 'cascade' }),
  viewerId: text('viewer_id').references(() => users.id, {
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
