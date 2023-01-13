import React, { createContext, useContext, useState } from 'react'
import Draggable from 'react-draggable'
import CloseIcon from "./assets/images/svgs/closeIcon.svg"
import SettingsIcon from "./assets/images/svgs/gearIcon.svg"
import SectionsIcon from "./assets/images/svgs/sectionsIcon.svg"
import MediaIcon from "./assets/images/svgs/mediaIcon.svg"
import AddIcon from "./assets/images/svgs/addIcon.svg"
import PagesIcon from "./assets/images/svgs/pagesIcon.svg"
import DesignIcon from "./assets/images/svgs/designIcon.svg"
import LayersIcon from "./assets/images/svgs/layersIcon.svg"

export const SettingsContext = createContext();




const AddElements = () => {
    const setIsToggled = useContext(SettingsContext);
    
    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-2xl text-black-900'>Add Elements</h1>
                <img src={CloseIcon} onClick={() => setIsToggled(false)} className="w-12 cursor-pointer h-12" />
            </div>

        </>
    )
}

const Sections = () => {
    const setIsToggled = useContext(SettingsContext);
    
    
    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-2xl text-black-900'>Sections</h1>
                <img src={CloseIcon} onClick={() => setIsToggled(false)} className="w-12 cursor-pointer h-12" />
            </div>

        </>
    )
}

const Pages = () => {
    const setIsToggled = useContext(SettingsContext);
    
    
    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-2xl text-black-900'>Pages</h1>
                <img src={CloseIcon} onClick={() => setIsToggled(false)} className="w-12 cursor-pointer h-12" />
            </div>
        </>
    )
}

const Design = () => {
    const setIsToggled = useContext(SettingsContext);
    
    
    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-2xl text-black-900'>Design</h1>
                <img src={CloseIcon} onClick={() => setIsToggled(false)} className="w-12 cursor-pointer h-12" />
            </div>
        
        </>
    )
}

const Media = () => {
    const setIsToggled = useContext(SettingsContext);
    
    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-2xl text-black-900'>Media</h1>
                <img src={CloseIcon} onClick={() => setIsToggled(false)} className="w-12 cursor-pointer h-12" />
            </div>
        
        </>
    )
}

const SiteSettings = () => {
    const setIsToggled = useContext(SettingsContext);
    
    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-2xl text-black-900'>SiteSettings</h1>
                <img src={CloseIcon} onClick={() => setIsToggled(false)} className="w-12 cursor-pointer h-12" />
            </div>
        
        </>
    )
}

const Layers = () => {
    const setIsToggled = useContext(SettingsContext);
    
    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-2xl text-black-900'>Layers</h1>
                <img src={CloseIcon} onClick={() => setIsToggled(false)} className="w-12 cursor-pointer h-12" />
            </div>
        
        </>
    )
}


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

const Settings = ({isToggled, setIsToggled}) => {

    const [activeTab, setActiveTab] = useState(""); 

    const handleClick = (name) => {
        if(activeTab === name) {
            setActiveTab("");
            setIsToggled(current => !current);
        } else {
            setIsToggled(true);
        }
        setActiveTab(name);
    }

    return (
        <SettingsContext.Provider value={setIsToggled}>
            <div className={isToggled ? 'w-2/5 flex flex-row h-screen bg-black-100 absolute z-[1]' : 'basis-[5%] max-w-[5vw]'}>
                <div className="flex flex-col min-h-screen w-full max-w-[5vw] border-t-primary border-t-[12px]">
                    <div className='flex bg-black-100 flex-col h-screen items-center'>
                        <div className='flex flex-col items-center border-r border-black-600 h-min w-full'>
                            <div onClick={() => handleClick("AddElements")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={AddIcon} alt="add icon"  className='w-12 h-12 p-1'/></div>
                            <div onClick={() => handleClick("Sections")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={SectionsIcon} alt="sections icon"  className='w-12 h-12 p-1'/></div>
                            <div onClick={() => handleClick("Pages")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={PagesIcon} alt="pages icon"  className='w-12 h-12 p-1'/></div>
                            <div onClick={() => handleClick("Design")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={DesignIcon} alt="design icon"  className='w-12 h-12 p-1'/></div>
                            <div onClick={() => handleClick("Media")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={MediaIcon} alt="media icon"  className='w-12 h-12 p-1'/></div>
                            <div onClick={() => handleClick("SiteSettings")} className='w-full p-3 py-6 h-full flex justify-center cursor-pointer hover:bg-black-600'><img src={SettingsIcon} alt="settings icon"  className='w-12 h-12 p-1'/></div>
                        </div>
                        <div className='bg-primary relative h-full w-full flex flex-col justify-end'>
                            <div onClick={() => handleClick("Layers")} className='w-full p-3 py-6 flex justify-center cursor-pointer hover:bg-gray-900'><img src={LayersIcon} alt="layers icon"  className='w-12 h-12 p-1'/></div>
                        </div>
                    </div>
                </div>
                <div className='border-t-[12px] border-t-primary w-full h-screen'>
                    <ActiveElement activeTab={activeTab} />
                </div>
            </div>
        </SettingsContext.Provider>
    )
}

export default Settings