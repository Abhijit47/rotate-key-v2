'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const requireAuth = cache(async () => {
  const user = await currentUser();
  if (!user) {
    return redirect('/sign-in');
  }
  return user;
});
