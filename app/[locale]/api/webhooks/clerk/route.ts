import { db } from '@/drizzle/db';
import { InsertUser, userInfo, users } from '@/drizzle/schemas';
import { env } from '@/env';
// import { insertToDB, updateToDB } from '@/lib/user-actions';
import { EmailData } from '@/types/clerk';
import { clerkClient } from '@clerk/nextjs/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { format } from 'date-fns';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { StreamChat, UserResponse } from 'stream-chat';

const expireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours from now
const issuedAt = Math.floor(new Date().getTime() / 1000); // current time in seconds

export async function POST(req: NextRequest) {
  const serverClient = StreamChat.getInstance(
    env.NEXT_PUBLIC_STREAM_API_KEY,
    env.STREAM_API_SECRET
  );
  const authClient = await clerkClient();
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;
    if (eventType === 'user.created') {
      const email = evt.data.email_addresses.find(
        (e) => e.id === evt.data.primary_email_address_id
      )?.email_address;

      // const { metadata } = evt.data.public_metadata;
      // console.log('metadata', metadata);
      // eslint-disable-next-line
      const newUser = {
        id: evt.data.id,
        clerkId: evt.data.id,
        firstName: evt.data.first_name || 'NA',
        lastName: evt.data.last_name || 'NA',
        fullName: evt.data.first_name + ' ' + evt.data.last_name,
        email: email || 'NA',
        password: '',
        avatar: evt.data.image_url,

        // automated add by clerk
        role: 'guest',
        plan: 'free',
        isSubscribed: false,
        isEmailVerified: false,

        // signup complete related fields
        preferences: {
          fromLocation: { city: 'N/A', state: 'N/A', country: 'N/A' },
          toLocation: { city: 'N/A', state: 'N/A', country: 'N/A' },
        },

        // onboarding related field
        isOnboarded: false,

        // profile related details
        birthdate: null,
        bio: '',
        country: null,
        state: null,
        city: null,
        zipcode: null,
        phoneNumber: null,
        profileVerificationDocuments: [],
        isDocumentVerified: false,
        languages: [],

        // stream related fields
        isOnline: false,
        streamToken: '',
        expireTime: 0,
        issuedAt: 0,
      } as unknown as InsertUser;

      const committed = await db.transaction(async (tx) => {
        // generate a token for the user with id 'john'
        const token = serverClient.createToken(
          evt.data.id,
          expireTime,
          issuedAt
        );
        // Create user in Stream
        const streamUser = {
          id: evt.data.id,
          anon: false,
          banned: evt.data.banned,
          name: evt.data.first_name + ' ' + evt.data.last_name,
          image: evt.data.image_url,
          language: 'en',
          last_active: format(
            evt.data.last_active_at || new Date(),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
          notifications_muted: false,
          role: 'user',
          username: evt.data.username,
          //   evt.data.first_name
          //   ? `${evt.data.first_name}_${crypto.randomUUID()}`
          //   : evt.data.last_name
          //   ? `${evt.data.last_name}_${crypto.randomUUID()}`
          //   : 'user_' + crypto.getRandomValues(new Uint32Array(1))[0],
          // updated_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        } as UserResponse;
        console.log('streamUser', streamUser);

        await serverClient.upsertUsers([streamUser]);

        const [newUser] = await tx
          .insert(users)
          .values({
            id: evt.data.id,
            clerkId: evt.data.id,
            firstName: evt.data.first_name || 'NA',
            lastName: evt.data.last_name || 'NA',
            fullName: evt.data.first_name + ' ' + evt.data.last_name,
            email: email || 'NA',
            password: '',
            avatar: evt.data.image_url,
            username: evt.data.username || 'NA',
            // evt.data.username || evt.data.first_name
            //   ? `${evt.data.first_name}_${crypto.randomUUID()}`
            //   : evt.data.last_name
            //   ? `${evt.data.last_name}_${crypto.randomUUID()}`
            //   : 'user_' + crypto.getRandomValues(new Uint32Array(1))[0],

            // automated add by clerk
            role: 'guest',
            plan: 'free',
            isSubscribed: false,
            isEmailVerified: false,

            // signup complete related fields
            preferences: {
              fromLocation: { city: 'N/A', state: 'N/A', country: 'N/A' },
              toLocation: { city: 'N/A', state: 'N/A', country: 'N/A' },
            },

            // onboarding related field
            isOnboarded: false,

            // profile related details
            birthdate: null,
            bio: '',
            country: null,
            state: null,
            city: null,
            zipcode: null,
            phoneNumber: null,
            profileVerificationDocuments: [],
            isDocumentVerified: false,
            languages: [],

            // stream related fields
            isOnline: false,
            streamToken: token,
            expireTime: expireTime,
            issuedAt: issuedAt,
          })
          .returning({ id: users.id, email: users.email })
          .onConflictDoNothing();

        if (newUser) {
          const [authUser, info] = await Promise.all([
            authClient.users.updateUserMetadata(newUser.id, {
              publicMetadata: {
                metadata: {
                  role: 'guest',
                  plan: 'free',
                  isOnboarded: false,
                },
              },
            }),
            tx
              .insert(userInfo)
              .values({
                id: evt.data.id,
                userId: evt.data.id,
              })
              .onConflictDoNothing()
              .returning({ id: userInfo.id }),
          ]);
          console.log(
            'Clerk auth user updated:',
            authUser.publicMetadata.metadata
          );
          console.log('User info created:', info);
        }

        return newUser;
      });

      console.log('New user created:', committed);

      // const result = await insertToDB(newUser);

      // if (!result.success) {
      //   console.error('Error inserting user to DB:', result.error);
      //   return new Response('Error inserting user to DB', { status: 500 });
      // }

      return new Response('User created webhook received', { status: 200 });
    }

    // Update user info on user.updated event
    if (eventType === 'user.updated') {
      const email = evt.data.email_addresses.find(
        (e) => e.id === evt.data.primary_email_address_id
      )?.email_address;
      // eslint-disable-next-line
      const updateUser = {
        email: email || 'NA',
        fullName: evt.data.first_name + ' ' + evt.data.last_name,
        username: evt.data.username || 'NA',
        bio: "Hello! I'm new here.",
        avatarUrl: evt.data.image_url,
        isVerified: true,
        isOnline: true,
      } as Partial<InsertUser>;

      // const result = await updateToDB(evt.data.id, updateUser);

      // if (!result.success) {
      //   console.error('Error updating user in DB:', result.error);
      //   return new Response('Error updating user in DB', { status: 500 });
      // }
      return new Response('User updated webhook received', { status: 200 });
    }

    // Handle user.deleted event
    if (eventType === 'user.deleted') {
      console.log('user.deleted', evt.data.id);
      const existingUser = await db.query.users.findFirst({
        where(fields, { eq }) {
          return eq(fields.id, evt.data.id!);
        },
        columns: { id: true, clerkId: true },
      });
      console.log('Existing user to delete:', existingUser);
      if (evt.data.id && existingUser?.id) {
        const [[account], [info]] = await Promise.all([
          db.delete(users).where(eq(users.clerkId, evt.data.id)).returning({
            id: users.id,
          }),
          db
            .delete(userInfo)
            .where(eq(userInfo.userId, evt.data.id))
            .returning({ id: userInfo.id }),
        ]);
        console.log('Deleted user account:', account);
        console.log('Deleted user info:', info);
        // await db.delete(users).where(eq(users.clerkId, evt.data.id));
        // await db.delete(userInfo).where(eq(userInfo.userId, evt.data.id));
        const destroy = await serverClient.deleteUser(evt.data.id, {
          mark_messages_deleted: true,
          delete_conversation_channels: true,
          hard_delete: true,
        });
        console.log('Clerk user deleted from Stream:', destroy);
        // return new Response('User with all credentials Deleted', {
        //   status: 200,
        // });
      }
      return new Response('User deleted webhook received', { status: 200 });
    }

    // Log session info on session.created event
    if (eventType === 'session.created') {
      // console.log('session.created', evt.data);
      const evtAttr = evt.event_attributes;
      // console.log('Session created with attributes:', evtAttr);
      await db
        .update(userInfo)
        .set({
          clientIp: evtAttr.http_request.client_ip,
          userAgent: evtAttr.http_request.user_agent,
        })
        .where(eq(userInfo.userId, evt.data.user_id));

      return new Response('Session created webhook received', { status: 200 });
    }

    // Log email info on email.created event
    if (eventType === 'email.created') {
      // console.log('email.created', evt.data.id);
      // const evtAttr = evt.event_attributes;
      const eventAppInfo = evt.data.data as EmailData;
      if (evt.data.user_id) {
        await db
          .update(userInfo)
          .set({
            domainName: eventAppInfo.app.domain_name,
            logoImageUrl: eventAppInfo.app.logo_image_url,
            logoUrl: eventAppInfo.app.logo_url,
            name: eventAppInfo.app.name,
            url: eventAppInfo.app.url,
            browserName: eventAppInfo.browser_name,
            deviceType: eventAppInfo.device_type,
            ipAddress: eventAppInfo.ip_address,
            location: eventAppInfo.location,
            operatingSystem: eventAppInfo.operating_system,
            revokeSessionUrl: eventAppInfo.revoke_session_url,
            sessionCreatedAt: eventAppInfo.session_created_at,
            signInMethod: eventAppInfo.sign_in_method,
            supportEmail: eventAppInfo.support_email,
            deliveredByClerk: evt.data.delivered_by_clerk,
            fromEmailName: evt.data.from_email_name,
            evtId: evt.data.id,
            object: evt.data.object,
            replyToEmailName: 'N/A',
            slug: evt.data.slug,
            status: evt.data.status,
            subject: evt.data.subject,
            toEmailAddress: evt.data.to_email_address,
          })
          .where(eq(userInfo.userId, evt.data.user_id));
      }
      return new Response('Email created webhook received', { status: 200 });
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
