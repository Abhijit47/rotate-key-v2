/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JAidKu5Mgt1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

const selectoOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
  { value: 'option6', label: 'Option 6' },
  { value: 'option7', label: 'Option 7' },
  { value: 'option8', label: 'Option 8' },
  { value: 'option9', label: 'Option 9' },
  { value: 'option10', label: 'Option 10' },
];

export default function SelectComponent() {
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([
    { value: 'option6', label: 'Option 6' },
    { value: 'option7', label: 'Option 7' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [options, setOptions] = useState(selectoOptions);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option: SelectOption) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleRemoveOption = (option: SelectOption) => {
    setSelectedOptions(selectedOptions.filter((o) => o !== option));
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <Label htmlFor='dropdown'>Select options:</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              id='dropdown'
              className='w-full justify-between'>
              <span>
                {selectedOptions.length > 0
                  ? `${selectedOptions.length} selected`
                  : 'Select options'}
              </span>
              <ChevronDownIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[400px] p-4' id='dropdown'>
            <div className='flex flex-col gap-4'>
              <Input
                type='search'
                placeholder='Search options...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full'
              />
              <div className='flex flex-col gap-2'>
                {filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Checkbox
                        id={option.value}
                        checked={selectedOptions.includes(option)}
                        onCheckedChange={() => handleOptionSelect(option)}
                      />
                      <Label htmlFor={option.value} className='font-normal'>
                        {option.label}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {selectedOptions.length > 0 && (
        <div className='flex flex-col gap-2'>
          <div className='font-medium'>Selected options:</div>
          <div className='flex flex-wrap gap-2'>
            {selectedOptions.map((option) => (
              <div key={option.value} className='flex items-center gap-2'>
                <Badge className='flex items-center gap-2 rounded-full text-xs font-medium'>
                  {option.label}
                </Badge>
                <Button
                  size={'sm'}
                  variant='ghost'
                  className='p-1'
                  onClick={() => handleRemoveOption(option)}>
                  <XIcon className='h-4 w-4' />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m6 9 6 6 6-6' />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  );
}
