// import { Tab, TabGroup, TabList } from '@headlessui/react';

// import Image from 'next/image';

// import { useRef, useState } from 'react';

// import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2';

// import { A11y, Autoplay, Scrollbar } from 'swiper/modules';
// import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
// import RoomsCategoryTabPanel from './RoomsCategoryTabPanel';
// import SectionWrapper from './SectionWrapper';

// export default function RoomsCategoryTab(props: RoomsCategoryTabProps) {
//   const { roomsCategories } = props;

//   const [roomsCategory, setRoomsCategory] = useState(roomsCategories);
//   const swiperRef = useRef<SwiperRef>(null);

//   function handlePrevSlide() {
//     if (swiperRef.current) {
//       swiperRef.current.swiper.slidePrev();
//     }
//   }

//   function handleNextSlide() {
//     if (swiperRef.current) {
//       swiperRef.current.swiper.slideNext();
//     }
//   }

//   function handleShuffleRooms() {
//     setRoomsCategory((prevData) => {
//       const shuffledData = prevData.map((data) => {
//         return {
//           ...data,
//           rooms: data.rooms.sort(() => Math.random() - 0.5),
//         };
//       });
//       return shuffledData;
//     });
//   }

//   return (
//     <section className=''>
//       <SectionWrapper className={'space-y-8'}>
//         <div className='w-full'>
//           <TabGroup>
//             <div className='flex items-center gap-4'>
//               <button
//                 onClick={handlePrevSlide}
//                 className={'rounded-full px-2 py-2 shadow-md hover:shadow'}>
//                 <span className={'sr-only'}>prev</span>
//                 <HiChevronDoubleLeft className={'size-4 md:size-6'} />
//               </button>
//               <Swiper
//                 modules={[Autoplay, A11y, Scrollbar]}
//                 spaceBetween={10}
//                 slidesPerView={1.1}
//                 // autoplay={{
//                 //   delay: 3000,
//                 //   disableOnInteraction: true,
//                 // }}
//                 scrollbar={{
//                   draggable: true,
//                   hide: true,
//                   snapOnRelease: true,
//                 }}
//                 breakpoints={{
//                   320: {
//                     slidesPerView: 2.1,
//                     spaceBetween: 20,
//                   },
//                   480: {
//                     slidesPerView: 3.1,
//                     spaceBetween: 20,
//                   },
//                   576: {
//                     slidesPerView: 4.1,
//                     spaceBetween: 20,
//                   },
//                   640: {
//                     slidesPerView: 5.1,
//                     spaceBetween: 20,
//                   },
//                   768: {
//                     slidesPerView: 6.1,
//                     spaceBetween: 20,
//                   },
//                   992: {
//                     slidesPerView: 7.1,
//                     spaceBetween: 20,
//                   },
//                   1024: {
//                     slidesPerView: 8.1,
//                     spaceBetween: 20,
//                   },
//                   1280: {
//                     slidesPerView: 9.1,
//                     spaceBetween: 20,
//                   },
//                   1536: {
//                     slidesPerView: 10,
//                     spaceBetween: 20,
//                   },
//                 }}
//                 grabCursor={true}
//                 loop={true}
//                 rewind={true}
//                 edgeSwipeDetection={true}
//                 draggable={true}
//                 followFinger={true}
//                 touchReleaseOnEdges={true}
//                 simulateTouch={true}
//                 ref={swiperRef}>
//                 <TabList className='flex items-center gap-4'>
//                   {roomsCategory.map(({ id, name, tabLogo }) => (
//                     <SwiperSlide key={id} className={'h-full w-full pb-4'}>
//                       <Tab
//                         as={'button'}
//                         className='rounded-2xl h-full w-full px-1 py-1 bg-tertiary-50 text-sm font-semibold text-secondary-700 focus:outline-none data-[selected]:bg-secondary-100 data-[hover]:bg-secondary-100/50 data-[selected]:data-[hover]:bg-secondary-200/50 data-[focus]:outline-1 data-[focus]:outline-secondary-300/50 inline-flex flex-col items-center justify-center gap-1 md:gap-2 aspect-square'
//                         onClick={handleShuffleRooms}>
//                         <span
//                           className={
//                             'size-6 md:size-8 lg:size-10 mx-auto block'
//                           }>
//                           <Image
//                             src={tabLogo}
//                             alt={name}
//                             width={40}
//                             height={40}
//                             className={'w-full h-full object-contain'}
//                           />
//                         </span>
//                         <span>{name}</span>
//                       </Tab>
//                     </SwiperSlide>
//                   ))}
//                 </TabList>
//                 {/* <RoomsTabList roomsCategory={roomsCategory} onShuffleRooms={handleShuffleRooms} /> */}
//               </Swiper>
//               <button
//                 onClick={handleNextSlide}
//                 className={'rounded-full px-2 py-2 shadow-md hover:shadow'}>
//                 <span className={'sr-only'}>prev</span>
//                 <HiChevronDoubleRight className={'size-4 md:size-6'} />
//               </button>
//             </div>
//             <RoomsCategoryTabPanel roomsCategory={roomsCategory} />
//           </TabGroup>
//         </div>
//       </SectionWrapper>
//     </section>
//   );
// }
