import React,{useState} from 'react'
import Home from './Home'
import { createContext } from 'react';
import Logo from "./assets/images/settingsBlack.png"
import Settings from './Settings';

export const ProjectContext = createContext();

const Project = ({projectNumber}) => {
  const [settingsComponent, setSettingsComponent] = useState("");
  return (
    <ProjectContext.Provider value={projectNumber}>
        <div className='flex'>
            <div className="flex flex-col min-h-screen bg-gray-100 basis-[20%] border-r border-gray-800 shadow-inner">
                <div className='flex gap-2 flex-row items-center py-4 pl-1'>
                    <img onClick={() => setSettingsComponent("")} className="w-12 h-12 transition duration-300 cursor-pointer hover:rotate-45" src={Logo}/>
                    <p className='uppercase font-bold text-xl underline underline-offset-4 hover:shadow-xl cursor-pointer'>Untitled Project</p>
                </div>

            <Settings setSettingsComponent={setSettingsComponent} settingsComponent={settingsComponent} />
            </div>
            <Home className={"basis-[80%]"}/>
        </div>
    </ProjectContext.Provider>
  )
}

export default Project