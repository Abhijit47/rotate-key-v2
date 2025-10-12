'use client';

import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
// import {
//   AuthenticateWithGoogleOneTapParams,
//   GoogleOneTapProps,
// } from '@clerk/types';

// Add clerk to Window to avoid type errors
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          prompt: (
            callback?: (notification: {
              isNotDisplayed: () => boolean;
              getNotDisplayedReason: () => string;
              isSkippedMoment: () => boolean;
              getSkippedReason: () => string;
              isDismissedMoment: () => boolean;
              getDismissedReason: () => string;
            }) => void
          ) => void;
        };
      };
    };
  }
}

export function CustomGoogleOneTap() {
  const clerk = useClerk();
  const router = useRouter();

  const call = useCallback(
    async (token: string) => {
      console.log('Token ::', token);

      try {
        const res = await clerk.authenticateWithGoogleOneTap({
          token,
        });

        await clerk.handleGoogleOneTapCallback(res, {
          signInFallbackRedirectUrl: '/onboarding',
        });
      } catch (error) {
        console.log('Error ::', error);
        router.push('/sign-in');
      }
    },
    [clerk, router]
  );

  const oneTap = useCallback(() => {
    const { google } = window;
    if (google) {
      google.accounts.id.initialize({
        // Add your Google Client ID here.
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (response: { credential: string }) => {
          console.log('Response ::', response);
          // Here we call our provider with the token provided by Google
          call(response.credential);
        },
      });

      // Uncomment below to show the One Tap UI without
      // logging any notifications.
      // return google.accounts.id.prompt() // without listening to notification

      // Display the One Tap UI, and log any errors that occur.
      return google.accounts.id.prompt(
        (notification: {
          isNotDisplayed: () => boolean;
          getNotDisplayedReason: () => string;
          isSkippedMoment: () => boolean;
          getSkippedReason: () => string;
          isDismissedMoment: () => boolean;
          getDismissedReason: () => string;
        }) => {
          console.log('Notification ::', notification);
          if (notification.isNotDisplayed()) {
            console.log(
              'getNotDisplayedReason ::',
              notification.getNotDisplayedReason()
            );
          } else if (notification.isSkippedMoment()) {
            console.log(
              'getSkippedReason  ::',
              notification.getSkippedReason()
            );
          } else if (notification.isDismissedMoment()) {
            console.log(
              'getDismissedReason ::',
              notification.getDismissedReason()
            );
          }
        }
      );
    }
  }, [call]);

  useEffect(() => {
    // Will show the One Tap UI after two seconds
    const timeout = setTimeout(() => oneTap(), 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [oneTap]);

  // return (
  //   <>
  //     {/* <Script
  //       id='google-one-tap'
  //       src='https://accounts.google.com/gsi/client'
  //       strategy='beforeInteractive'> */}
  //     {children}
  //     {/* </Script> */}
  //   </>
  // );

  return null;
}
