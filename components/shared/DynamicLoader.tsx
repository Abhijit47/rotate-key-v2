import { Loader2 } from 'lucide-react';

export default function DynamicLoader() {
  return (
    <div className={'w-full h-full flex items-center justify-center'}>
      <span className={'sr-only'}>Loading...</span>
      <span>
        <Loader2 className={'size-4 md:size-6 lg:size-8 animate-spin'} />
      </span>
    </div>
  );
}
