'use client';

import { Button } from '@/components/ui/button';
import { CardAction } from '@/components/ui/card';
import { clearCacheData } from '@/lib/clear-cache';
import { cn } from '@/lib/utils';
import { IconReload } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function RevalidateData({
  tagName,
  type,
}: {
  tagName?: string;
  type: 'page' | 'layout';
}) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function handleRefresh() {
    startTransition(async () => {
      // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
      await clearCacheData({
        tagName: tagName,
        path: pathname,
        type: type,
      });
      toast.success('Data revalidated successfully!');
    });
  }

  return (
    <CardAction>
      <Button
        title='Revalidate Data'
        size={'icon'}
        variant={'ghost'}
        disabled={isPending}
        onClick={handleRefresh}>
        <IconReload className={cn(isPending && 'animate-spin')} />
      </Button>
    </CardAction>
  );
}
