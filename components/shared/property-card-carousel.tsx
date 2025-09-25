'use client';

import AutoPlay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { AspectRatio } from '../ui/aspect-ratio';
import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

export default function PropertyCardCarousel({
  images,
  type,
}: {
  images: string[];
  type: 'propertyCard' | 'propertyDeatils';
}) {
  switch (type) {
    case 'propertyCard':
      if (images.length === 0) {
        return (
          <div className={'aspect-square w-full h-full'}>
            <Image
              src={'https://placehold.co/600x600/png?text=No+Image'}
              alt='no-image-available'
              width={500}
              height={500}
              className={'w-full h-full object-cover'}
            />
          </div>
        );
      }
      return (
        <CardContent>
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
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={image}
                      alt={crypto.randomUUID()}
                      className={'object-cover w-full h-full rounded-lg'}
                      width={500}
                      height={300}
                      priority={true}
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </CardContent>
      );

    case 'propertyDeatils':
      if (images.length === 0) {
        return (
          <div className={'aspect-[16/9] object-cover w-full h-full'}>
            <Card className={'w-full h-full'}>No images available</Card>
          </div>
        );
      }
      return (
        <Carousel
          // plugins={[AutoPlay({ delay: 3000 })]}
          opts={{
            loop: true,
            direction: 'ltr',
            dragFree: true,
            dragThreshold: 10,
            duration: 200,
            startIndex: 0,
            slidesToScroll: 'auto',
          }}>
          <CarouselContent className={'aspect-video w-full h-full'}>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image}
                  alt={crypto.randomUUID()}
                  className={'object-cover w-full h-full rounded-lg'}
                  width={500}
                  height={300}
                  priority={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      );

    default:
      return (
        <div>
          <Card className={'w-full h-full'}>No images available</Card>
        </div>
      );
  }
}
