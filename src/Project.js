import React from 'react'
import Home from './Home'
import { createContext } from 'react';
import Logo from "./assets/images/settingsBlack.png"
import navLogo from "./assets/images/directionsWhite.png"
import headerLogo from "./assets/images/image.png"
import footerLogo from "./assets/images/footerIconWhite.png"

export const ProjectContext = createContext();

const Project = ({projectNumber}) => {
  return (
    <ProjectContext.Provider value={projectNumber}>
        <div className='flex'>
            <div className="flex flex-col gap-3 min-h-screen basis-[20%] bg-gray-200 shadow-2xl p-4">
                <div className='flex gap-2 flex-row items-center'>
                    <img className="w-12 h-12 transition duration-300 cursor-pointer hover:rotate-45" src={Logo}/>
                    <p className='uppercase font-bold text-xl underline underline-offset-4 hover:shadow-xl cursor-pointer'>Untitled Project</p>
                </div>

                <div className='flex bg-gray-800 justify-between cursor-pointer hover:shadow-xl items-center p-3 text-white text-xl font-semibold uppercase rounded-md'>
                    <p>Navbar</p>
                    <img className="w-10 h-10" src={navLogo}/>
                </div>

                <div className='flex justify-between cursor-pointer hover:shadow-xl items-center border-2 border-gray-500 p-3 text-xl font-semibold uppercase rounded-md'>
                    <p>Header</p>
                    <img className="w-10 h-10" src={headerLogo}/>
                </div>

                <div className='flex bg-gray-800 justify-between cursor-pointer hover:shadow-xl items-center p-3 text-white text-xl font-semibold uppercase rounded-md'>
                    <p>Footer</p>
                    <img className="w-10 h-10" src={footerLogo}/>
                </div>

            </div>
            <Home className={"basis-[80%]"}/>
        </div>
    </ProjectContext.Provider>
  )
}

export default Project