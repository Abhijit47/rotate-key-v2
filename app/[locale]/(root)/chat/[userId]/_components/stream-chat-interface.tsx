'use client';

import data from '@emoji-mart/data';
import { init, SearchIndex } from 'emoji-mart';
import { Loader } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import { ChannelFilters, ChannelOptions, ChannelSort } from 'stream-chat';
import {
  Channel,
  // ChannelList,
  Chat,
  // LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  useCreateChatClient,
  Window,
} from 'stream-chat-react';
import { EmojiPicker } from 'stream-chat-react/emojis';

import { env } from '@/env';

import { useLocale } from 'next-intl';
import CustomChannelHeader from './custom-channel-header';
import FreeTierMessage from './free-tier-message';
import UserActivity from './user-activity';
// import CustomInput from './custom-input';

type Props = {
  user: {
    id: string;
    fullName: string;
    avatar: string | null;
    streamToken: string | null;
    expireTime: number | null;
    issuedAt: number | null;
  };
  matchedRecord: {
    id: string;
    channelId: string | null;
    channelType: string | null;
  };
  matchedUserId: string;
};

init({ data });
export default function StreamChatInterface(props: Props) {
  const { user, matchedRecord, matchedUserId } = props;

  const locale = useLocale();

  // token provider: called by stream client to fetch (and refresh) tokens
  // Behavior: if the user already has a valid token (expireTime in the future), return it.
  // Otherwise call the server endpoint to create/refresh a token and return the new token.
  const tokenProvider = useCallback(async () => {
    try {
      const now = Math.floor(Date.now() / 1000);

      const API_URL =
        locale === 'en'
          ? '/api/stream/refresh-token'
          : `/${locale}/api/stream/refresh-token`;

      // If we already have a token and it's not expired, return it.
      if (user.streamToken && user.expireTime && user.expireTime > now + 10) {
        // small clock skew buffer (10s)
        return user.streamToken;
      }

      // call our server endpoint to refresh or get a token
      const res = await fetch(API_URL, {
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
  }, [user.id, user.streamToken, user.expireTime, locale]);

  const chatClient = useCreateChatClient({
    apiKey: env.NEXT_PUBLIC_STREAM_API_KEY,
    tokenOrProvider: tokenProvider,
    userData: user,
  });
  const { theme } = useTheme();

  if (!chatClient)
    return (
      <div className={'h-dvh flex items-center justify-center'}>
        <span className={'sr-only'}>Setting up client & connection...</span>
        {/* <LoadingIndicator color='bg-primary' size={20} /> */}
        <Loader className='animate-spin size-8' />
      </div>
    );

  const chatChannel = chatClient.channel(
    matchedRecord.channelType!,
    matchedRecord.channelId
  );

  // channel list filters/sort/options are unused here because we open a specific channel
  // eslint-disable-next-line
  const filters: ChannelFilters = {
    members: { $in: [user.id, matchedUserId] },
  };
  // eslint-disable-next-line
  const sort: ChannelSort = { last_message_at: -1 };
  // eslint-disable-next-line
  const options: ChannelOptions = { limit: 10 };

  const currentTheme = theme === 'system' ? 'dark' : theme;

  const isFreeTierLimitReached = false; // Replace with actual logic to determine if the limit is reached

  return (
    <div className={'h-dvh w-full'}>
      <Chat
        // customClasses={{ messageList: 'relative' }}
        theme={`str-chat__theme-${currentTheme}`}
        client={chatClient}>
        {/* <ChannelList filters={filters} sort={sort} options={options} /> */}
        <Channel
          // Input={CustomInput}
          channel={chatChannel}
          EmojiPicker={EmojiPicker}
          emojiSearchIndex={SearchIndex}>
          <Window>
            {/* <ChannelHeader
              live={true}
              MenuIcon={CustomMenuIcon}
              // title='Chating...'
            /> */}
            <CustomChannelHeader />
            <MessageList head={<UserActivity />} />
            <MessageInput
              audioRecordingEnabled={true}
              {...(isFreeTierLimitReached
                ? {
                    Input: () => <FreeTierMessage />,
                  }
                : undefined)}
            />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
