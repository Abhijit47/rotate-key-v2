'use client';

import { AsyncSelect } from '@/components/blocks/async-select';
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

type CascadingType = Pick<Country | State | City, 'id' | 'name'>;
type ExtendedCountryByRegion = {
  region: string;
  hasCountries: boolean;
  countries: (Country & { flag: string })[];
};

export default function CascadingDropdownAsync() {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stateList, setStateList] = useState<State[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [citiesList, setCitiesList] = useState<City[]>([]);
  const [regionList, setRegionList] = useState<Region[]>([]);

  // not removable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [countryIso, setCountryIso] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isStateAvailable, setIsStateAvailable] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCityAvailable, setIsCityAvailable] = useState<boolean>(false);

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
    <div className={'grid grid-cols-3 gap-4'}>
      {/* <AsyncSelect<Country & { flag: string }> */}
      <AsyncSelect<ExtendedCountryByRegion>
        fetcher={async (inputValue) => {
          // const countries = await GetCountries(inputValue);
          // return countries.map((country) => ({
          //   ...country,
          //   flag: `https://flagcdn.com/160x120/${country.iso2.toLocaleLowerCase()}.png`,
          // }));
          if (!inputValue) return countriesList;

          const groupedCountries = countriesList.map((region) => ({
            region: region.region,
            hasCountries: region.hasCountries,
            countries: region.countries.filter((country) =>
              country.name.toLowerCase().includes(inputValue.toLowerCase())
            ),
          }));

          // console.log({ groupedCountries });
          return groupedCountries.filter(
            (region) => region.countries.length > 0
          );
        }}
        preload={true}
        filterFn={(country, query) => {
          // return country.name.toLowerCase().includes(query.toLowerCase());
          return country.countries.some((country) =>
            country.name.toLowerCase().includes(query.toLowerCase())
          );
        }}
        renderOption={(country) => {
          return (
            <>
              {country.hasCountries &&
                country.countries.map((country) => (
                  <div className='flex items-center gap-2' key={country.id}>
                    <div className={'size-6'}>
                      <Image
                        src={country.flag}
                        alt={country.name}
                        width={24}
                        height={24}
                        className='rounded-full w-full h-full object-contain'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <div className='font-medium'>{country.name}</div>
                      <div className='text-xs text-muted-foreground'>
                        {country.region}
                      </div>
                    </div>
                  </div>
                ))}
            </>
          );
        }}
        getOptionValue={(country) => {
          // currentCountry.id = country.id;
          return String(country.countries[0].id);
        }}
        getDisplayValue={(country) => {
          return (
            <>
              {country.hasCountries &&
                country.countries.map((country) => (
                  <div
                    className='flex items-center gap-2 text-left'
                    key={country.id}>
                    <div className={'size-6'}>
                      <Image
                        src={country.flag}
                        alt={country.name}
                        width={24}
                        height={24}
                        className='rounded-full w-full h-full object-contain'
                      />
                    </div>
                    <div className='flex flex-col leading-tight'>
                      <div className='font-medium'>{country.name}</div>
                      <div className='text-xxs text-muted-foreground'>
                        {country.region}
                      </div>
                    </div>
                  </div>
                ))}
            </>
          );
        }}
        notFound={
          <div className='py-6 text-center text-sm'>No countries found</div>
        }
        label='Search countries'
        placeholder='Search countries...'
        loadingSkeleton={
          <div className='py-6 text-center text-sm'>Loading countries...</div>
        }
        value={currentCountry.name}
        onChange={(e) => {
          const value = JSON.parse(e) as CascadingType;
          setCurrentCountry(value);
        }}
        width='100%'
      />

      <AsyncSelect<State>
        fetcher={async (inputValue) => {
          if (currentCountry) {
            const states = await GetState(currentCountry.id, inputValue);
            return states;
          }
          return [] as State[];
        }}
        disabled={!currentCountry}
        preload={true}
        filterFn={(state, query) => {
          return state.name.toLowerCase().includes(query.toLowerCase());
        }}
        renderOption={(state) => (
          <div className='flex items-center gap-2'>
            {/* <div className={'size-6'}>
                        <Image
                          src={country.flag}
                          alt={country.name}
                          width={24}
                          height={24}
                          className='rounded-full w-full h-full object-contain'
                        />
                      </div> */}
            <div className='flex flex-col'>
              <div className='font-medium'>{state.name}</div>
              <div className='text-xs text-muted-foreground'>
                {state.state_code}
              </div>
            </div>
          </div>
        )}
        getOptionValue={(state) => String(state.id)}
        getDisplayValue={(state) => (
          <div className='flex items-center gap-2 text-left'>
            {/* <div className={'size-6'}>
                        <Image
                          src={country.flag}
                          alt={country.name}
                          width={24}
                          height={24}
                          className='rounded-full w-full h-full object-contain'
                        />
                      </div> */}
            <div className='flex flex-col leading-tight'>
              <div className='font-medium'>{state.name}</div>
              <div className='text-xxs text-muted-foreground'>
                {state.state_code}
              </div>
            </div>
          </div>
        )}
        notFound={
          <div className='py-6 text-center text-sm'>No states found</div>
        }
        label='Search states'
        placeholder='Search states...'
        value={currentState.name}
        onChange={(e) => {
          const value = JSON.parse(e) as CascadingType;
          setcurrentState(value);
        }}
        width='100%'
      />

      <AsyncSelect<City>
        fetcher={async (inputValue) => {
          if (currentState && currentCountry) {
            const cities = await GetCity(
              currentCountry.id,
              currentState.id,
              inputValue
            );
            return cities;
          }
          return [] as City[];
        }}
        disabled={!currentCountry}
        preload={true}
        filterFn={(city, query) => {
          return city.name.toLowerCase().includes(query.toLowerCase());
        }}
        renderOption={(city) => (
          <div className='flex items-center gap-2'>
            {/* <div className={'size-6'}>
                        <Image
                          src={country.flag}
                          alt={country.name}
                          width={24}
                          height={24}
                          className='rounded-full w-full h-full object-contain'
                        />
                      </div> */}
            <div className='flex flex-col'>
              <div className='font-medium'>{city.name}</div>
              <div className='text-xs text-muted-foreground'>
                {city.latitude} {city.longitude}
              </div>
            </div>
          </div>
        )}
        getOptionValue={(city) => String(city.id)}
        getDisplayValue={(city) => (
          <div className='flex items-center gap-2 text-left'>
            {/* <div className={'size-6'}>
                        <Image
                          src={country.flag}
                          alt={country.name}
                          width={24}
                          height={24}
                          className='rounded-full w-full h-full object-contain'
                        />
                      </div> */}
            <div className='flex flex-col leading-tight'>
              <div className='font-medium'>{city.name}</div>
              <div className='text-xxs text-muted-foreground'>
                {city.latitude} {city.longitude}
              </div>
            </div>
          </div>
        )}
        notFound={<div className='py-6 text-center text-sm'>No city found</div>}
        label='Search city'
        placeholder='Search city...'
        value={currentState.name}
        onChange={(e) => {
          const value = JSON.parse(e) as CascadingType;
          console.log({ value });
        }}
        width='100%'
      />
    </div>
  );
}
