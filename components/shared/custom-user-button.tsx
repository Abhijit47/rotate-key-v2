import { Link } from '@/i18n/navigation';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import {
  CombineIcon,
  FileUser,
  MessageCircleMore,
  Rotate3d,
  ShieldUserIcon,
} from 'lucide-react';
import { useState } from 'react';

function DotIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      fill='currentColor'>
      <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' />
    </svg>
  );
}

const userButtonLinks = [
  // { href: '/', label: 'Home', active: true, labelIcon: HomeIcon },
  { href: '/swappings', label: 'Swappings', labelIcon: Rotate3d },
  // { href: '/matches', label: 'Matches', labelIcon: CombineIcon },
  { href: '/my-properties', label: 'My Properties', labelIcon: FileUser },
  { href: '/my-matches', label: 'My Matches', labelIcon: CombineIcon },
  { href: '/profile', label: 'Profile', labelIcon: CombineIcon },
  { href: '/chat', label: 'Live Chat', labelIcon: MessageCircleMore },
  { href: '/admin', label: 'Admin', labelIcon: ShieldUserIcon },
];

export default function CustomUserButton() {
  const [isOpenUserButton, setIsOpenUserButton] = useState<boolean>(false);
  const { user } = useUser();

  function toggleUserButton() {
    setIsOpenUserButton((prev) => !prev);
  }

  const isAdmin = user?.publicMetadata?.role === 'admin';

  // remove or add admin link based on user role
  const linkItems = isAdmin
    ? userButtonLinks
    : userButtonLinks.filter((link) => link.href !== '/admin');

  return (
    <SignedIn>
      <UserButton defaultOpen={isOpenUserButton}>
        {/* <UserButton.MenuItems>
          <UserButton.Action
            label='Open chat'
            labelIcon={<MessageCircleMore className={'size-4'} />}
            onClick={() => {
              alert('init chat');
              toggleUserButton();
            }}
          />
          </UserButton.MenuItems> */}

        {linkItems.map((userButton) => {
          return (
            <UserButton.MenuItems key={crypto.randomUUID()}>
              <UserButton.Link
                label={userButton.label}
                labelIcon={<userButton.labelIcon className={'size-4'} />}
                href={userButton.href}>
                <Link href={userButton.href} onClick={toggleUserButton}>
                  {userButton.label}
                </Link>
              </UserButton.Link>
            </UserButton.MenuItems>
          );
        })}

        {/* <UserButton.MenuItems>
          <UserButton.Link
            label='Matches'
            labelIcon={<CombineIcon className={'size-4'} />}
            href='/matches'>
            <Link href='/matches' onClick={toggleUserButton}>
              Matches
            </Link>
          </UserButton.Link>
        </UserButton.MenuItems>
        <UserButton.MenuItems>
          <UserButton.Link
            label='My Properties'
            labelIcon={<FileUser className={'size-4'} />}
            href='/my-properties'>
            <Link href='/my-properties' onClick={toggleUserButton}>
              My Properties
            </Link>
          </UserButton.Link>
        </UserButton.MenuItems>

        <UserButton.MenuItems>
          <UserButton.Link
            label='Chat'
            labelIcon={<MessageCircleMore className={'size-4'} />}
            href='/chat'>
            <Link href='/chat' onClick={toggleUserButton}>
              Live Chat
            </Link>
          </UserButton.Link>
        </UserButton.MenuItems>

        {isAdmin && (
          <UserButton.MenuItems>
            <UserButton.Link
              label='Admin'
              labelIcon={<ShieldUserIcon className={'size-4'} />}
              href='/admin'>
              <Link href='/admin' onClick={toggleUserButton}>
                Admin
              </Link>
            </UserButton.Link>
          </UserButton.MenuItems>
        )} */}

        <UserButton.MenuItems>
          <UserButton.Action label='Help' labelIcon={<DotIcon />} open='help' />
        </UserButton.MenuItems>

        <UserButton.UserProfilePage
          label='Help'
          labelIcon={<DotIcon />}
          url='help'>
          <div>
            <h1>Help Page</h1>
            <p>This is the custom help page</p>
          </div>
        </UserButton.UserProfilePage>
      </UserButton>
    </SignedIn>
  );
}
