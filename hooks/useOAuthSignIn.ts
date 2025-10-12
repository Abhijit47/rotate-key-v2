import { useSignIn, useSignUp } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';

export function useOAuthSignIn() {
  const [isLoginPending, startLoginTransition] = useTransition();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, setActive, isLoaded: isSignUpLoaded } = useSignUp();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locale = useLocale();

  // if (!signIn || !signUp) return null;

  function signInWith(strategy: OAuthStrategy) {
    if (!isSignInLoaded || !isSignUpLoaded) return null;

    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sign-in/sso-callback',
      redirectUrlComplete: '/',
    });
  }

  // function signUpWith(strategy: OAuthStrategy) {
  //   if (!isSignInLoaded || !isSignUpLoaded) return null;

  //   return signUp.authenticateWithRedirect({
  //     strategy,
  //     redirectUrl: '/auth/sign-up/sso-callback',
  //     redirectUrlComplete: '/auth/sign-up-complete',
  //   });
  // }

  function handleSignIn(strategy: OAuthStrategy) {
    if (!isSignInLoaded || !isSignUpLoaded) {
      toast.loading('Loading...', { id: 'loading' });
      toast.dismiss('loading');
      return null;
    }
    startLoginTransition(async () => {
      if (!signIn || !signUp) return;

      // If the user has an account in your application, but does not yet
      // have an OAuth account connected to it, you can transfer the OAuth
      // account to the existing user account.
      // console.log(signUp.verifications.externalAccount.status);
      // console.log(signUp.verifications.externalAccount.error?.code);
      const userExistsButNeedsToSignIn =
        signUp.verifications.externalAccount.status === 'transferable' &&
        signUp.verifications.externalAccount.error?.code ===
          'external_account_exists_code';
      // console.log('userExistsButNeedsToSignIn', userExistsButNeedsToSignIn);

      if (userExistsButNeedsToSignIn) {
        const res = await signIn.create({ transfer: true });

        if (res.status === 'complete') {
          setActive({
            session: res.createdSessionId,
          });
          // const user = res.userData;
          // const formData = new FormData();
          // formData.append('firstName', user.firstName as string);
          // formData.append('lastName', user.lastName as string);
          // formData.append('hasImage', String(user.hasImage));
          // formData.append('imageUrl', user.imageUrl as string);

          // const result = await ExchnageOAuthDetails(formData);

          // console.log('result', result);
        }

        // return router.push('/auth/sign-up-complete');
      }
      // If the user has an OAuth account but does not yet
      // have an account in your app, you can create an account
      // for them using the OAuth information.
      // console.log(
      //   'signIn.firstFactorVerification.status',
      //   signIn.firstFactorVerification.status
      // );
      // console.log(
      //   'signIn.secondFactorVerification.status',
      //   signIn.secondFactorVerification.status
      // );
      const userNeedsToBeCreated =
        signIn.firstFactorVerification.status === 'transferable';
      // console.log('userNeedsToBeCreated', userNeedsToBeCreated);

      if (userNeedsToBeCreated) {
        // const res1 = await signUp.authenticateWithRedirect({
        //   strategy: strategy,
        //   redirectUrl: '/auth/sign-up/sso-callback',
        //   redirectUrlComplete: '/auth/sign-up-complete',
        // });
        // alert(JSON.stringify(res1));
        const res = await signUp.create({
          transfer: true,
          // strategy: strategy,
          // redirectUrl: '/auth/sign-up/sso-callback',
          // actionCompleteRedirectUrl: '/auth/sign-up-complete',
          // externalAccountStrategy: strategy,
          // externalAccountRedirectUrl: '/auth/sign-up/sso-callback',
          // externalAccountActionCompleteRedirectUrl: '/auth/sign-up-complete',
        });
        // alert(JSON.stringify(res));
        if (res.status === 'complete') {
          setActive({
            session: res.createdSessionId,
          });
          // const formData = new FormData();
          // formData.append('clerkId', res.createdUserId as string);
          // formData.append('firstName', res.firstName as string);
          // formData.append('lastName', res.lastName as string);
          // formData.append('phoneNumber', res.phoneNumber as string);
          // formData.append('hasPassword', String(res.hasPassword));
          // const result = await SignUpWithSSO(formData);
          // console.log('result', result);

          // router.push('/auth/sign-up-complete');
        }
      } else {
        // If the user has an account in your application
        // and has an OAuth account connected to it, you can sign them in.
        toast.loading('signing in', { id: 'sign-in' });
        signInWith(strategy);
        toast.dismiss('sign-in');
        // router.replace('/sign-up');
        // router.refresh();
        // setLoading(false);
      }
    });
  }

  return { handleSignIn, isLoginPending, isSignInLoaded, isSignUpLoaded };
}
