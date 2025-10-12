import { ErrorMessage } from '@hookform/error-message';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';
import {
  GetCity,
  GetCountries,
  GetRegions,
  GetState,
} from 'react-country-state-city';
import { useFormContext } from 'react-hook-form';

import type {
  City,
  Country,
  Region,
  State,
} from 'react-country-state-city/dist/esm/types';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { SignUpCompleteValues } from '@/lib/validations/auth.schema';

type CascadingType = Pick<Country | State | City, 'id' | 'name'>;
type ExtendedCountryByRegion = {
  region: string;
  hasCountries: boolean;
  countries: (Country & { flag: string })[];
};

export default function SignUpCompleteCascadingInputs() {
  const defaultValue = { id: 0, name: '' };
  // const [currentRegion, setCurrentRegion] =
  //   useState<CascadingType>(defaultValue);
  const [currentCountry, setCurrentCountry] =
    useState<CascadingType>(defaultValue);
  const [currentState, setcurrentState] = useState<CascadingType>(defaultValue);
  // const [currentCity, setCurrentCity] = useState<CascadingType>(defaultValue);
  // const [zipCode, setZipCode] = useState<string>('');

  // local states
  const [regionList, setRegionList] = useState<Region[]>([]);
  const [countriesList, setCountriesList] = useState<ExtendedCountryByRegion[]>(
    []
  );
  const [stateList, setStateList] = useState<State[]>([]);
  const [citiesList, setCitiesList] = useState<City[]>([]);

  // Transitions
  const [isRegionsPending, startRegionsTransition] = useTransition();
  const [isCountriesPending, startCountriesTransition] = useTransition();
  const [isStatesPending, startStatesTransition] = useTransition();
  const [isCitiesPending, startCitiesTransition] = useTransition();

  // if a country has states or not
  const [isStateAvailable, setIsStateAvailable] = useState<boolean>(false);
  // if a state has cities or not
  const [isCityAvailable, setIsCityAvailable] = useState<boolean>(false);

  const form = useFormContext<SignUpCompleteValues>();

  const { systemTheme } = useTheme();

  const watchFromLocation = form.watch('fromLocation');

  // Get all regions
  useEffect(() => {
    startRegionsTransition(async () => {
      try {
        if (watchFromLocation !== '') {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const result = await GetRegions();
          setRegionList(result);
        }
      } catch {
        console.log('Something went wrong during loading regions.');
      }
    });
  }, [setRegionList, watchFromLocation]);

  // Get all countries with flags
  useEffect(() => {
    startCountriesTransition(async () => {
      try {
        if (!isRegionsPending && regionList.length > 0) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const result = await GetCountries();
          const groupedCountries = regionList.map((region) => ({
            region: region.name,
            hasCountries: region.hasCountries,
            countries: result
              .filter((country) => country.region === region.name)
              .map((country) => ({
                ...country,
                flag: `https://flagcdn.com/16x12/${country.iso2.toLocaleLowerCase()}.png`,
              })),
          }));
          setCountriesList(groupedCountries);
        }
      } catch {
        console.log('Something went wrong during loading counties.');
      }
    });
  }, [regionList, isRegionsPending]);

  // Get all states of a country
  useEffect(() => {
    startStatesTransition(async () => {
      try {
        if (currentCountry && !isRegionsPending && !isCountriesPending) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const result = await GetState(currentCountry.id);
          setStateList(result);
        }
      } catch {
        console.log('Something went wrong during loading states.');
      }
    });
  }, [currentCountry, isRegionsPending, isCountriesPending]);

  // Get all cities of a state
  useEffect(() => {
    startCitiesTransition(async () => {
      try {
        if (
          currentCountry &&
          currentState &&
          !isRegionsPending &&
          !isCountriesPending &&
          !isStatesPending
        ) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const result = await GetCity(currentCountry.id, currentState.id);
          setCitiesList(result);
        }
      } catch {
        console.log('Something went wrong during loading cities.');
      }
    });
  }, [
    currentCountry,
    currentState,
    isRegionsPending,
    isCountriesPending,
    isStatesPending,
  ]);

  const isError =
    form.formState.errors.countryOrNation ||
    form.formState.errors.stateOrProvince ||
    form.formState.errors.cityOrTown;

  return (
    <div
      className={cn(
        'border-3 border-dashed rounded-lg p-4 space-y-4',
        isError ? 'border-destructive' : 'border-muted'
      )}>
      <Label className={'flex flex-wrap gap-1'}>
        <span className={cn(isError ? 'text-destructive' : '')}>
          To Location
        </span>
        <small className='italic font-normal text-muted-foreground'>
          (Where are you located now?)
        </small>
      </Label>

      <div className={'grid grid-cols-1 xl:grid-cols-2 gap-4'}>
        <FormField
          control={form.control}
          disabled={
            isRegionsPending || isCountriesPending || !watchFromLocation
          }
          name='countryOrNation'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'flex flex-wrap gap-1'}>
                <span>Country / Nation</span>
                <small className='italic font-normal text-muted-foreground'>
                  (Choose your country or nation)
                </small>
              </FormLabel>

              <FormControl>
                <Select
                  disabled={
                    isRegionsPending || isCountriesPending || !watchFromLocation
                  }
                  defaultValue={field.value.name ?? undefined}
                  onValueChange={(e) => {
                    const value = JSON.parse(e) as CascadingType;
                    setCurrentCountry(value);
                    field.onChange(value);

                    // setCountryIso(
                    //   countriesList
                    //     ?.find((group) =>
                    //       group.countries.find(
                    //         (country) => country.id === value.id
                    //       )
                    //     )
                    //     ?.countries.find((country) => country.id === value.id)
                    //     ?.iso2
                    // );

                    setIsStateAvailable(
                      countriesList
                        ?.find((group) =>
                          group.countries.find(
                            (country) => country.id === value.id
                          )
                        )
                        ?.countries.find((country) => country.id === value.id)
                        ?.hasStates || false
                    );
                  }}>
                  {isRegionsPending || isCountriesPending ? (
                    <Skeleton className='w-full h-9' />
                  ) : (
                    <SelectTrigger className='w-full disabled:cursor-not-allowed'>
                      <SelectValue placeholder='Select a country / nation' />
                    </SelectTrigger>
                  )}
                  <SelectContent>
                    {countriesList?.map((group) => (
                      <SelectGroup key={group.region}>
                        <SelectLabel>
                          <Badge
                            variant={
                              systemTheme === 'dark' ? 'secondary' : 'default'
                            }>
                            {group.region}
                          </Badge>
                        </SelectLabel>
                        <Separator />
                        {group.countries.map((_country) => (
                          <SelectItem
                            key={_country.id}
                            value={JSON.stringify({
                              id: _country.id,
                              name: _country.name,
                            })}>
                            <div className='flex items-center space-x-2'>
                              <Image
                                src={_country.flag}
                                alt={_country.name}
                                width={16}
                                height={12}
                              />
                              <span>{_country.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <ErrorMessage
                errors={form.formState.errors}
                name='countryOrNation.name'
                render={({ message }) => (
                  <p className={'text-xs font-medium text-destructive'}>
                    {message}
                  </p>
                )}
              />

              {/* {errors.countryOrNation?.name?.message && (
                <p className={'text-xs font-medium text-destructive'}>
                  {errors.countryOrNation.name.message}
                </p>
              )} */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={!isStateAvailable || isCountriesPending || isStatesPending}
          name='stateOrProvince'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'flex flex-wrap gap-1'}>
                <span>State / Province</span>
                <small className='italic font-normal text-muted-foreground'>
                  (Choose your state or province)
                </small>
              </FormLabel>

              <FormControl>
                <Select
                  disabled={
                    !isStateAvailable || isCountriesPending || isStatesPending
                  }
                  defaultValue={field.value.name ?? undefined}
                  onValueChange={(e) => {
                    // console.log(e.target.value);
                    // setcurrentState(Number(e.target.value));
                    const value = JSON.parse(e) as CascadingType;
                    setcurrentState(value);
                    field.onChange(value);
                    setIsCityAvailable(
                      stateList?.find((state) => state.id === value.id)
                        ?.hasCities || false
                    );
                  }}>
                  {isCountriesPending || isStatesPending ? (
                    <Skeleton className='w-full h-9' />
                  ) : (
                    <SelectTrigger className='w-full disabled:cursor-not-allowed'>
                      <SelectValue placeholder='Select a state / province' />
                    </SelectTrigger>
                  )}
                  {/* {isStatesLoading || isCountriesLoading ? (
                    <Skeleton className='w-full h-9' />
                  ) : (
                    <SelectTrigger className='w-full disabled:cursor-not-allowed'>
                      <SelectValue placeholder='Select a state / province' />
                    </SelectTrigger>
                  )} */}
                  <SelectContent>
                    {stateList?.map((_state) => (
                      <SelectGroup key={_state.id}>
                        <SelectLabel>
                          <Badge
                            variant={
                              systemTheme === 'dark' ? 'secondary' : 'default'
                            }>
                            Code: {_state.state_code}
                          </Badge>
                        </SelectLabel>
                        <Separator />

                        <SelectItem
                          value={JSON.stringify({
                            id: _state.id,
                            name: _state.name,
                          })}>
                          {_state.name}
                        </SelectItem>
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <ErrorMessage
                errors={form.formState.errors}
                name='stateOrProvince.name'
                render={({ message }) => (
                  <p className={'text-xs font-medium text-destructive'}>
                    {message}
                  </p>
                )}
              />

              {/* {errors.stateOrProvince?.name?.message && (
                <p className={'text-xs font-medium text-destructive'}>
                  {errors.stateOrProvince.name.message}
                </p>
              )} */}
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        // disabled={!isCityAvailable || !isStateAvailable}
        disabled={
          !isCityAvailable ||
          !isStateAvailable ||
          isStatesPending ||
          isCitiesPending
        }
        name='cityOrTown'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={'flex flex-wrap gap-1'}>
              <span>City / Town</span>
              <small className='italic font-normal text-muted-foreground'>
                (Choose your city or town)
              </small>
            </FormLabel>

            <FormControl>
              <Select
                disabled={!isCityAvailable || !isStateAvailable}
                defaultValue={field.value.name ?? undefined}
                onValueChange={(e) => {
                  // console.log(e.target.value);
                  // setCity(Number(e.target.value))
                  const value = JSON.parse(e) as CascadingType;
                  // setCurrentCity(value);
                  field.onChange(value);
                }}>
                {isRegionsPending ||
                isCountriesPending ||
                isStatesPending ||
                isCitiesPending ? (
                  <Skeleton className='w-full h-9' />
                ) : (
                  <SelectTrigger className='w-full disabled:cursor-not-allowed'>
                    <SelectValue placeholder='Select a city / town' />
                  </SelectTrigger>
                )}

                {/* {isRegionLoading ||
                isCountriesLoading ||
                isStatesLoading ||
                isCitiesLoading ? (
                  <Skeleton className='w-full h-9' />
                ) : (
                  <SelectTrigger className='w-full disabled:cursor-not-allowed'>
                    <SelectValue placeholder='Select a city / town' />
                  </SelectTrigger>
                )} */}
                <SelectContent>
                  {citiesList?.map((_city) => (
                    <SelectGroup key={_city.id}>
                      <SelectLabel>
                        <Badge
                          variant={
                            systemTheme === 'dark' ? 'secondary' : 'default'
                          }>
                          Code: {_city.id}
                        </Badge>
                      </SelectLabel>
                      <Separator />

                      <SelectItem
                        value={JSON.stringify({
                          id: _city.id,
                          name: _city.name,
                        })}>
                        {_city.name}
                      </SelectItem>
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>

            <ErrorMessage
              errors={form.formState.errors}
              name='cityOrTown.name'
              render={({ message }) => (
                <p className={'text-xs font-medium text-destructive'}>
                  {message}
                </p>
              )}
            />

            {/* {errors.cityOrTown?.name?.message && (
              <p className={'text-xs font-medium text-destructive'}>
                {errors.cityOrTown.name.message}
              </p>
            )} */}
          </FormItem>
        )}
      />
    </div>
  );
}
