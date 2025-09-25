'use client';

import { env } from '@/env';
import { useTheme } from 'next-themes';
import { createContext, useCallback, useContext } from 'react';
import {
  ChannelFilters,
  ChannelOptions,
  ChannelSort,
  StreamChat,
} from 'stream-chat';
import { useCreateChatClient } from 'stream-chat-react';

type StreamChatContextType = {
  chatClient: StreamChat | null;
  currentTheme: string | undefined;
  filters: ChannelFilters;
  sort: ChannelSort;
  options: ChannelOptions;
  isFreeTierLimitReached: boolean;
};

const StreamChatContext = createContext({} as StreamChatContextType);

export default function StreamChatContextProvider({
  children,
  user,
  matchedUserId,
}: {
  children: React.ReactNode;
  user: {
    id: string;
    streamToken: string | null;
    expireTime: number | null;
  };
  matchedUserId: string;
}) {
  // token provider: called by stream client to fetch (and refresh) tokens
  // Behavior: if the user already has a valid token (expireTime in the future), return it.
  // Otherwise call the server endpoint to create/refresh a token and return the new token.
  const tokenProvider = useCallback(async () => {
    try {
      const now = Math.floor(Date.now() / 1000);

      // If we already have a token and it's not expired, return it.
      if (user.streamToken && user.expireTime && user.expireTime > now + 10) {
        // small clock skew buffer (10s)
        return user.streamToken;
      }

      // call our server endpoint to refresh or get a token
      const res = await fetch('/api/stream/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!res.ok) {
        throw new Error('failed to fetch stream token');
      }

      const data = (await res.json()) as {
        token: string;
        userId: string;
        userName: string;
        userImage: string | null;
      };
      return data.token;
    } catch (err) {
      // bubble up to stream client so it can handle connection failure
      console.error('tokenProvider error', err);
      throw err;
    }
  }, [user.id, user.streamToken, user.expireTime]);

  const chatClient = useCreateChatClient({
    apiKey: env.NEXT_PUBLIC_STREAM_API_KEY,
    tokenOrProvider: tokenProvider,
    userData: user,
  });

  const { theme } = useTheme();

  // channel list filters/sort/options are unused here because we open a specific channel
  // //eslint-disable-next-line
  const filters: ChannelFilters = {
    members: { $in: [user.id, matchedUserId] },
  };
  // //eslint-disable-next-line
  const sort: ChannelSort = { last_message_at: -1 };
  // //eslint-disable-next-line
  const options: ChannelOptions = { limit: 10 };

  const currentTheme = theme === 'system' ? 'dark' : theme;

  const isFreeTierLimitReached = false; // Replace with actual logic to determine if the limit is reached

  return (
    <StreamChatContext.Provider
      value={{
        chatClient,
        currentTheme,
        filters,
        sort,
        options,
        isFreeTierLimitReached,
      }}>
      {children}
    </StreamChatContext.Provider>
  );
}

export function useStreamChatContext() {
  const context = useContext(StreamChatContext);
  if (context === undefined) {
    throw new Error(
      'useStreamChatContext must be used within a StreamChatContextProvider'
    );
  }
  return context;
}
