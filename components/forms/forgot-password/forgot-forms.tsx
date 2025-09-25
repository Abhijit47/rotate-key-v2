'use client';

import { useAuth, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// import {
//   isClerkAPIResponseError,
//   isEmailLinkError,
//   isKnownError,
//   isMetamaskError,
//   EmailLinkErrorCode,
// } from '@clerk/nextjs/errors';

export default function ForgotForms() {
  const [email, setEmail] = useState('marketingconsultero@gmail.com');
  const [password, setPassword] = useState('Admin123852456');
  const [code, setCode] = useState('');
  const [totp, setTotp] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push('/');
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return null;
    }
    await signIn
      .create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then((data) => {
        console.log(data);
        setSuccessfulCreation(true);
        setError('');
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return null;
    }

    await signIn
      .attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
          setError('');
        } else if (result.status === 'complete') {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError('');
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Submit the 2FA code
  async function submit2FA(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return null;
    }

    await signIn
      .attemptSecondFactor({
        strategy: 'totp',
        code: totp,
      })
      .then((result) => {
        if (result.status === 'complete') {
          setActive({ session: result.createdSessionId });
          setError('');
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <div
      className={
        'bg-white ring-1 max-w-5xl my-12 mx-auto ring-black px-6 py-8 rounded-lg shadow-lg'
      }>
      <h1>Forgot Password?</h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
        onSubmit={!successfulCreation ? create : reset}>
        {!successfulCreation && (
          <>
            <label htmlFor='email'>Provide your email address</label>
            <input
              type='email'
              autoComplete='email'
              placeholder='e.g john@doe.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button>Send password reset code</button>
            {error && <p>{error}</p>}
          </>
        )}

        {successfulCreation && (
          <>
            <label htmlFor='password'>Enter your new password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor='password'>
              Enter the password reset code that was sent to your email
            </label>
            <input
              type='text'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button>Reset</button>
            {error && <p>{error}</p>}
          </>
        )}

        {secondFactor && (
          <form onSubmit={submit2FA}>
            {/* <p>2FA is required, but this UI does not handle that</p> */}
            <label htmlFor='totp'>Enter your 2FA code</label>
            <input
              type='text'
              value={totp}
              onChange={(e) => setTotp(e.target.value)}
            />
            <button>Submit</button>
          </form>
        )}
      </form>
    </div>
  );
}
