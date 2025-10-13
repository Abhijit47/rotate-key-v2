'use server';

import { expireTime, issuedAt } from '@/constants';
import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schemas';
import { env } from '@/env';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { StreamChat } from 'stream-chat';

export async function getStreamUserToken(userId: string) {
  try {
    // calculate timestamps at the time of the request so tokens are fresh
    // const expireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours from now
    // const issuedAt = Math.floor(new Date().getTime() / 1000);
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
      columns: {
        id: true,
        email: true,
        fullName: true,
        avatar: true,
      },
    });

    if (!existingUser) {
      return {};
    }

    // instantiate your stream client using the API key and secret
    // the secret is only used server side and gives you full access to the API
    const serverClient = StreamChat.getInstance(
      env.NEXT_PUBLIC_STREAM_API_KEY,
      env.STREAM_API_SECRET
    );

    // generate a token for the user
    const token = serverClient.createToken(userId, expireTime, issuedAt);

    await db
      .update(users)
      .set({
        streamToken: token,
        expireTime: expireTime,
        issuedAt: issuedAt,
      })
      .where(eq(users.id, userId));

    return {
      token,
      userId: userId,
      userName: existingUser.fullName,
      userImage: existingUser.avatar,
    };
  } catch (error) {
    console.error('failed to get stream user token', error);
    return {};
  } finally {
    revalidatePath(`/(root)/chat/${userId}`, 'page');
  }
}
