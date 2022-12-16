import React from 'react'
import Logo from "./images/addIcon.png"


const Header = () => {
  return (
    <div className='h-[800px] bg-gray-100 py-8 px-16 transition ease-in-out duration-300 hover:brightness-50 cursor-pointer'>
        <div className='flex flex-col justify-center items-center border-2 rounded border-gray-300 w-full h-full'>
            <img src={Logo} className="w-36 h-36"/>
            <p className='text-2xl uppercase text-gray-500 tracking-wide mt-4'>Click to upload image</p>
        </div>

    </div>
  )
}


export default Header
