import { MultiSelect } from '@/components/extension/multi-select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  hostLanguages,
  propertyBathRooms,
  propertyBedRooms,
  propertyBeds,
  propertyGuests,
} from '@/constants';
import { AddPropertyFormValues } from '@/lib/validations/property.schema';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

const languages = hostLanguages.map((lang) => {
  return {
    label: lang.language,
    value: lang.language,
    flag: lang.flag,
  };
});

export default function PropertyAdditionalInfomationFields() {
  const {
    control,
    formState: { errors },
  } =
    useFormContext<
      Pick<
        AddPropertyFormValues,
        | 'propertyBedRooms'
        | 'propertyBathRooms'
        | 'numberOfBeds'
        | 'numberOfGuests'
        | 'hostLanguages'
      >
    >();

  return (
    <>
      <FormField
        control={control}
        name='propertyBedRooms'
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many bedrooms do you have ?</FormLabel>
            <FormControl>
              <RadioGroup
                orientation='horizontal'
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={'flex flex-wrap gap-y-4'}>
                {propertyBedRooms.map((bedRoom) => (
                  <FormItem key={bedRoom.id} className={'grid-cols-[auto_1fr]'}>
                    <FormControl>
                      <Label
                        htmlFor={`bedroom-${bedRoom.id}`}
                        className='border border-primary-600 cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-primary-100 dark:[&:has(:checked)]:bg-primary-600 [&:has(:checked)]:ring-primary-400 [&:has(:checked)]:ring-1'>
                        <RadioGroupItem
                          id={`bedroom-${bedRoom.id}`}
                          value={String(bedRoom.value)}
                        />
                        {bedRoom.value}
                      </Label>
                    </FormControl>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <ErrorMessage
              errors={errors.propertyBedRooms}
              name='propertyBedRooms'
              render={({ message }) => (
                <p className={'text-xs font-medium text-destructive'}>
                  {message}
                </p>
              )}
            />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='propertyBathRooms'
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many bathrooms do you have ?</FormLabel>
            <FormControl>
              <RadioGroup
                orientation='horizontal'
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={'flex flex-wrap gap-y-4'}>
                {propertyBathRooms.map((bathRoom) => (
                  <FormItem
                    key={bathRoom.id}
                    className={'grid-cols-[auto_1fr]'}>
                    <FormControl>
                      <Label
                        htmlFor={`bathroom-${bathRoom.id}`}
                        className='border border-primary-600 cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-primary-100 dark:[&:has(:checked)]:bg-primary-600 [&:has(:checked)]:ring-primary-400 [&:has(:checked)]:ring-1'>
                        <RadioGroupItem
                          id={`bathroom-${bathRoom.id}`}
                          value={String(bathRoom.value)}
                        />
                        {bathRoom.value}
                      </Label>
                    </FormControl>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <ErrorMessage
              errors={errors.propertyBathRooms}
              name='propertyBathRooms'
              render={({ message }) => (
                <p className={'text-xs font-medium text-destructive'}>
                  {message}
                </p>
              )}
            />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='numberOfBeds'
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many beds do you have ?</FormLabel>
            <FormControl>
              <RadioGroup
                orientation='horizontal'
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={'flex flex-wrap gap-y-4'}>
                {propertyBeds.map((bed) => (
                  <FormItem key={bed.id} className={'grid-cols-[auto_1fr]'}>
                    <FormControl>
                      <Label
                        htmlFor={`bed-${bed.id}`}
                        className='border border-primary-600 cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-primary-100 dark:[&:has(:checked)]:bg-primary-600 [&:has(:checked)]:ring-primary-400 [&:has(:checked)]:ring-1'>
                        <RadioGroupItem
                          id={`bed-${bed.id}`}
                          value={String(bed.value)}
                        />
                        {bed.value}
                      </Label>
                    </FormControl>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <ErrorMessage
              errors={errors.numberOfBeds}
              name='numberOfBeds'
              render={({ message }) => (
                <p className={'text-xs font-medium text-destructive'}>
                  {message}
                </p>
              )}
            />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='numberOfGuests'
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many guests can stay in your property ?</FormLabel>
            <FormControl>
              <RadioGroup
                orientation='horizontal'
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={'flex flex-wrap gap-y-4'}>
                {propertyGuests.map((guest) => (
                  <FormItem key={guest.id} className={'grid-cols-[auto_1fr]'}>
                    <FormControl>
                      <Label
                        htmlFor={`guest-${guest.id}`}
                        className='border border-primary-600 cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-primary-100 dark:[&:has(:checked)]:bg-primary-600 [&:has(:checked)]:ring-primary-400 [&:has(:checked)]:ring-1'>
                        <RadioGroupItem
                          id={`guest-${guest.id}`}
                          value={String(guest.value)}
                        />
                        {guest.value}
                      </Label>
                    </FormControl>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <ErrorMessage
              errors={errors.numberOfGuests}
              name='numberOfGuests'
              render={({ message }) => (
                <p className={'text-xs font-medium text-destructive'}>
                  {message}
                </p>
              )}
            />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='hostLanguages'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={'flex flex-wrap gap-1'}>
              <span>Select your preferred languages</span>
              <small className='italic font-normal text-muted-foreground'>
                (Mention the languages your host know.)
              </small>
            </FormLabel>
            <FormControl>
              <MultiSelect
                commandClassName='min-w-4xl capitalize'
                options={languages}
                onValueChange={field.onChange}
                defaultValue={field.value}
                placeholder='Select languages'
                variant='inverted'
                animation={0}
                maxCount={3}
              />
            </FormControl>
            <FormMessage className={'text-xs font-medium text-destructive'} />
          </FormItem>
        )}
      />
    </>
  );
}
