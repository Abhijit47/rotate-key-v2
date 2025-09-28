// import cloudinary from '@/configs/cloudinary';
import { env } from '@/env';
// import { auth, currentUser } from '@clerk/nextjs/server';
// import { UploadApiResponse } from 'cloudinary';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

export async function POST(request: NextRequest) {
  try {
    // Use Clerk to get the session claims for the current user.
    // Return a 401 response if the claims are not present (the user is not logged in)
    // const { sessionClaims, redirectToSignIn } = await auth();
    // console.log('Session Claims:', sessionClaims);
    // if (!sessionClaims) {
    //   return redirectToSignIn({
    //     returnBackUrl: '/',
    //   });
    // }

    // const user = await currentUser();
    // console.log('User:', user);
    // if (!user) {
    //   // return NextResponse.json({ success: false, message: "Please login and try again!" });
    //   const newUrl = new URL('/sign-in', request.url);
    //   return NextResponse.redirect(newUrl.toString(), { status: 302 });
    // }
    // const locale = await getLocale();
    // console.log('Locale:', locale);
    const user = { id: 'test-user' };

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const BASE_URL = isDev
      ? env.NEXT_PUBLIC_DEV_BASE_URL
      : env.NEXT_PUBLIC_PROD_BASE_URL;

    // TODO: ARCJET checks
    // console.log(await request.json());

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: 'No file found',
          data: null,
        },
        {
          status: 400,
          statusText: 'Bad Request',
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // console.log('File:', file);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = file.name;
    console.log('filename:', filename);

    // console.log('buffer:', buffer);

    // For debugging purposes only up load to local server
    const folderPath = __dirname + '/temp/' + user.id;
    console.log('folderPath:', folderPath);
    const filePath = join(folderPath, filename);
    console.log('filePath:', filePath);

    await fs.mkdir(folderPath, { recursive: true });
    await fs.writeFile(filePath, buffer);
    const result = {
      secure_url: `http://localhost:3000/temp/${user.id}/${filename}`,
    };

    // TODO: Upload to Cloudinary
    // const result = (await new Promise((resolve, reject) => {
    //   cloudinary.uploader
    //     .upload_stream(
    //       {
    //         resource_type: 'auto',
    //         public_id: filename,
    //         upload_preset: 'rotate-key',
    //         tags: ['my-property'],
    //         folder: `rotate-key/${user}/my-property`,
    //         notification_url: `${BASE_URL}/api/webhooks/cloudinary`,
    //       },
    //       (error, result) => {
    //         if (error) reject(error);
    //         else if (result) resolve(result);
    //         else reject(new Error('Upload result is undefined'));
    //       }
    //     )
    //     .end(buffer);
    // })) as UploadApiResponse;

    //TODO: notify user of successful upload

    return NextResponse.json(
      {
        success: true,
        message: 'Image uploaded successfully',
        data: result.secure_url,
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
        data: null,
      },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
}
