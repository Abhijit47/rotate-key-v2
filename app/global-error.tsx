'use client';

import Error from 'next/error';
// Error boundaries must be Client Components

// Follow for more information:
// https://next-intl.dev/docs/environments/error-files

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    // global-error must include html and body tags
    <html lang='en'>
      <body>
        <h2>Something went wrong!</h2>
        <Error statusCode={404} withDarkMode={true} />
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
