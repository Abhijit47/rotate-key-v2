import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  GetCity,
  GetCountries,
  GetRegions,
  GetState,
} from 'react-country-state-city';
import {
  City,
  Country,
  Region,
  State,
} from 'react-country-state-city/dist/esm/types';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import { AddPropertyFormValues } from '@/lib/validations/property.schema';
import { useTheme } from 'next-themes';

type CascadingType = Pick<Country | State | City, 'id' | 'name'>;
type ExtendedCountryByRegion = {
  region: string;
  hasCountries: boolean;
  countries: (Country & { flag: string })[];
};

export default function CascadingInputs() {
  const defaultValue = { id: 0, name: '' };
  // const [currentRegion, setCurrentRegion] =
  //   useState<CascadingType>(defaultValue);
  const [currentCountry, setCurrentCountry] =
    useState<CascadingType>(defaultValue);
  const [currentState, setcurrentState] = useState<CascadingType>(defaultValue);
  // const [currentCity, setCurrentCity] = useState<CascadingType>(defaultValue);
  // const [zipCode, setZipCode] = useState<string>('');

  // remaining stays
  const [countriesList, setCountriesList] = useState<ExtendedCountryByRegion[]>(
    []
  );
  const [stateList, setStateList] = useState<State[]>([]);
  const [citiesList, setCitiesList] = useState<City[]>([]);
  const [regionList, setRegionList] = useState<Region[]>([]);

  // not removable
  const [countryIso, setCountryIso] = useState<string>();
  const [isStateAvailable, setIsStateAvailable] = useState<boolean>(false);
  const [isCityAvailable, setIsCityAvailable] = useState<boolean>(false);

  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<
    Pick<
      AddPropertyFormValues,
      | 'streetAddress'
      | 'countryOrNation'
      | 'stateOrProvince'
      | 'cityOrTown'
      | 'zipcode'
    >
  >();

  const { systemTheme } = useTheme();

  // Get all regions
  useEffect(() => {
    GetRegions().then((result) => {
      setRegionList(result);
    });
  }, []);

  // Get all countries with flags
  useEffect(() => {
    GetCountries().then((result) => {
      // group countries by region and add flag
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

      // alternative way to group countries by region Object.groupBy
      // const grp = Object.groupBy(result, (country) => country.region);
      // console.log({ grp });

      // console.log({ groupedCountries });
      setCountriesList(groupedCountries);
      // const countries = result.map((country) => ({
      //   ...country,
      //   flag: `https://flagcdn.com/16x12/${country.iso2.toLocaleLowerCase()}.png`,
      // }));

      // setCountriesList(
      //   result.map((country) => ({
      //     ...country,
      //     flag: `https://flagcdn.com/16x12/${country.iso2.toLocaleLowerCase()}.png`,
      //   }))
      // );
    });
  }, [regionList]);

  // Get all states of a country
  useEffect(() => {
    if (currentCountry)
      GetState(currentCountry.id).then((result) => {
        setStateList(result);
      });
  }, [currentCountry]);

  // Get all cities of a state
  useEffect(() => {
    if (currentState && currentCountry)
      GetCity(currentCountry.id, currentState.id).then((result) => {
        setCitiesList(result);
      });
  }, [currentState, currentCountry]);

  return (
    <>
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <FormField
          control={control}
          disabled={watch('streetAddress') === ''}
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
                  disabled={watch('streetAddress') === ''}
                  defaultValue={field.value.name}
                  onValueChange={(e) => {
                    const value = JSON.parse(e) as CascadingType;
                    setCurrentCountry(value);
                    field.onChange(value);

                    setCountryIso(
                      countriesList
                        ?.find((group) =>
                          group.countries.find(
                            (country) => country.id === value.id
                          )
                        )
                        ?.countries.find((country) => country.id === value.id)
                        ?.iso2
                    );

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
                  <SelectTrigger className='w-full disabled:cursor-not-allowed'>
                    <SelectValue placeholder='Select a country / nation' />
                  </SelectTrigger>
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

              {errors.countryOrNation?.name?.message && (
                <p className={'text-xs font-medium text-destructive'}>
                  {errors.countryOrNation.name.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          disabled={!isStateAvailable}
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
                  disabled={!isStateAvailable}
                  defaultValue={field.value.name}
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
                  <SelectTrigger className='w-full disabled:cursor-not-allowed'>
                    <SelectValue placeholder='Select a state / province' />
                  </SelectTrigger>
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

              {errors.stateOrProvince?.name?.message && (
                <p className={'text-xs font-medium text-destructive'}>
                  {errors.stateOrProvince.name.message}
                </p>
              )}
            </FormItem>
          )}
        />
      </div>

      <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <FormField
          control={control}
          disabled={!isCityAvailable || !isStateAvailable}
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
                  defaultValue={field.value.name}
                  onValueChange={(e) => {
                    // console.log(e.target.value);
                    // setCity(Number(e.target.value))
                    const value = JSON.parse(e) as CascadingType;
                    // setCurrentCity(value);
                    field.onChange(value);
                  }}>
                  <SelectTrigger className='w-full disabled:cursor-not-allowed'>
                    <SelectValue placeholder='Select a city / town' />
                  </SelectTrigger>
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

              {errors.cityOrTown?.name?.message && (
                <p className={'text-xs font-medium text-destructive'}>
                  {errors.cityOrTown.name.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='zipcode'
          disabled={!countryIso || !isCityAvailable || !isStateAvailable}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'flex flex-wrap gap-1'}>
                <span>Zipcode / Postal Code</span>
                <small className='italic font-normal text-muted-foreground'>
                  (Your area postal code)
                </small>
              </FormLabel>

              <FormControl className='disabled:cursor-not-allowed'>
                <Input
                  type='text'
                  // name='zipcode'
                  id='zipcode'
                  className='disabled:cursor-not-allowed'
                  placeholder='Enter your postal code'
                  autoComplete='postal-code'
                  {...field}
                  disabled={
                    !countryIso || !isCityAvailable || !isStateAvailable
                  }
                />
              </FormControl>

              <ErrorMessage
                errors={errors.zipcode}
                name='zipcode'
                render={({ message }) => (
                  <p className={'text-xs font-medium text-destructive'}>
                    {message}
                  </p>
                )}
              />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
