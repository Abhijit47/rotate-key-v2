// EXTERNAL IMPORTS
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import { DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

// INTERNAL IMPORTS
import AccessibilitiesFilter from './filters/AccessibilitiesFilter';
import AccomodationFilter from './filters/AccomodationFilter';
import AmmenitiesFilter from './filters/AmmenitiesFilter';
import EnvironmentFilter from './filters/EnvironmentFilter';
import MoveInAndOutFilter from './filters/MoveInAndOutFilter';
import OwnershipTypeFilter from './filters/OwnershipTypeFilter';
import RentalPeriodFilter from './filters/RentalPeriodFilter';
import RulesFilter from './filters/RulesFilter';
import SurroundingFilter from './filters/SurroundingFilter';
import SwappingTypeFilter from './filters/SwappingTypeFilter';

export default function PropertyFilters() {
  return (
    <div>
      <ScrollArea className='h-[300px] md:h-[500px] w-full rounded-md border p-4'>
        {/* Dates */}
        <MoveInAndOutFilter />

        <Accordion type='single' collapsible className='w-full'>
          {/* Ownerships */}
          <OwnershipTypeFilter itemNo={'1'} />

          {/* Swappings */}
          <SwappingTypeFilter itemNo={'2'} />

          {/* Rental */}
          <RentalPeriodFilter itemNo={'3'} />

          {/* Surrounding */}
          <SurroundingFilter itemNo={'4'} />

          {/* Environment */}
          <EnvironmentFilter itemNo={'5'} />

          {/* Accomodation */}
          <AccomodationFilter itemNo={'6'} />

          {/* Amenities */}
          <AmmenitiesFilter itemNo={'7'} />

          {/* Rules */}
          <RulesFilter itemNo={'8'} />

          {/* Accessibilities */}
          <AccessibilitiesFilter itemNo={'9'} />
        </Accordion>

        <Card className={'py-2 md:py-4'}>
          <CardDescription className={'px-2 md:px-4'}>
            <DialogFooter
              className={'justify-between sm:justify-between flex-wrap gap-2'}>
              <DialogTrigger asChild>
                <Button size={'sm'} variant={'outline'}>
                  Clear All
                </Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <Button size={'sm'}>Show {40} places</Button>
              </DialogTrigger>
            </DialogFooter>
          </CardDescription>
        </Card>
      </ScrollArea>
    </div>
  );
}
