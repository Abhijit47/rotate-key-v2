import { getStreamUserToken } from '@/lib/stream';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { userId: string };
    const { userId } = body || {};

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'missing userId' }, { status: 400 });
    }

    const tokenResult = await getStreamUserToken(userId);

    // getStreamUserToken returns an object; expect { token, userId, ... }
    if (!tokenResult || !('token' in tokenResult)) {
      return NextResponse.json({ error: 'no token returned' }, { status: 500 });
    }

    return NextResponse.json(tokenResult);
  } catch (err) {
    // log server-side error for debugging
    console.error('refresh-token error', err);
    return NextResponse.json(
      { error: 'failed to refresh token' },
      { status: 500 }
    );
  }
}
