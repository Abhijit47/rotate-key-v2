// import { TabPanel, TabPanels } from '@headlessui/react';
// import Image from 'next/image';
// import { GiRoad } from 'react-icons/gi';
// import { HiCalendar, HiMapPin } from 'react-icons/hi2';

// type RoomsCategoryTabPanelProps = {
//   roomsCategory: RoomsCategoryData[];
// };

// export default function RoomsCategoryTabPanel(
//   props: RoomsCategoryTabPanelProps
// ) {
//   const { roomsCategory } = props;

//   return (
//     <TabPanels className='mt-3'>
//       {roomsCategory.map(({ id, rooms }) => (
//         <TabPanel
//           key={id}
//           className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>
//           {rooms.map((room) => (
//             <div
//               key={room.id}
//               className='rounded-xl ring-1 ring-primary-500 bg-white/5 p-3 text-secondary-500'>
//               <div className='relative aspect-w-16 aspect-h-9'>
//                 <div className='absolute inset-0 bg-white/10 rounded-xl' />
//                 <div className={'aspect-square h-full w-full'}>
//                   <Image
//                     src={room.images[0]}
//                     alt={room.title}
//                     width={500}
//                     height={500}
//                     className='rounded-xl w-full h-full'
//                   />
//                 </div>
//               </div>
//               <div className='mt-3 inline-grid w-full h-fit gap-2'>
//                 <div className={'inline-flex items-center justify-between'}>
//                   <h3 className='font-semibold text-secondary-500'>
//                     {room.title}
//                   </h3>
//                   <p className='text-sm/6'>{room.rating}</p>
//                 </div>

//                 <div className={'inline-grid gap-2'}>
//                   <p className='text-sm/6 inline-flex items-center gap-1'>
//                     <span>
//                       <HiMapPin className='size-4 md:size-6 inline-block' />
//                     </span>
//                     <span>{room.roomlocation}</span>
//                   </p>
//                   <p className='text-sm/6 inline-flex items-center gap-1'>
//                     <span>
//                       <GiRoad className='size-4 md:size-6 inline-block' />
//                     </span>
//                     <span>{room.userLocation}</span>
//                   </p>
//                   <p className='text-sm/6 inline-flex items-center gap-1'>
//                     <span>
//                       <HiCalendar className='size-4 md:size-6 inline-block' />
//                     </span>
//                     <span>{room.date}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </TabPanel>
//       ))}
//     </TabPanels>
//   );
// }
