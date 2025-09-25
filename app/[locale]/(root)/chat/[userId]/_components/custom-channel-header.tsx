import { MenuIcon } from 'lucide-react';
import {
  Avatar,
  useChannelPreviewInfo,
  useChannelStateContext,
  useChatContext,
} from 'stream-chat-react';

export default function CustomChannelHeader() {
  const { channel, watcher_count } = useChannelStateContext('ChannelHeader');
  const { openMobileNav } = useChatContext('ChannelHeader');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { displayImage, displayTitle, groupChannelDisplayInfo } =
    useChannelPreviewInfo({
      channel,
      // overrideImage,
      // overrideTitle,
    });
  // const { t } = useTranslationContext('ChannelHeader');

  // eslint-disable-next-line
  // @ts-ignore
  const { member_count, subtitle } = channel?.data || {};

  const live = true;

  return (
    <div className='str-chat__channel-header'>
      <button
        // aria-label={t('aria/Menu')}
        className='str-chat__header-hamburger'
        onClick={openMobileNav}>
        <MenuIcon />
      </button>
      <Avatar
        className='str-chat__avatar--channel-header'
        // groupChannelDisplayInfo={groupChannelDisplayInfo}
        image={displayImage}
        name={displayTitle}
      />
      <div className='str-chat__channel-header-end'>
        <p className='str-chat__channel-header-title'>
          {displayTitle}{' '}
          {live && (
            <span className='str-chat__header-livestream-livelabel'>
              {/* {t('live')} */}
              live
            </span>
          )}
        </p>
        {subtitle && (
          <p className='str-chat__channel-header-subtitle'>{subtitle}</p>
        )}
        <p className='str-chat__channel-header-info'>
          {!live && !!member_count && member_count > 0 && (
            <>
              {/* {t('{{ memberCount }} members', {
                memberCount: member_count,
              })} */}
              , {member_count} members
            </>
          )}
          {/* {t('{{ watcherCount }} online', { watcherCount: watcher_count })} */}
          {watcher_count} online
        </p>
      </div>
    </div>
  );
}
