import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const checkPlan = async (plan: Plans, isExpired: boolean) => {
  const { sessionClaims } = await auth();
  if (plan === 'semi_subscribe' && !isExpired) {
    redirect('/');
  }
  return sessionClaims?.metadata.plan === plan;
};
