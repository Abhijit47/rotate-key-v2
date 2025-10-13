'use client';

import { Settings2 } from 'lucide-react';

import DatePickerWithRange from '@/components/shared/DatePickerWithRangeSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import PropertyFilters from './property-filters';

export default function SwappingFilter() {
  return (
    <div
      className={
        'absolute left-0 bottom-0 sm:bottom-4 lg:bottom-8 w-full px-8'
      }>
      <div
        className={
          'bg-primary-200/50 w-fit mx-auto backdrop-blur-sm rounded-2xl lg:rounded-full p-4'
        }>
        <Card
          className={
            'p-2 rounded-2xl lg:rounded-full ring ring-primary-500 max-w-2xl mx-auto'
          }>
          <CardContent className={'p-2 flex items-center flex-wrap gap-2'}>
            <Input
              type='text'
              id='where'
              placeholder='Where to go ?'
              className={'w-full flex-1 rounded-2xl'}
            />

            <DatePickerWithRange />

            <Button
              size={'sm'}
              className={
                'lg:rounded-full w-full lg:w-fit hover:cursor-pointer'
              }>
              View Home
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size={'sm'}
                  className={'w-full lg:w-fit hover:cursor-pointer'}>
                  <Settings2 className={'size-4'} />
                  <span className={'sr-only'}>more settings</span>
                </Button>
              </DialogTrigger>
              <DialogContent
                className={'max-w-xs xs:max-w-md sm:max-w-lg md:max-w-xl'}>
                <DialogHeader>
                  <DialogTitle>
                    Property Filters{' '}
                    <span className={'text-xs text-secondary-300'}>
                      (optional)
                    </span>
                  </DialogTitle>
                  <DialogDescription>
                    Set your preferences to find the best property matches for
                    your needs.{' '}
                    <span className={'text-xs text-secondary-300'}>
                      (optional)
                    </span>
                  </DialogDescription>
                </DialogHeader>

                <PropertyFilters />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
