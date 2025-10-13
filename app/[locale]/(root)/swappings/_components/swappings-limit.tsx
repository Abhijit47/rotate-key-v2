import { Loader2 } from 'lucide-react';
import { useQueryStates } from 'nuqs';
import { useTransition } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { swappingSearchParams } from '@/lib/helpers/searchParams';

export default function SwappingsLimit() {
  const [isTranstion, startTransition] = useTransition();
  const [{ limit }, setValues] = useQueryStates(swappingSearchParams, {
    shallow: false,
    throttleMs: 300,
    history: 'replace',
  });

  return (
    <Select
      disabled={isTranstion}
      onValueChange={(value) => {
        console.log('Selected limit:', value);
        startTransition(() => {
          // This will update the limit in the search params
          // and trigger a re-render with the new limit
          setValues((prev) => ({
            ...prev,
            // limit: parseInt(value, 10),
            limit: value, // Keep it as string to match the search params type
          }));
        });
      }}>
      <SelectTrigger className='w-[180px]'>
        {isTranstion ? (
          <span>
            <Loader2 className={'size-4 animate-spin'} />
          </span>
        ) : null}
        <SelectValue
          placeholder={limit === '10' ? `Default ${limit}` : `Limit ${limit}`}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            Limit <small className={'text-xs'}>(per page)</small>
          </SelectLabel>
          <SelectItem value={'10'}>10 Properties</SelectItem>
          <SelectItem value={'20'}>20 Properties</SelectItem>
          <SelectItem value={'30'}>30 Properties</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
