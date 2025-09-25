import { BiLoaderAlt } from 'react-icons/bi';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={'h-dvh grid place-items-center'}>
      <BiLoaderAlt className={'size-4 md:size-6 lg:size-8 animate-spin'} />
    </div>
  );
}
