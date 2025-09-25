'use client';

import {
  IconCamera,
  IconChartHistogram,
  IconCirclesRelation,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconHomeInfinity,
  IconPdf,
  IconPin,
  IconReport,
  IconRotateClockwise,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavDocuments } from './../_components/nav-documents';
import { AdminNavMain } from './admin-nav-main';
import { AdminNavSecondary } from './admin-nav-secondary';
import { AdminNavUser } from './admin-nav-user';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: IconDashboard,
    },
    {
      title: 'Analytics',
      url: '/admin/analytics',
      icon: IconChartHistogram,
    },
    {
      title: 'Properties',
      url: '/admin/properties',
      icon: IconHomeInfinity,
    },
    {
      title: 'Documents',
      url: '/admin/documents',
      icon: IconPdf,
    },
    {
      title: 'Connections',
      url: '/admin/connections',
      icon: IconCirclesRelation,
    },
    {
      title: 'Bookings',
      url: '/admin/bookings',
      icon: IconPin,
    },
    {
      title: 'Swappings',
      url: '/admin/swappings',
      icon: IconRotateClockwise,
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/admin/settings',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: IconDatabase,
    },
    {
      name: 'Reports',
      url: '#',
      icon: IconReport,
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: IconFileWord,
    },
  ],
};

export function AdminAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className={'flex items-center gap-2'}>
            <Button
              size={'icon'}
              variant='ghost'
              onClick={() => router.push('/')}>
              <ArrowLeft className='size-4' />
            </Button>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'>
              <Link href='/admin'>
                <Image
                  src='/logo-landscape.png'
                  alt='brand-logo'
                  width={800}
                  height={106}
                  className={'h-8 w-full object-fill rounded-sm'}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AdminNavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <AdminNavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <AdminNavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
