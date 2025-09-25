'use client';

import { type Icon } from '@tabler/icons-react';
import * as React from 'react';

import LoadingIndicator from '@/components/shared/loading-indicator';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminNavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link
                  href={item.url}
                  // className={'w-full flex items-center justify-between'}
                  className={cn(
                    pathname === item.url
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground',
                    'w-full flex items-center justify-between'
                  )}>
                  <span className={'flex-1 flex items-center gap-2'}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </span>
                  <LoadingIndicator />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
