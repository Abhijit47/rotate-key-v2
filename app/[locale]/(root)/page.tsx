import CTASection from '@/components/home/CTASection';
// import DiscoverTheMagic from './_components/home/DiscoverTheMagic';
import FeaturesSection from '@/components/home/FeaturesSection';
import HeroSection from '@/components/home/HeroSection';
import LikedProperty from '@/components/home/LikedProperty';
import ReadyToSwap from '@/components/home/ReadyToSwap';
// import TestimonialSection from '@/components/home/TestimonialSection';
// import TrendingHomeSection from '@/components/home/TrendingHomeSection';
// import DynamicLoader from '@/components/shared/DynamicLoader';
// import { Suspense } from 'react';
// import { StreamChat } from 'stream-chat';

// user needs to delete from stream dashboard too
// user_32Km5PH0di3nRVeexhfEAkqxh33

// const serverClient = StreamChat.getInstance(
//   process.env.NEXT_PUBLIC_STREAM_API_KEY!,
//   process.env.STREAM_API_SECRET
// );

// const users = [
//   'user_32Km5PH0di3nRVeexhfEAkqxh33'
// ]

export default function Home() {
  // serverClient
  //   .deleteUser('user_32Km5PH0di3nRVeexhfEAkqxh33')
  //   .then(() => {
  //     console.log('User deleted');
  //   })
  //   .catch((err) => {
  //     console.error('Error deleting user:', err);
  //   });
  // serverClient
  //   .deleteUsers(users, {
  //     messages: "hard",
  //     user: "hard",
  //     conversations:"hard"
  //   })
  //   .then(() => {
  //     console.log('User deleted');
  //   })
  //   .catch((err) => {
  //     console.error('Error deleting user:', err);
  //   });

  return (
    <main className={'space-y-12'}>
      <HeroSection />

      {/* <Suspense fallback={<DynamicLoader />}>
          <TrendingHomeSection />
        </Suspense> */}

      <ReadyToSwap />

      <LikedProperty />

      {/* <DiscoverTheMagic /> */}

      <FeaturesSection />

      {/* <TestimonialSection /> */}

      <CTASection />
    </main>
  );
}
