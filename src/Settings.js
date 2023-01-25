import React, { createContext, useContext, useState } from 'react'
import SettingsIcon from "./assets/images/svgs/gearIcon.svg"
import SectionsIcon from "./assets/images/svgs/sectionsIcon.svg"
import MediaIcon from "./assets/images/svgs/mediaIcon.svg"
import AddIcon from "./assets/images/svgs/addIcon.svg"
import PagesIcon from "./assets/images/svgs/pagesIcon.svg"
import DesignIcon from "./assets/images/svgs/designIcon.svg"
import LayersIcon from "./assets/images/svgs/layersIcon.svg"
import AddElements from './components/settings/AddElements'
import Sections from './components/settings/Sections'
import Design from './components/settings/Design'
import Pages from './components/settings/Pages'
import SiteSettings from './components/settings/SiteSettings'
import Layers from './components/settings/Layers'
import Media from './components/settings/Media'

export const SettingsContext = createContext();

const ActiveElement = ({activeTab}) => {
    switch (activeTab) {
        case "AddElements": 
            return <AddElements />
        case "Sections":
            return <Sections />
        case "Pages": 
            return <Pages />
        case "Design":
            return <Design />
        case "Media": 
            return <Media />
        case "SiteSettings":
            return <SiteSettings />
        case "Layers":
            return <Layers />
        
    }
}

const Settings = ({isToggled, setIsToggled, setIsToggledRelative, isToggledRelative}) => {

    const [activeTab, setActiveTab] = useState(""); 

    const openTab = (name, position) => {
        // we have two positions for our tab, an absolute one where it overlaps the content page and one where it is relative, where it fits into the page flow
        if (position === "absolute")
        {
            // if the user clicked on an already active tab, we will close it
            if (activeTab === name)
            {
                setActiveTab("");
                setIsToggled(false);
            } else {
                setActiveTab(name);
                setIsToggled(true);
                setIsToggledRelative(false);
            }
        }
        else {
            // if the user clicked on an already active tab, we will close it
            if (activeTab === name)
            {
                setActiveTab("");
                setIsToggledRelative(false);
            } else {
                setActiveTab(name);
                setIsToggled(false);
                setIsToggledRelative(true);
            }
        }

    }

    return (
        <SettingsContext.Provider value={[setIsToggled, setIsToggledRelative]}>
            <div className={isToggled ? 'w-2/5 flex flex-row h-screen bg-black-100 z-[1] absolute' : isToggledRelative ? 'w-2/5 basis-2/5 flex flex-row h-screen bg-black-100 z-[1]' : 'basis-[5%] max-w-[5vw]'}>
                <div className="flex flex-col min-h-screen w-full max-w-[5vw] border-t-primary border-t-[12px]">
                    <div className='flex bg-black-100 flex-col h-screen items-center'>
                        <div className='flex flex-col items-center border-r border-black-600 h-min w-full'>
                            <div onClick={() => openTab("AddElements", "absolute")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={AddIcon} alt="add icon"  className='w-10 h-10 p-1'/></div>
                            <div onClick={() => openTab("Sections", "relative")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={SectionsIcon} alt="sections icon"  className='w-10 h-10 p-1'/></div>
                            <div onClick={() => openTab("Pages", "absolute")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={PagesIcon} alt="pages icon"  className='w-10 h-10 p-1'/></div>
                            <div onClick={() => openTab("Design", "relative")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={DesignIcon} alt="design icon"  className='w-10 h-10 p-1'/></div>
                            <div onClick={() => openTab("Media", "absolute")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={MediaIcon} alt="media icon"  className='w-10 h-10 p-1'/></div>
                            <div onClick={() => openTab("SiteSettings", "absolute")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={SettingsIcon} alt="settings icon"  className='w-10 h-10 p-1'/></div>
                        </div>
                        <div className='bg-primary relative h-full w-full flex flex-col justify-end'>
                            <div onClick={() => openTab("Layers", "absolute")} className='w-full p-3 py-6 flex justify-center cursor-pointer hover:bg-gray-900'><img src={LayersIcon} alt="layers icon"  className='w-10 h-10 p-1'/></div>
                        </div>
                    </div>
                </div>
                <div className={(isToggled || isToggledRelative) ? 'border-t-[12px] border-t-primary w-full overflox-x-hidden overflox-y-scroll  h-screen' : "hidden"}>
                    <ActiveElement activeTab={activeTab} />
                </div>
            </div>
        </SettingsContext.Provider>
    )
}

export default Settings