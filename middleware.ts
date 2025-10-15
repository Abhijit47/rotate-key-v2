import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { getLocale } from 'next-intl/server';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// const intlMiddleware = createMiddleware({
//   locales: AppConfig.locales,
//   localePrefix: AppConfig.localePrefix,
//   defaultLocale: AppConfig.defaultLocale,
// });

const handleI18nRouting = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  '/swappings(.*)',
  '/matches(.*)',
  '/my-properties(.*)',
  '/chat(.*)',
  '/profile(.*)',
]);

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const locale = await getLocale();
  // api/novu is a public API route, so we skip Clerk middleware for it
  // if (req.nextUrl.pathname.startsWith('/api/novu')) NextResponse.next();

  // exclude inngest routes from authentication
  if (req.nextUrl.pathname.startsWith(`/${locale}/api/inngest`)) {
    // console.log('Skipping authentication for Inngest API route');
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) await auth.protect();

  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== 'admin'
  ) {
    const url = new URL('/sign-in', req.url);
    // console.log({ url });
    return NextResponse.redirect(url);
  }

  return handleI18nRouting(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
  // matcher: ['/admin/:path*', '/((?!api|trpc|_next|_vercel|.*\\..*).*)'], // Specify the routes the middleware applies to
};
