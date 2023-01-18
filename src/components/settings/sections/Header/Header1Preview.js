import React from 'react'
import Kanye from "../../../../assets/images/kanye2.jpg"

const Header1Preview = () => {
  return (
    <div className='flex flex-col bg-[#000000] w-full h-full'>
    <header className='p-24 flex flex-row gap-6 basis-[100%] h-full'>
      
      <div className='basis-1/2 h-full px-6 py-20 flex gap-6 flex-col'>
        <h1 className="text-6xl"><span className="bg-gradient-to-r text-transparent bg-clip-text font-bold from-[#bf08c1] to-[#eb7c99]">Digital Designer</span> crafting <span className='line-through text-gray-600'>product</span> shit that people <span className='line-through text-gray-600'>love</span> don't need</h1>
        <p className='text-sm text-black-700 w-fit'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <button className="p-3 px-6 rounded-3xl bg-gradient-to-r from-[#bf08c1] to-[#eb7c99] w-fit">Book a FREE call</button>
      </div>

      <div className='basis-1/2'>
        <div className='relative w-full h-full after:content-[""] z-[0] after:absolute after:z-[-1] after:-inset-2 after:blur-xl after:bg-gradient-to-br after:from-[#bf08c1] after:to-[#ffffff]'><img src={Kanye} className='w-full h-full object-cover bg-gray-700' /></div>
      </div>

    </header>

    </div>
  )
}

export default Header1Preview