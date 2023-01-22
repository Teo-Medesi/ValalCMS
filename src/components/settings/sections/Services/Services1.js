import React from 'react'
import Upload from "../../../../assets/images/upload2.png"

const Services1 = () => {
  return (
    <div className='min-h-screen text-white w-full flex flex-col h-full'>
      <section className='py-12 flex flex-col gap-12 h-full'>
    
            <div className='w-full px-24 flex justify-center flex-col gap-3 items-center'>
              <h1 className='text-4xl'>Services <span>I believe in</span></h1>
              <p className='text-gray-500 text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className='flex flex-row md:justify-between xl:justify-center xl:gap-12'>
              <div className='bg-black-900 p-6 px-12 h-96 relative after:absolute after:bg-gradient-to-r after:from-[] flex flex-col gap-6 rounded-md md:basis-[30%] xl:basis-[25%]'>
                <img src={Upload} className="w-20 h-20"/>
                <h3 className='text-2xl font-bold'>Website Design</h3>
                <p className='text-sm text-black-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div className='bg-black-900 p-6 px-12 h-96 relative after:absolute after:bg-gradient-to-r after:content-[""] after:from-[#bf08c1] after:to-[#eb7c99] flex flex-col gap-6 rounded-md md:basis-[30%] xl:basis-[25%]'>
                <img src={Upload} className="w-20 h-20"/>
                <h3 className='text-2xl font-bold'>SEO Marketing</h3>
                <p className='text-sm text-black-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div className='bg-black-900 p-6 px-12 h-96 relative after:bottom-10 after:left-10 after:absolute after:bg-gradient-to-r after:z-[-1] after:w-full after:content-[""] after:top after:h-1 flex flex-col gap-6 rounded-md md:basis-[30%] xl:basis-[25%]'>
                <img src={Upload} className="w-20 h-20"/>
                <h3 className='text-2xl font-bold'>WF Development</h3>
                <p className='text-sm text-black-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
          
            </div>
    </section>
    </div>
  )
}

export default Services1