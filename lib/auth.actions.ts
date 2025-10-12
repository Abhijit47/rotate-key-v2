'use server';

import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schemas';
import { eq } from 'drizzle-orm';
import { requireAuth } from './require-auth';

export async function signUpWithCredentials(formData: FormData) {
  console.log(formData);
  return {
    status: 200,
  };
}
export async function signInWithCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log({ email, password });
  return {
    status: 200,
  };
}

export async function afterSSOSignUp(formData: FormData) {
  console.log(formData);
  return {
    status: 200,
  };
}

export async function signUpComplete(formData: FormData) {
  const user = await requireAuth();

  try {
    if (Object.keys(Object.fromEntries(formData.entries())).length === 0) {
      return { success: false, message: 'No data provided' };
    }

    const fromLocation = formData.get('fromLocation') as string;
    const toLocation = {
      country: formData.get('country') as string,
      state: formData.get('state') as string,
      city: formData.get('city') as string,
    };

    await db
      .update(users)
      .set({
        preferences: {
          fromLocation: {
            city: '',
            state: '',
            country: fromLocation,
          },
          toLocation: toLocation,
        },
        isOnboarded: true,
      })
      .where(eq(users.id, user.id));
    return { success: true, message: 'User profile updated successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal Server Error' };
  }
}
