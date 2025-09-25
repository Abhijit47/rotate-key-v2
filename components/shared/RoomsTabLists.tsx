// import { Tab, TabList } from '@headlessui/react';
// import Image from 'next/image';
// import { SwiperSlide } from 'swiper/react';

// export default function RoomsTabLists(props: RoomsTabListProps) {
//   const { roomsCategory, onShuffleRooms } = props;

//   return (
//     <TabList className='flex items-center gap-4'>
//       {roomsCategory.map(({ id, name, tabLogo }) => (
//         <SwiperSlide key={id} className={'h-full w-full pb-4'}>
//           <Tab
//             as={'button'}
//             className='rounded-2xl h-full w-full px-1 py-1 bg-tertiary-50 text-sm font-semibold text-secondary-700 focus:outline-none data-[selected]:bg-secondary-100 data-[hover]:bg-secondary-100/50 data-[selected]:data-[hover]:bg-secondary-200/50 data-[focus]:outline-1 data-[focus]:outline-secondary-300/50 inline-flex flex-col items-center justify-center gap-1 md:gap-2 aspect-square'
//             onClick={onShuffleRooms}>
//             <span className={'size-6 md:size-8 lg:size-10 mx-auto block'}>
//               <Image
//                 src={tabLogo}
//                 alt={name}
//                 width={40}
//                 height={40}
//                 className={'w-full h-full object-contain'}
//               />
//             </span>
//             <span>{name}</span>
//           </Tab>
//         </SwiperSlide>
//       ))}
//     </TabList>
//   );
// }
