import { ThemeModeToggle } from '@/components/shared/theme-mode-toggle';
import { Button } from '@/components/ui/button';
import SwapUnswapContextProvider from '@/contexts/swap-unswap-context';
import { ShieldBan, ShieldCheck } from 'lucide-react';
import SwapModal from './swap-modal';
import UnSwapModal from './un-swap-modal';

export default function UserActivity() {
  return (
    <div
      className={
        'absolute top-0 left-0 flex items-center justify-center w-full gap-2 p-2 bg-muted-foreground/20 backdrop-blur-md z-10'
      }>
      <SwapUnswapContextProvider>
        <SwapModal />
        <UnSwapModal />
      </SwapUnswapContextProvider>
      <ThemeModeToggle />
      <Button size={'icon'} variant={'outline'}>
        <ShieldBan className='h-4 w-4' />
      </Button>
      <Button size={'icon'} variant={'outline'}>
        <ShieldCheck className='h-4 w-4' />
      </Button>
    </div>
  );
}
