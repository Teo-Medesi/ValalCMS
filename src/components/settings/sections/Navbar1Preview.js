import React from 'react'

const Navbar1Preview = () => {
  return (
    <nav className='bg-[#000000] text-white text-[8px] max-w-full h-full items-center p-3 flex flex-row justify-between'>
        <h1>Portfolio</h1>

        <div>
            <ul className='flex  text-gray-300 flex-row gap-2'>
                <li>About me</li>
                <li>Services</li>
                <li>Projects</li>
                <li>Blogs</li>
                <li>Gallery</li>
            </ul>
        </div>
        <button className='p-1 bg-black-900 rounded-3xl'>Contact us</button>
    </nav>
  )
}

export default Navbar1Preview