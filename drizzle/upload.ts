/*
// 1. first create the users in the auth system (clerk, firebase, supabase, etc.)
// 2. up date the users in the users table with the ids from the auth system
// 3. take the users city, state, country from re-usable array
// 4. create properties with authorId from users table

// in-built node modules
import { stdin as input, stdout as output } from 'node:process';
import readline from 'readline/promises';

// load environment variable from .env file
import { generateUsers } from '@/lib/faker';

import { createClerkClient } from '@clerk/nextjs/server';
import { faker } from '@faker-js/faker';
import { Pool } from '@neondatabase/serverless';
import { loadEnvConfig } from '@next/env';
import { DrizzleQueryError, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { StreamChat } from 'stream-chat';
import * as schemas from './schemas';
import { images, propertyTypes } from './seed';

loadEnvConfig(process.cwd(), true);

/*
const arr = [1,2,3,4];

for (let i = 0; i < arr.length; i++) {
  console.log({"I=":arr[i]})
  
  for (let j = 0; j < 5; j++) {
    console.log({"j:>>>":j})
  }
}
*/
/*
const rl = readline.createInterface({ input, output });
const ac = new AbortController();
const signal = ac.signal;

const PASSWORD = process.env.FAKE_USER_PASSWORD; // default password for all fake users

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle({
  client: pool,
  schema: schemas,
});

const client = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// instantiate your stream client using the API key and secret
// the secret is only used server side and gives you full access to the API
const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.STREAM_API_SECRET
);

const expireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours from now
const issuedAt = Math.floor(new Date().getTime() / 1000); // current time in seconds

async function main() {
  // const userId = await rl.question(
  //   'Please enter a user id for seeding the database: ',
  //   { signal }
  // );
  // console.log(`Your provided user id: ${userId}`);
  // if (!userId.includes('user_')) {
  //   console.error('Invalid user id format. It should start with "user_".');
  //   process.exit(1);
  // }

  // const amountOfSeeding = await rl.question(
  //   'Please enter the amount of properties to be seeded (default is 5): ',
  //   { signal }
  // );
  // console.log(`Amount of properties to be seeded: ${amountOfSeeding}`);
  // const seedingCount = amountOfSeeding ? parseInt(amountOfSeeding) : 5;
  // if (isNaN(seedingCount) || seedingCount <= 0) {
  //   console.error(
  //     'Invalid amount for seeding. Please enter a positive number.'
  //   );
  //   process.exit(1);
  // }

  const seedingCount = 2;
  const amountOfProperties = 6;

  // const pos = rl.getCursorPos();
  // console.log(`Cursor is at row ${pos.rows}, column ${pos.cols}`);

  const fakeUsers = generateUsers(seedingCount);

  for (let i = 0; i < fakeUsers.length; i++) {
    const profile = fakeUsers[i];

    try {
      console.log(
        `\n📝 Creating profile ${i + 1}/${fakeUsers.length}: ${
          profile.fullName
        }`
      );

      // slight delay to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms

      // 1. Check if Clerk user already exists
      const usersFound = await client.users.getUserList({
        emailAddress: [profile.email],
      });

      let userId: string;

      if (usersFound.totalCount > 0) {
        console.log(
          `⚠️ Clerk user already exists for ${profile.fullName}, using existing...`
        );
        userId = usersFound.data[0].id;
      } else {
        // slight delay to avoid rate limits
        await new Promise((resolve) => setTimeout(resolve, 200)); // 100ms
        // 2. Create Clerk user
        const newUser = await client.users.createUser({
          emailAddress: [profile.email],
          password: PASSWORD,
          firstName: profile.fullName.split(' ')[0],
          lastName: profile.fullName.split(' ').slice(1).join(' '),
          username: profile.username,
          publicMetadata: {
            metadata: {
              role: 'guest',
              gender: profile.gender,
              birthdate: profile.birthdate,
            },
          },
        });

        userId = newUser.id;
        console.log(`✅ Clerk user created: ${userId}`);
        await db
          .insert(schemas.users)
          .values({
            id: userId,
            clerkId: userId,
            fullName: profile.fullName,
            username: profile.username,
            email: profile.email.toLowerCase(),
            password: '',
            gender: profile.gender,
            birthdate: profile.birthdate,
            role: 'guest',
            bio: profile.bio,
            avatarUrl: profile.avatarUrl,
            preferences: profile.preferences,
            locationLat: profile.locationLat,
            locationLng: profile.locationLng,
            lastActive: profile.lastActive,
            isOnline: profile.isOnline,
            isVerified: profile.isVerified,
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt,
          })
          .returning({ id: schemas.users.id });
        // .then((res) => {
        //   console.log(`Inserted ${res.length} user into the database.`);
        // })
        // .catch((err: DrizzleQueryError) => {
        //   console.error('Error inserting user:name', err.name);
        //   console.error('Error inserting user:msg', err.message);
        //   console.error('Error inserting user:params', err.params);
        //   console.error('Error inserting user:query', err.query);
        //   console.error('Error inserting user:cause', err.cause);
        //   console.error('Error inserting user:stack', err.stack);
        //   process.exit(1);
        // });
        // slight delay to avoid rate limits
        await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms

        // generate a token for the user with id 'john'
        const token = serverClient.createToken(userId, expireTime);
        //* Syncing users
        
        // * When a user starts a chat conversation with another user both users need to be present in Stream’s user storage. So you’ll want to make sure that users are synced in advance. The update users endpoint allows you to update 100 users at once, an example is shown below:
         *
        await serverClient.upsertUser({
          id: userId,
          name: profile.fullName,
          image: newUser.imageUrl,
        });
        console.log(`✅ Stream user created: ${userId}`);
        await db
          .update(schemas.users)
          .set({
            streamToken: token,
            expireTime: expireTime,
            issuedAt: issuedAt,
          })
          .where(eq(schemas.users.id, userId));
      }

      for (let j = 0; j < amountOfProperties; j++) {
        // console.log({ 'j:>>>': j });
        await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms
        const property = {
          id: faker.string.uuid(),
          type: faker.helpers.arrayElement(propertyTypes),
          address: faker.location.streetAddress(),
          city: profile.preferences.fromLocation.city,
          state: profile.preferences.fromLocation.state,
          country: profile.preferences.fromLocation.country,
          zipcode: faker.location.zipCode(),
          images: faker.helpers.uniqueArray(images, 3),
          description: faker.lorem.paragraphs(10),
          area: faker.helpers.rangeToNumber({ min: 200, max: 10000 }),
          bedrooms: faker.helpers.rangeToNumber({ min: 1, max: 6 }),
          bathrooms: faker.helpers.rangeToNumber({ min: 1, max: 6 }),
          ownerName: faker.person.fullName(),
          ownerEmail: faker.internet.email(),
          isAvailable: faker.datatype.boolean(),
          authorId: userId,
          createdAt: faker.date.past().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await db
          .insert(schemas.properties)
          .values(property)
          .returning({ id: schemas.properties.id })
          .then((res) => {
            console.log(`Inserted ${res.length} property into the database.`);
          })
          .catch((err: DrizzleQueryError) => {
            console.error('Error inserting property:', err);
            process.exit(1);
          });
      }
    } catch (error) {
      console.error('Error in seeding:', error);
      process.exit(1);
    }
  }

  ac.abort();
  rl.close();
  await pool.end();
  console.log('\n🎉 Seeding completed!');
  process.exit(0);
}

main();
*/
