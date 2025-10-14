import Image from 'next/image';

export default function PropertiesOnHolds() {
  return (
    <div className={'space-y-2 md:space-y-4 px-2'}>
      <h3 className={'text-base font-medium text-primary-500 text-center'}>
        Properties on Hold
      </h3>
      <div className={'flex items-center gap-2'}>
        <Image
          src={'/swapping/swapping-card-1.jpg'}
          alt='Liked user'
          width={100}
          height={100}
          className={'rounded-full size-8 object-cover'}
        />
        <p className={'text-sm font-semibold'}>Property 1</p>
      </div>
      <div className={'flex items-center gap-2'}>
        <Image
          src={'/swapping/swapping-card-2.png'}
          alt='Liked user'
          width={100}
          height={100}
          className={'rounded-full size-8 object-cover'}
        />
        <p className={'text-sm font-semibold'}>Property 2</p>
      </div>
      <div className={'flex items-center gap-2'}>
        <Image
          src={'/swapping/swapping-card-3.png'}
          alt='Liked user'
          width={100}
          height={100}
          className={'rounded-full size-8 object-cover'}
        />
        <p className={'text-sm font-semibold'}>Property 3</p>
      </div>
    </div>
  );
}
