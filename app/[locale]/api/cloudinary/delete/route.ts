import cloudinary from '@/configs/cloudinary';
// import { env } from '@/env';
import { auth, currentUser } from '@clerk/nextjs/server';
// import { UploadApiResponse } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// const isDev = process.env.NODE_ENV === 'development' ? true : false;

export async function DELETE(request: NextRequest) {
  // Use Clerk to get the session claims for the current user.
  // Return a 401 response if the claims are not present (the user is not logged in)
  const { sessionClaims, redirectToSignIn } = await auth();
  if (!sessionClaims) {
    return redirectToSignIn({
      returnBackUrl: '/',
    });
  }

  const user = await currentUser();
  if (!user) {
    // return NextResponse.json({ success: false, message: "Please login and try again!" });
    const newUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(newUrl.toString(), { status: 302 });
  }

  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // const BASE_URL = isDev
    //   ? env.NEXT_PUBLIC_DEV_BASE_URL
    //   : env.NEXT_PUBLIC_PROD_BASE_URL;

    // TODO: ARCJET checks
    // console.log(await request.json());

    const payload = await request.formData();
    // console.log('Request data:', Object.fromEntries(payload.entries()));

    const publicId = payload.get('publicId')?.toString();
    const resourceType = payload.get('resourceType')?.toString() || 'image';

    // console.log('publicId:', publicId);
    // console.log('resourceType:', resourceType);
    if (!publicId || typeof publicId !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid publicId',
        },
        {
          status: 400,
          statusText: 'Bad Request',
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // TODO: Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType, // or 'video' if you're deleting a video
      invalidate: true, // to invalidate the cached versions
    });

    //TODO: notify user of successful upload

    return NextResponse.json(
      {
        success: true,
        message: 'Image deleted successfully',
      },
      {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
      {
        status: 500,
        statusText: 'Internal Server Error',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
