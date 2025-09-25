'use client';

import { useState } from 'react';

export default function SearchHomes() {
  const [formData, setFormData] = useState({
    city: '',
    stayDuration: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add your logic here, for example, logging the form data
    console.log('Form Data:', formData);
    setFormData({
      city: '',
      stayDuration: '',
    });
  };

  return (
    <div className='ring-1 ring-primary-500 rounded-full'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='px-2'>
            <label className='md:text-sm lg:text-md font-semibold'>CITY</label>
            <div className={'overflow-hidden p-2'}>
              <input
                type='text'
                id='city'
                name='city'
                placeholder='Where to?'
                className='md:text-sm bg-transparent text-[#727272] hover:outline-none focus:outline-none focus:outline-offset-0 outline-none rounded-full'
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className=''>
            <label className='md:text-sm lg:text-md font-semibold'>
              STAY DURATION
            </label>
            <p>
              <input
                type='text'
                id='stayDuration'
                name='stayDuration'
                placeholder='Move in - Move out'
                className='md:text-sm bg-transparent text-[#727272] hover:border-none focus:border-none outline-none'
                value={formData.stayDuration}
                onChange={handleInputChange}
                required
              />
            </p>
          </div>

          <div className='flex items-center justify-end'>
            <button
              type='submit'
              className='bg-[#09A350] text-sm text-white md:p-2 lg:px-4 lg:py-2 rounded-[40px]'>
              View Home
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
