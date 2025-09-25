'use client';

import { Settings2 } from 'lucide-react';

// import { useModal } from '@/contexts/ModalContext';
// import { sendGTMEvent } from '@next/third-parties/google';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import DatePickerWithRangeSelect from './DatePickerWithRangeSelect';

export default function PropertyFilter() {
  // const { toggleModal } = useModal();

  return (
    <Card
      className={
        'p-1 rounded-2xl lg:rounded-full ring ring-primary-500 max-w-2xl mx-auto'
      }>
      <CardContent className={'p-1 flex items-center flex-wrap gap-2'}>
        <Input
          type='text'
          id='where'
          placeholder='Where to go ?'
          className={'w-full flex-1 rounded-full'}
        />

        <DatePickerWithRangeSelect />

        <Button
          // onClick={() =>
          //   sendGTMEvent({
          //     event: 'buttonClicked',
          //     value: 'viewHome',
          //   })
          // }
          className={'lg:rounded-full w-full lg:w-fit hover:cursor-pointer'}>
          View Home
        </Button>

        <Button
          className={
            'w-full lg:w-fit hover:cursor-pointer lg:rounded-tl-md lg:rounded-rl-md lg:rounded-tr-full lg:rounded-br-full'
          }
          // onClick={toggleModal}
        >
          <Settings2 className={'size-4'} />
          <span className={'sr-only'}>more settings</span>
        </Button>
      </CardContent>
    </Card>
  );
}
