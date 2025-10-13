import AutoPlay from 'embla-carousel-autoplay';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { rooms } from '@/constants';
import CarouselDetails from './carousel-details';
import CarouselOverlay from './carousel-overlay';

export default function SwappingCarousel() {
  return (
    <section>
      <Carousel
        plugins={[AutoPlay({ delay: 3000 })]}
        opts={{
          loop: true,
          direction: 'ltr',
          dragFree: true,
          dragThreshold: 10,
          duration: 200,
          startIndex: 0,
          slidesToScroll: 'auto',
        }}>
        <CarouselContent className={'h-full w-full rounded-lg'}>
          {rooms.map((carousel, idx) => (
            <CarouselItem
              key={carousel.id}
              className={
                'aspect-square sm:aspect-square md:aspect-video lg:aspect-[20/9] h-full w-full relative'
              }>
              <Image
                src={carousel.images[idx]}
                alt={crypto.randomUUID()}
                className={'object-cover w-full h-full rounded-lg'}
                width={500}
                height={300}
                priority={true}
              />
              <CarouselOverlay />
              <CarouselDetails carousel={carousel} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
