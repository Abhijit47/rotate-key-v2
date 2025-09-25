import { userNavigation } from '@/constants';
import { UserButton } from '@clerk/nextjs';
import { LinkIcon } from 'lucide-react';
// import { useState } from 'react';
// import { HiOutlineLink } from 'react-icons/hi2';

export default function CustomUserProfileButton() {
  // const [open, setOpen] = useState(false);

  // function toggleOpen() {
  //   setOpen((prev) => !prev);
  // }

  return (
    <UserButton
      // customMenuItems={[
      //   {
      //     label: 'My Properties',
      //     href: '/my-property',
      //   },
      //   {
      //     label: 'Open chat',
      //     onClick: () => alert('init chat'),
      //   },
      //   // { label: 'manageAccount' },
      //   { label: 'signOut' },
      // ]}
      // defaultOpen={open}
      appearance={{
        elements: {
          userButtonAvatarBox: {
            height: '2.2rem',
            width: '2.2rem',
          },
          userButtonPopoverFooter: {
            display: 'none',
          },
        },
      }}>
      <UserButton.MenuItems>
        <UserButton.Link
          label='My Properties'
          labelIcon={<LinkIcon className={'size-4'} />}
          href='/my-property'
        />
        {/* <UserButton.Action
                        label='Open chat'
                        labelIcon={<DotIcon />}
                        onClick={() => alert('init chat')}
                      /> */}
        {userNavigation.slice(0, 6).map((item) => (
          <UserButton.Link
            key={item.id}
            label={item.name}
            labelIcon={<LinkIcon className={'size-4'} />}
            href={item.href}
          />
        ))}
        {/* <UserButton.Action label='manageAccount' /> */}
        <UserButton.Action label='signOut' />
      </UserButton.MenuItems>
    </UserButton>
  );
}
