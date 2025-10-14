import Image from 'next/image';

export default function RecentlyLikedProperties() {
  return (
    <div className={'space-y-2 md:space-y-4 px-2'}>
      <h3 className={'text-base font-medium text-primary-500 text-center'}>
        Recently Liked Properties
      </h3>
      <div className={'flex items-center gap-2'}>
        <Image
          src={'/profile/liked-user.jpg'}
          alt='Liked user'
          width={100}
          height={100}
          className={'rounded-full size-8 object-cover'}
        />
        <p className={'text-sm font-semibold'}>User 1</p>
      </div>
      <div className={'flex items-center gap-2'}>
        <Image
          src={'/profile/liked-user.jpg'}
          alt='Liked user'
          width={100}
          height={100}
          className={'rounded-full size-8 object-cover'}
        />
        <p className={'text-sm font-semibold'}>User 2</p>
      </div>
      <div className={'flex items-center gap-2'}>
        <Image
          src={'/profile/liked-user.jpg'}
          alt='Liked user'
          width={100}
          height={100}
          className={'rounded-full size-8 object-cover'}
        />
        <p className={'text-sm font-semibold'}>User 3</p>
      </div>
    </div>
  );
}
