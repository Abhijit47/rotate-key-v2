'use server';

import { Roles } from '@/types/globals';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
};

/**
 * You can customize the behavior of the checkRole() helper function to suit your needs. For example, you could modify it to return the roles a user has or create a protectByRole() function that handles role-based redirects.
 */
export const protectByRole = async (role: Roles) => {
  const hasRole = await checkRole(role);
  if (!hasRole) {
    redirect('/sign-in'); // or any other page
  }
};

export async function setRole(formData: FormData) {
  const client = await clerkClient();

  // Check that the user trying to set the role is an admin
  if (!checkRole('admin')) {
    return { message: 'Not Authorized' };
  }

  try {
    const res = await client.users.updateUserMetadata(
      formData.get('id') as string,
      {
        // publicMetadata: { role: formData.get('role') },
        publicMetadata: {
          metadata: { role: (formData.get('role') as Roles) || 'guest' },
        },
      }
    );
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}

export async function removeRole(formData: FormData) {
  const client = await clerkClient();

  try {
    const res = await client.users.updateUserMetadata(
      formData.get('id') as string,
      {
        // publicMetadata: { role: null },
        publicMetadata: { metadata: { role: 'guest' } },
      }
    );
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}
