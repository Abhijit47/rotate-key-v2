'use client';

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export function AdminNavUser() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth();
  const { isMobile } = useSidebar();
  const router = useRouter();

  if (!user) {
    router.replace('/sign-in', { scroll: false });
    return null;
  }

  if (!isLoaded || !isSignedIn) {
    return <Skeleton className={'h-10 w-full animate-pulse'} />;
  }

  const email = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  const altText = user.firstName
    ? `${user.firstName} ${user.lastName}`
    : email || 'User Avatar';
  const avatarFallback = user.firstName
    ? `${user.firstName.charAt(0).toUpperCase()}${user.lastName
        ?.charAt(0)
        .toUpperCase()}`
    : email
    ? email.charAt(0).toUpperCase()
    : 'U';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <Avatar className='h-8 w-8 rounded-lg grayscale'>
                <AvatarImage src={user.imageUrl} alt={altText} />
                <AvatarFallback className='rounded-lg'>
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.firstName}</span>
                <span className='text-muted-foreground truncate text-xs'>
                  {email?.toUpperCase()}
                </span>
              </div>
              <IconDotsVertical className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}>
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg grayscale'>
                  <AvatarImage src={user.imageUrl} alt={altText} />
                  <AvatarFallback className='rounded-lg'>
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{user.firstName}</span>
                  <span className='text-muted-foreground truncate text-xs'>
                    {email?.toUpperCase()}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive' onClick={() => signOut()}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
