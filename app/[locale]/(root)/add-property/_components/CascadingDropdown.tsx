'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AddPropertyFormValues } from '@/lib/validations/property.schema';
import { ErrorMessage } from '@hookform/error-message';
import { ChevronsDownIcon } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
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
import { Controller, useFormContext } from 'react-hook-form';
// import { HiChevronDoubleDown } from 'react-icons/hi2';

type CascadingType = Pick<Country | State | City, 'id' | 'name'>;
type ExtendedCountryByRegion = {
  region: string;
  hasCountries: boolean;
  countries: (Country & { flag: string })[];
};

export default function CascadingDropdown() {
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
    register,
  } = useFormContext<
    Pick<
      AddPropertyFormValues,
      'countryOrNation' | 'stateOrProvince' | 'cityOrTown' | 'zipcode'
    >
  >();

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
    <fieldset>
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <div>
          <label className={'block text-sm font-medium text-gray-700'}>
            Country / Nation
          </label>
          <p className={'block text-xs font-normal text-gray-700'}>
            Choose your relevant country
          </p>
          <div className='relative'>
            <Controller
              control={control}
              name='countryOrNation'
              defaultValue={defaultValue}
              render={({ field }) => (
                <select
                  // value={JSON.stringify(currentCountry)}
                  value={JSON.stringify(field.value)}
                  onChange={(e) => {
                    // setCountry(Number(e.target.value));
                    const value = JSON.parse(e.target.value) as CascadingType;
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
                  }}
                  name='country'
                  className={cn(
                    'mt-3 block w-full appearance-none rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-secondary-700',
                    'ring-1 ring-secondary-500',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-secondary-500',
                    // Make the text of each option black on Windows
                    '*:text-black'
                  )}>
                  <option value={JSON.stringify(defaultValue)}>
                    -- Select Country --
                  </option>
                  <hr />
                  {countriesList?.map((group) => (
                    <Fragment key={group.region}>
                      <optgroup label={group.region}>
                        {group.countries.map((_country) => (
                          <option
                            key={_country.id}
                            value={JSON.stringify({
                              id: _country.id,
                              name: _country.name,
                            })}>
                            {_country.name}
                          </option>
                        ))}
                      </optgroup>
                      <hr />
                    </Fragment>
                  ))}
                </select>
              )}
            />
            <ChevronsDownIcon
              className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-secondary-500 data-[hover]:rotate-180'
              aria-hidden='true'
            />
            <ErrorMessage
              errors={errors}
              name='countryOrNation'
              render={({ message }) => (
                <p className={'text-xs font-medium mt-2 text-brandRed-600'}>
                  {message}
                </p>
              )}
            />
          </div>
        </div>

        <div>
          <label className={'block text-sm font-medium text-gray-700'}>
            State / Province
          </label>
          <p className={'block text-xs font-normal text-gray-700'}>
            Choose your relevant state
          </p>
          <div className='relative'>
            <Controller
              control={control}
              name='stateOrProvince'
              defaultValue={defaultValue}
              render={({ field }) => (
                <select
                  disabled={!isStateAvailable}
                  // value={JSON.stringify(currentState)}
                  value={JSON.stringify(field.value)}
                  onChange={(e) => {
                    // console.log(e.target.value);
                    // setcurrentState(Number(e.target.value));
                    const value = JSON.parse(e.target.value) as CascadingType;
                    setcurrentState(value);
                    field.onChange(value);
                    setIsCityAvailable(
                      stateList?.find((state) => state.id === value.id)
                        ?.hasCities || false
                    );
                  }}
                  name='state'
                  className={cn(
                    'mt-3 block w-full appearance-none rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-secondary-700',
                    'ring-1 ring-secondary-500',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-secondary-500',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    // Make the text of each option black on Windows
                    '*:text-black'
                  )}>
                  <option value={JSON.stringify(defaultValue)}>
                    -- Select State --
                  </option>
                  {stateList?.map((_state) => (
                    <option
                      key={_state.id}
                      value={JSON.stringify({
                        id: _state.id,
                        name: _state.name,
                      })}>
                      {_state.name}
                    </option>
                  ))}
                </select>
              )}
            />
            <ChevronsDownIcon
              className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-secondary-500 disabled:opacity-50'
              aria-hidden='true'
            />
          </div>
          <p className={'text-xs text-primary-500 font-medium mt-2'}>
            {currentCountry.id > 0 && !isStateAvailable
              ? 'This country does not have states'
              : null}
          </p>
          <ErrorMessage
            errors={errors}
            name='state'
            render={({ message }) => (
              <p className={'text-xs font-medium mt-2 text-brandRed-600'}>
                {message}
              </p>
            )}
          />
        </div>

        <div>
          <label className={'block text-sm font-medium text-gray-700'}>
            City / District
          </label>
          <p className={'block text-xs font-normal text-gray-700'}>
            Choose your relevant city
          </p>
          <div className='relative'>
            <Controller
              control={control}
              name='cityOrTown'
              defaultValue={defaultValue}
              render={({ field }) => (
                <>
                  <select
                    disabled={!isCityAvailable || !isStateAvailable}
                    // value={JSON.stringify(currentCity)}
                    value={JSON.stringify(field.value)}
                    onChange={(e) => {
                      // console.log(e.target.value);
                      // setCity(Number(e.target.value))
                      const value = JSON.parse(e.target.value) as CascadingType;
                      // setCurrentCity(value);
                      field.onChange(value);
                    }}
                    name='city'
                    className={cn(
                      'mt-3 block w-full appearance-none rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-secondary-700',
                      'ring-1 ring-secondary-500',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-secondary-500',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      // Make the text of each option black on Windows
                      '*:text-black'
                    )}>
                    <option value={JSON.stringify(defaultValue)}>
                      -- Select City --
                    </option>
                    {citiesList?.map((_city) => (
                      <option
                        key={_city.id}
                        value={JSON.stringify({
                          id: _city.id,
                          name: _city.name,
                        })}>
                        {_city.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
            <ChevronsDownIcon
              className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-secondary-500 data-[hover]:rotate-180'
              aria-hidden='true'
            />
          </div>
          <p className={'text-sm text-primary-500 font-medium'}>
            {currentState.id >= 1 && !isCityAvailable
              ? 'This state does not have cities'
              : null}
          </p>
        </div>

        <div>
          <label
            htmlFor='zipcode'
            className={'block text-sm font-medium text-gray-700'}>
            ZipCode / Postal Code
          </label>
          <p className={'block text-xs font-normal text-gray-700'}>
            Enter your postal code
          </p>
          <Input
            type='text'
            // name='zipcode'
            id='zipcode'
            placeholder='Enter your postal code'
            autoComplete='postal-code'
            // value={zipCode}
            // onChange={(e) => setZipCode(e.target.value)}
            {...register('zipcode')}
            className={cn(
              'mt-3 block w-full rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-secondary-700',
              'ring-1 ring-secondary-500',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-secondary-500',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            disabled={!countryIso || !isCityAvailable || !isStateAvailable}
          />
          <ErrorMessage
            errors={errors}
            name='zipcode'
            render={({ message }) => (
              <p className={'text-xs font-medium mt-2 text-brandRed-600'}>
                {message}
              </p>
            )}
          />
        </div>
      </div>
    </fieldset>
  );
}
