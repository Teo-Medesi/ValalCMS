import React from 'react'
import Anchor from '../../../Anchor'

const Navbar1 = () => {
  return (
    <>
        <nav className='basis-[5%] text-white items-center p-6 flex flex-row justify-between'>
            <h1>Portfolio</h1>
        
            <div>
              <ul className='flex text-base text-gray-300 flex-row gap-4'>
                <li>About me</li>
                <li>Services</li>
                <li>Projects</li>
                <li>Blogs</li>
                <li>Gallery</li>
              </ul>
            </div>
            <button className='p-3 bg-black-900 rounded-3xl'>Contact us</button>
        </nav>
        <Anchor />
    </>

  )
}

export default Navbar1