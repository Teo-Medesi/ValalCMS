import React from 'react'
import Logo from "./images/tailwind.png"
import MenuIcon from "./images/menuIcon.png"
import { useState } from 'react'

const NavBar = () => {

  const [isActive, setIsActive] = useState(true);

  const handleClick = event => {
    setIsActive(current => !current);
  }


  return (
    <nav className="flex flex-col md:flex-row md:items-center h-20 md:px-6 lg:px-12 bg-gradient-to-r from-gray-800 to-indigo-900 w-full text-white">
        
        <div className='basis-[10%] p-3 items-center md:mr-12 px-3'>  
          <a href="#" className='flex items-center justify-between'>
              
              <div className='inline-flex'>
                <img src={Logo} className="w-8 h-8 mr-2 md:mr-4"/>
                <span className='text-2xl uppercase tracking-wide font-bold'>Template</span>
              </div>
              
              <button onClick={handleClick}  className="p-2 text-white mt-1 md:hidden ml-auto rounded-md hover:bg-gray-800"><img src={MenuIcon}/></button>
          </a>

        </div>
        <div className={isActive ? "basis-[80%] md:justify-start bg-gradient-to-r from-gray-800 to-indigo-900 md:from-transparent md:to-transparent" : "basis-[80%] md:justify-start bg-gradient-to-r from-gray-800 to-indigo-900 md:from-transparent md:to-transparent hidden"}>


          <ul className='md:inline-flex'>

              <a href="#"><li className='p-3 text-xl hover:text-white  hover:bg-gray-800 text-gray-300 rounded-md md:m-3'>Home</li></a>
              <a href="#"><li className='p-3 text-xl hover:text-white hover:bg-gray-800 rounded-md text-gray-300 md:m-3'>About</li></a>
              <a href="#"><li className='p-3 text-xl hover:text-white hover:bg-gray-800 rounded-md text-gray-300 md:m-3'>Gallery</li></a>
              <a href="#"><li className='p-3 text-xl hover:text-white hover:bg-gray-800 rounded-md text-gray-300 md:m-3'>Contact</li></a>
          </ul>
        </div>

        <a href="#" className={isActive ? 'flex basis-[10%] text-xl justify-center bg-gray-800 md:rounded-md hover:text-white hover:brightness-125' : 'flex basis-[10%] p-3 text-xl md:justify-end bg-gray-800 md:justify-center md:rounded-md hover:text-white hover:brightness-125 hidden'}>
          <button className=' md:bg-gray-800 md:px-5 md:py-2  md:rounded-md text-gray-300 md:text-white'><a href="#">LOGIN</a></button>
        </a>
    </nav>
  )
}

export default NavBar