import { addDays } from 'date-fns';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

const defaultValues = {
  streetAddress: isDev ? '123 Main St, Apt 4B' : '',
  countryOrNation: {
    id: isDev ? 101 : undefined,
    name: isDev ? 'India' : undefined,
  },
  stateOrProvince: {
    id: isDev ? 4853 : undefined,
    name: isDev ? 'West Bengal' : undefined,
  },
  cityOrTown: {
    id: isDev ? 141942 : undefined,
    name: isDev ? 'Gangarampur' : undefined,
  },
  zipcode: isDev ? '733124' : '', // dont make undefined
  propertyArea: isDev ? '1250' : '',
  propertyAreaUnit: isDev ? 'sqft' : '',
  propertyDescription: isDev
    ? 'This is a beautiful room with all the amenities you need. It is located in the heart of the city and has a beautiful view of the mountains.'
    : '',

  propertyType: isDev ? 'cottage' : '',
  propertyOwnership: isDev ? 'co-ownership' : '',
  propertySwapping: isDev ? 'temporary swap' : '',
  propertyRentalTypes: isDev ? '1-year lease (long-term)' : '',
  propertySurrounding: isDev ? 'forest' : '',
  propertyEnvironment: isDev ? 'town' : '',

  // Optional fields
  propertyOwnerName: '',
  propertyOwnerEmail: '',
  // propertyOwnerPhone:isDev? '+91 99999-11111 ', // dont make undefined or ''
  propertyOwnerPhone: undefined,

  propertyBedRooms: isDev ? '4' : '', // dont make undefined
  propertyBathRooms: isDev ? '2' : '', // dont make undefined,
  numberOfGuests: isDev ? '3' : '', // dont make undefined
  numberOfBeds: isDev ? '2' : '', // dont make undefined
  hostLanguages: isDev ? ['hindi', 'bengali', 'english'] : undefined,
  propertyAccomodationType: isDev ? 'private room' : '',
  propertyAmenities: isDev
    ? [
        'wi-fi',
        'tv & streaming services',
        'work desk / home office space',
        'heating',
        'washing machine',
      ]
    : [],
  propertyRules: isDev
    ? [
        'respect the property',
        'no unauthorized guests',
        'alcohol consumption',
        'use appliances responsibly',
        'follow fire safety measures',
      ]
    : [],
  propertyAccessibilities: isDev
    ? [
        'step-free entrance',
        'ramp access',
        'lowered bed height',
        'adjustable bed',
        'grab bars',
      ]
    : [],
  staysDateRange: {
    from: isDev ? new Date() : undefined,
    to: isDev ? addDays(new Date(), 30) : undefined,
  },
  staysDurationInDays: isDev ? '30' : '',
  // propertyImages: isDev ? Array(6).fill('') : [],
  files: isDev ? [] : undefined, // temp. local files store for upload
  propertyImages: isDev
    ? [
        'https://res.cloudinary.com/rotate-key/image/upload/v1760424431/rotate-key/user_33y1OUU6Ie6UeFnYoaqZepY8H5V/my-property/IMG_20241226_155036.jpg.jpg',
        'https://res.cloudinary.com/rotate-key/image/upload/v1760424435/rotate-key/user_33y1OUU6Ie6UeFnYoaqZepY8H5V/my-property/IMG_20241226_155041.jpg.jpg',
        'https://res.cloudinary.com/rotate-key/image/upload/v1760424438/rotate-key/user_33y1OUU6Ie6UeFnYoaqZepY8H5V/my-property/IMG_20241226_155225.jpg.jpg',
      ]
    : [],
};

export default defaultValues;
