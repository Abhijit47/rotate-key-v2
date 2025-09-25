import { db } from '@/drizzle/db';
import { InsertUser, userInfo, users } from '@/drizzle/schemas';
import { env } from '@/env';
// import { insertToDB, updateToDB } from '@/lib/user-actions';
import { EmailData } from '@/types/clerk';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { StreamChat } from 'stream-chat';

export async function POST(req: NextRequest) {
  const serverClient = StreamChat.getInstance(
    env.NEXT_PUBLIC_STREAM_API_KEY,
    env.STREAM_API_SECRET
  );
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;
    if (eventType === 'user.created') {
      const email = evt.data.email_addresses.find(
        (e) => e.id === evt.data.primary_email_address_id
      )?.email_address;

      const { metadata } = evt.data.public_metadata;
      // console.log('metadata', metadata);
      // eslint-disable-next-line
      const newUser = {
        id: evt.data.id,
        clerkId: evt.data.id,
        email: email || 'NA',
        fullName: evt.data.first_name + ' ' + evt.data.last_name,
        username: evt.data.username || 'NA',
        gender: metadata?.gender ?? 'other',
        birthdate: metadata?.birthdate || new Date().toISOString(),
        bio: "Hello! I'm new here.",
        avatarUrl: evt.data.image_url,
        preferences: {
          fromLocation: { city: '', state: '', country: '' },
          toLocation: { city: '', state: '', country: '' },
        },
        isVerified: true,
        isOnline: true,
      } as InsertUser;

      await db.insert(userInfo).values({
        id: evt.data.id,
        userId: evt.data.id,
      });

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
      if (evt.data.id) {
        await db.delete(users).where(eq(users.clerkId, evt.data.id));
        await db.delete(userInfo).where(eq(userInfo.userId, evt.data.id));
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
