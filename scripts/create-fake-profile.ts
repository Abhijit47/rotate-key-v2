/*
// import { db } from '@/drizzle/db';
// import { users } from '@/drizzle/schemas';
// import { insertToDB } from '@/lib/user-actions';
import usersList from '@/sample/users.json';
import { createClerkClient } from '@clerk/nextjs/server';
import { loadEnvConfig } from '@next/env';
// import { eq } from 'drizzle-orm';

loadEnvConfig(process.cwd(), true);

const PASSWORD = process.env.FAKE_USER_PASSWORD; // default password for all fake users

// Fake profile data
const fakeProfiles = usersList;

async function createFakeProfiles() {
  console.log('🚀 Starting to create fake profiles...');

  const client = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });

  for (let i = 0; i < fakeProfiles.length; i++) {
    const profile = fakeProfiles[i];

    try {
      console.log(
        `\n📝 Creating profile ${i + 1}/${fakeProfiles.length}: ${
          profile.fullName
        }`
      );

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
        // 2. Create Clerk user
        const newUser = await client.users.createUser({
          emailAddress: [profile.email],
          password: PASSWORD,
          // passwordDigest:
          //   '3e23af71b4f9c66fec2ffb818b31d4bf476a66c7af51afc80e01913d3214f448',
          // passwordHasher: 'bcrypt',
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
      }

      await new Promise((resolve) => setTimeout(resolve, 250)); // slight delay to avoid rate limits

      // 3. Check if user already exists in DB
      // const existing = await db
      //   .select()
      //   .from(users)
      //   .where(eq(users.id, userId));

      // if (existing.length > 0) {
      //   console.log(
      //     `⚠️ Profile already exists in DB for ${profile.fullName}, updating...`
      //   );

      //   // await db
      //   //   .update(users)
      //   //   .set({
      //   //     fullName: profile.fullName,
      //   //     username: profile.username,
      //   //     email: profile.email,
      //   //     gender: profile.gender as 'male' | 'female' | 'other',
      //   //     birthdate: profile.birthdate,
      //   //     bio: profile.bio,
      //   //     avatarUrl: profile.avatarUrl,
      //   //     preferences: profile.preferences,
      //   //     password: PASSWORD,
      //   //     isVerified: true,
      //   //     isOnline: Math.random() > 0.5,
      //   //   })
      //   //   .where(eq(users.id, userId));

      //   // dont do anything if exists
      // } else {
      //   console.log(`➕ Inserting new profile in DB for ${profile.fullName}`);

      //   const { success, error } = await insertToDB({
      //     id: userId,
      //     clerkId: userId,
      //     fullName: profile.fullName,
      //     username: profile.username,
      //     email: profile.email,
      //     password: null,
      //     gender: profile.gender as 'male' | 'female' | 'other',
      //     birthdate: profile.birthdate,
      //     bio: profile.bio,
      //     avatarUrl: profile.avatarUrl,
      //     preferences: profile.preferences,
      //     locationLat: null,
      //     locationLng: null,
      //     lastActive: null,
      //     isVerified: null,
      //     isOnline: null,
      //     createdAt: new Date().toISOString(),
      //     updatedAt: new Date().toISOString(),
      //   });

      //   if (!success) {
      //     console.error(
      //       `❌ Error inserting DB row for ${profile.fullName}`,
      //       error
      //     );
      //     // Optional cleanup: delete Clerk user if DB insertion fails
      //     await client.users.deleteUser(userId);
      //     continue;
      //   }
      // }

      console.log(`✅ Profile synced for ${profile.fullName}`);
      console.log(`   📧 Email: ${profile.email}`);
      console.log(`   🔑 Password: ${PASSWORD}`);
      console.log(`   👤 Username: ${profile.username}`);
    } catch (error) {
      console.error(`❌ Unexpected error for ${profile.fullName}`, error);
    }
  }

  console.log('\n🎉 Fake profile creation completed!');
  console.log(`📋 All accounts use password: "${PASSWORD}"`);
  console.log('All emails are auto-confirmed by default in Clerk');
  console.log('Profiles synced with Clerk + your DB.');
}

// Run the script
createFakeProfiles().catch(console.error);
*/
