import step1 from '@/public/swapping-steps/step-1.svg';
import step2 from '@/public/swapping-steps/step-2.svg';
import step3 from '@/public/swapping-steps/step-3.svg';
import step4 from '@/public/swapping-steps/step-4.svg';
import step5 from '@/public/swapping-steps/step-5.svg';
import Image from 'next/image';
import SectionWrapper from '../shared/SectionWrapper';

export default function DiscoverTheMagic() {
  return (
    <SectionWrapper>
      <div className='mt-10 md:mt-14 ' style={{ fontFamily: 'Poppins' }}>
        <div className='text-center'>
          <span className='text-xs bg-[#E9E9E9] px-10 py-1 rounded'>
            The Secret to Home Exchanging
          </span>
        </div>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mt-8 text-center mx-5 sm:mx:20 md:mx-40 lg:mx-60'>
          Discover the Magic: Your Guide to Turn Key&apos;s Operation
        </h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-5 mx-5 sm:mx-10 md:mx-20 mt-10 md:mt-20'>
        <div className='md:col-span-1 hidden md:block'>
          <div className='relative'>
            <div className='flex items-center flex-col'>
              <div className='w-4 h-4 bg-[#09A350] rounded-full'></div>
              <div className='border-l-4 border-[#09A350] h-44 lg:h-48 xl:h-60'></div>
            </div>
            <div className='flex items-center flex-col'>
              <div className='w-4 h-4 bg-[#09A350] rounded-full'></div>
              <div className='border-l-4 border-[#09A350] h-48 lg:h-44 xl:h-52 '></div>
            </div>
            <div className='flex items-center flex-col'>
              <div className='w-4 h-4 bg-[#09A350] rounded-full'></div>
              <div className='border-l-4 border-[#09A350] h-40  lg:h-56 xl:h-52 '></div>
            </div>
            <div className='flex items-center flex-col'>
              <div className='w-4 h-4 bg-[#09A350] rounded-full'></div>
              <div className='border-l-4 border-[#09A350] h-44 lg:h-48 xl:h-60'></div>
            </div>
            <div className='flex items-center flex-col'>
              <div className='w-4 h-4 bg-[#09A350] rounded-full'></div>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className='md:col-span-10'>
          {/* Step 1 */}
          <div
            className='grid grid-cols-1 md:grid-cols-12 gap-5'
            style={{ fontFamily: 'Poppins' }}>
            <div className='md:col-span-8'>
              <h2 className='text-2xl text-[#09A350] font-semibold mb-2'>
                Step 1: Registration
              </h2>
              <ul className='list-disc ml-5 mt-5'>
                <li>Sign up for free with basic details.</li>
                <li>Verify your identity for a secure community.</li>
              </ul>
            </div>
            <div className='md:col-span-4'>
              <Image
                src={step1}
                alt='step1'
                className='w-full h-full'
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className='border-b-2 border-gray-200 mt-10'></div>

          {/* Step 2 */}
          <div
            className='grid grid-cols-1 md:grid-cols-12 gap-5 mt-10'
            style={{ fontFamily: 'Poppins' }}>
            <div className='md:col-span-8'>
              <h2 className='text-2xl text-[#09A350] font-semibold mb-2'>
                Step 2: Create Your Profile
              </h2>
              <ul className='list-disc ml-5 mt-5'>
                <li>
                  Craft a detailed profile showcasing your property and
                  preferences.
                </li>
                <li>Add high-quality photos to make your listing stand out.</li>
              </ul>
            </div>
            <div className='md:col-span-4'>
              <Image
                src={step2}
                alt='step2'
                className='w-full h-full'
                width={500}
                height={500}
              />
            </div>
          </div>

          <div className='border-b-2 border-gray-200 mt-10'></div>

          {/* Step 3 */}
          <div
            className='grid grid-cols-1 md:grid-cols-12 gap-5 mt-10'
            style={{ fontFamily: 'Poppins' }}>
            <div className='md:col-span-8'>
              <h2 className='text-2xl text-[#09A350] font-semibold mb-2'>
                Step 3: Explore Listings
              </h2>
              <ul className='list-disc ml-5 mt-5'>
                <li>Browse through a diverse range of properties.</li>
                <li>
                  Use filters to find the perfect match for your next house
                  swap, incase our AI Schema is set in such a way, you can get
                  your desired houses.
                </li>
              </ul>
            </div>
            <div className='md:col-span-4'>
              <Image
                src={step3}
                alt='step3'
                className='w-full h-full'
                width={500}
                height={500}
              />
            </div>
          </div>

          <div className='border-b-2 border-gray-200 mt-10'></div>

          {/* Step 4 */}
          <div
            className='grid grid-cols-1 md:grid-cols-12 gap-5 mt-10'
            style={{ fontFamily: 'Poppins' }}>
            <div className='md:col-span-8'>
              <h2 className='text-2xl text-[#09A350] font-semibold mb-2'>
                Step 4: Swap
              </h2>
              <ul className='list-disc ml-5 mt-5'>
                <li>
                  Get lots of Exchanging Home option by our AI based filter.
                </li>
                <li>
                  Discuss potential swaps and get to know your exchange
                  partners.
                </li>
              </ul>
            </div>
            <div className='md:col-span-4'>
              <Image
                src={step4}
                alt='step4'
                className='w-full h-full'
                width={500}
                height={500}
              />
            </div>
          </div>

          <div className='border-b-2 border-gray-200 mt-10'></div>

          {/* Step 5 */}
          <div
            className='grid grid-cols-1 md:grid-cols-12 gap-5 mt-10'
            style={{ fontFamily: 'Poppins' }}>
            <div className='md:col-span-8'>
              <h2 className='text-2xl text-[#09A350] font-semibold mb-2'>
                Step 5: Initiate Contact and Confirm
              </h2>
              <ul className='list-disc ml-5 mt-5'>
                <li>Connect with homeowners through secure messaging.</li>
                <li>Finalize the details and terms of your house swap.</li>
                <li>Enjoy a seamless and secure exchange experience.</li>
              </ul>
            </div>
            <div className='md:col-span-4'>
              <Image
                src={step5}
                alt='step5'
                className='w-full h-full'
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>

        <div className=''></div>
      </div>
    </SectionWrapper>
  );
}
