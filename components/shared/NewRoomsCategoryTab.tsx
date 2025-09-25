import Image from 'next/image';
import { useRef, useState } from 'react';
// import { GiRoad } from 'react-icons/gi';
// import {
//   HiCalendar,
//   HiChevronDoubleLeft,
//   HiChevronDoubleRight,
//   HiMapPin,
// } from 'react-icons/hi2';
import { A11y, Autoplay, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconRoad } from '@tabler/icons-react';
import {
  CalendarClockIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MapIcon,
} from 'lucide-react';
import { AspectRatio } from '../ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import SectionWrapper from './SectionWrapper';

const swiperOptions: SwiperOptions = {
  modules: [Autoplay, A11y, Scrollbar],
  spaceBetween: 10,
  slidesPerView: 1.1,
  allowTouchMove: true,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  breakpoints: {
    320: {
      slidesPerView: 2.1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 3.1,
      spaceBetween: 20,
    },
    576: {
      slidesPerView: 4.1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 5.1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 6.1,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 7.1,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 8.1,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 9.1,
      spaceBetween: 20,
    },
    1536: {
      slidesPerView: 10,
      spaceBetween: 20,
    },
  },
  edgeSwipeDetection: true,
  followFinger: true,
  grabCursor: true,
  loop: true,
  rewind: true,
  // draggable:true,
  simulateTouch: true,
  scrollbar: {
    draggable: true,
    hide: true,
    snapOnRelease: true,
  },
  touchReleaseOnEdges: true,
  touchRatio: 1,
  touchAngle: 45,
};

export default function NewRoomsCategoryTab(props: RoomsCategoryTabProps) {
  const { roomsCategories } = props;

  const [roomsCategory, setRoomsCategory] = useState(roomsCategories);
  const [selectedType, setSelectedType] = useState(roomsCategories[0].name);
  const swiperRef = useRef<SwiperRef>(null);

  function handlePrevSlide() {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  }

  function handleNextSlide() {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  }

  function handleShuffleRooms() {
    setRoomsCategory((prevData) => {
      const shuffledData = prevData.map((data) => {
        return {
          ...data,
          rooms: data.rooms.sort(() => Math.random() - 0.5),
        };
      });
      return shuffledData;
    });
  }

  return (
    <section className='py-16'>
      <SectionWrapper className={'space-y-8'}>
        <Tabs
          defaultValue='Trending'
          className='w-full space-y-8'
          activationMode='manual'
          onValueChange={(value) => setSelectedType(value)}>
          <TabsList className='w-full space-x-2 space-y-8 bg-transparent'>
            <button
              onClick={handlePrevSlide}
              className={'rounded-full px-2 py-2 shadow-md hover:shadow'}>
              <span className={'sr-only'}>prev</span>
              <ChevronsLeftIcon className={'size-4 md:size-6'} />
            </button>
            <Swiper {...swiperOptions} draggable={true} ref={swiperRef}>
              <div className='flex items-center gap-4'>
                {roomsCategory.map(({ id, name, tabLogo }) => (
                  <SwiperSlide key={id} className={'h-full w-full pb-4'}>
                    <TabsTrigger
                      defaultChecked={name === selectedType}
                      value={name}
                      className='h-full w-full px-2 py-1 bg-tertiary-500 text-sm font-semibold text-secondary-700 inline-flex flex-col items-center justify-center gap-1 md:gap-2 aspect-square'
                      onClick={handleShuffleRooms}>
                      <span
                        className={'size-6 md:size-8 lg:size-10 mx-auto block'}>
                        <Image
                          src={tabLogo}
                          alt={name}
                          width={40}
                          height={40}
                          className={'w-full h-full object-contain'}
                        />
                      </span>
                      <span className={'text-sm'}>{name}</span>
                    </TabsTrigger>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
            <button
              onClick={handleNextSlide}
              className={'rounded-full px-2 py-2 shadow-md hover:shadow ml-2'}>
              <span className={'sr-only'}>prev</span>
              <ChevronsRightIcon className={'size-4 md:size-6'} />
            </button>
          </TabsList>
          <TabsContent value={selectedType}>
            {roomsCategory
              .filter((type) => type.name === selectedType)
              .map(({ id, rooms }) => (
                <div
                  key={id}
                  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>
                  {rooms.map((room) => (
                    <PropertyCard key={room.id} room={room} />
                  ))}
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </SectionWrapper>
    </section>
  );
}

type PropertyCardProps = {
  id: string;
  images: string[];
  title: string;
  description: string;
  roomlocation: string;
  userLocation: string;
  date: string;
  rating: number;
};

function PropertyCard({ room }: { room: PropertyCardProps }) {
  return (
    <Card key={room.id}>
      <CardContent>
        <AspectRatio ratio={1 / 1}>
          <Image
            src={room.images[0]}
            alt={room.title}
            width={500}
            height={500}
            className='rounded-xl w-full h-full'
          />
        </AspectRatio>
      </CardContent>

      <CardHeader>
        <div className={'inline-flex items-center justify-between'}>
          <CardTitle className='font-semibold text-secondary-500'>
            {room.title}
          </CardTitle>
          <p className='text-sm/6'>{room.rating}</p>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription>
          <p className='text-sm/6 inline-flex items-center gap-1'>
            <span>
              <MapIcon className='size-4 md:size-6 inline-block' />
            </span>
            <span>{room.roomlocation}</span>
          </p>
        </CardDescription>
        <CardDescription>
          {' '}
          <p className='text-sm/6 inline-flex items-center gap-1'>
            <span>
              <IconRoad className='size-4 md:size-6 inline-block' />
            </span>
            <span>{room.userLocation}</span>
          </p>
        </CardDescription>
        <CardDescription>
          <p className='text-sm/6 inline-flex items-center gap-1'>
            <span>
              <CalendarClockIcon className='size-4 md:size-6 inline-block' />
            </span>
            <span>{room.date}</span>
          </p>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
