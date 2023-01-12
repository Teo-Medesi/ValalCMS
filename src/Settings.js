import React, { createContext } from 'react'
import SettingsIcon from "./assets/images/svgs/gearIcon.svg"
import SectionsIcon from "./assets/images/svgs/sectionsIcon.svg"
import MediaIcon from "./assets/images/svgs/mediaIcon.svg"
import AddIcon from "./assets/images/svgs/addIcon.svg"
import PagesIcon from "./assets/images/svgs/pagesIcon.svg"
import DesignIcon from "./assets/images/svgs/designIcon.svg"


export const SettingsContext = createContext();

const Settings = () => {

    return (
        <div className='flex flex-col items-center'>
            <div className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-gray-900'><img src={AddIcon} alt="add icon"  className='w-12 h-12 p-1'/></div>
            <div className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-gray-900'><img src={SectionsIcon} alt="sections icon"  className='w-12 h-12 p-1'/></div>
            <div className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-gray-900'><img src={PagesIcon} alt="pages icon"  className='w-12 h-12 p-1'/></div>
            <div className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-gray-900'><img src={DesignIcon} alt="design icon"  className='w-12 h-12 p-1'/></div>
            <div className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-gray-900'><img src={MediaIcon} alt="media icon"  className='w-12 h-12 p-1'/></div>            
            <div className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-gray-900'><img src={SettingsIcon} alt="settings icon"  className='w-12 h-12 p-1'/></div>
        </div>
    )
}

export default Settings