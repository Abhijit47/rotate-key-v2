'use server';

import { db } from '@/drizzle/db';
import { InsertUser, users } from '@/drizzle/schemas';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireAuth } from './require-auth';

// import { currentUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { cache } from 'react';
// export const requireAuth = cache(async () => {
//   const user = await currentUser();
//   if (!user) {
//     return redirect('/sign-in');
//   }
//   return user;
// });

export async function insertToDB(
  args: InsertUser
): Promise<{ success: boolean; error?: string }> {
  const user = args;
  const newUser = await db.insert(users).values(user);
  if (!newUser.rowCount) {
    return { success: false, error: 'Failed to insert user' };
  }

  return { success: true };
}

export async function updateToDB(
  clerkId: string,
  args: Partial<InsertUser>
): Promise<{ success: boolean; error?: string }> {
  const updatedFields = args;

  const updatedUser = await db
    .update(users)
    .set(updatedFields)
    .where(eq(users.clerkId, clerkId));

  if (!updatedUser.rowCount) {
    return { success: false, error: 'Failed to update user' };
  }

  return { success: true };
}

export async function deleteFromDB(
  clerkId: string
): Promise<{ success: boolean; error?: string }> {
  const deletedUser = await db.delete(users).where(eq(users.clerkId, clerkId));

  if (!deletedUser.rowCount) {
    return { success: false, error: 'Failed to delete user' };
  }

  return { success: true };
}

export async function getUserLocationPreference() {
  const user = await requireAuth();

  try {
    const preparedPreferences = db.query.users
      .findFirst({
        where: eq(users.id, user.id),
        columns: {
          preferences: true,
        },
      })
      .prepare('getUserLocationPreference');

    const result = await preparedPreferences.execute();

    if (!result) {
      return { success: false, preferences: null };
    }

    return { success: true, preferences: result.preferences };
  } catch (error) {
    console.error('Error fetching user location preference:', error);
    return { success: false, preferences: null };
  }
}

export async function getMyProfile() {
  const user = await requireAuth();

  try {
    const result = await db.query.users.findFirst({
      where: eq(users.id, user.id),
    });

    if (!result) {
      return { success: false, profile: null };
    }

    return { success: true, profile: result };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { success: false, profile: null };
  }
}

export async function updatePreferences(preferences: FormData) {
  const user = await requireAuth();

  const country = preferences.get('country') as string;
  const state = preferences.get('state') as string;
  const city = preferences.get('city') as string;

  try {
    const commited = await db.transaction(async (tx) => {
      const existingUser = await tx.query.users.findFirst({
        where: eq(users.id, user.id),
        columns: { id: true, preferences: true },
      });

      if (!existingUser?.preferences) {
        tx.rollback();
        return { success: false, error: 'User Preference not found' };
      }

      const formLocation = existingUser.preferences?.fromLocation;
      const toLocation = existingUser.preferences?.toLocation;

      const updatedUser = await tx
        .update(users)
        .set({
          preferences: {
            fromLocation: {
              city: formLocation.city,
              state: formLocation.state,
              country: formLocation.country,
            },
            toLocation: {
              city: city || toLocation.city,
              state: state || toLocation.state,
              country: country || toLocation.country,
            },
          },
        })
        .where(eq(users.id, user.id));
      if (!updatedUser.rowCount) {
        tx.rollback();
        return { success: false, error: 'Failed to update preferences' };
      }

      return { success: true };
    });
    return commited;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return { success: false, error: 'Failed to update preferences' };
  } finally {
    revalidatePath('/(root)/swappings', 'page');
  }
}
