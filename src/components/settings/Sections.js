import React, {useContext, useEffect, useState} from "react";
import Drag from "../Drag";
import Text1Preview from "./sections/Text1Preview";
import { SettingsContext } from "../../Settings";
import CloseIcon from "../../assets/images/svgs/closeIcon.svg"
import { ProjectContext } from "../../Project";
import Text1 from "./sections/Text1";
import Basic1 from "./sections/Basic1";
import Basic1Preview from "./sections/Basic1Preview";
import Navbar1 from "./sections/Navbar1";
import Navbar1Preview from "./sections/Navbar1Preview";
import Header1 from "./sections/Header/Header1";
import Header1Preview from "./sections/Header/Header1Preview.PNG"
import Services1 from "./sections/Services/Services1";
import Services1Preview from "./sections/Services/Services1Preview.PNG"
import Subscribe1 from "./sections/Subscribe/Subscribe1";
import Subscribe1Preview from "./sections/Subscribe/Subscribe1Preview.PNG"
import Contact1 from "./sections/Contact/Contact1";
import Contact1Preview from "./sections/Contact/Contact1Preview.PNG"

const Basic = () => {
    const [ _ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div className="flex flex-col p-6 gap-6">
            <div className="relative">
                <Drag type="section" element={<Basic1 />} setIsDragging={setIsAnchorActive}>
                    <Basic1Preview/>
                </Drag>
            </div>
        </div>
    )
}

const Contact = () => {
    const [ _ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div className="flex flex-col p-6 gap-6">
            <div className="relative">
                <Drag type="section" element={<Contact1 />} setIsDragging={setIsAnchorActive}>
                    <img src={Contact1Preview} />
                </Drag>
            </div>
        </div>
    )
}

const Subscribe = () => {
    const [ _ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div className="flex flex-col p-6 gap-6">
            <div className="relative">
                <Drag type="section" element={<Subscribe1 />} setIsDragging={setIsAnchorActive}>
                    <img src={Subscribe1Preview} />
                </Drag>
            </div>
        </div>
    )
}

const Services = () => {
    const [ _ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div className="flex flex-col p-6 gap-6">
            <div className="relative">
                <Drag type="section" element={<Services1 />} setIsDragging={setIsAnchorActive}>
                    <img src={Services1Preview} />
                </Drag>
            </div>
        </div>
    )    
}

const Text = () => {
    const [ _ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div className="flex flex-col p-6 gap-6">
            <div className="relative">
                <Drag type="section" element={<Text1 />} setIsDragging={setIsAnchorActive}>
                    <Text1Preview/>
                </Drag>
            </div>
        </div>
    )
}

const Navigation = () => {
    const [ _ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return ( 
        <div className="flex flex-col p-6 gap-6 w-full">
            <div className="relative">
                <Drag type="section" element={<Navbar1 />} setIsDragging={setIsAnchorActive}>
                    <Navbar1Preview />
                </Drag>
            </div>
        </div>
    )

}

const Header = () => {
    const [ _ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return ( 
        <div className="flex flex-col p-6 gap-6 w-full">
            <div className="relative">
                <Drag type="section" element={<Header1 />} setIsDragging={setIsAnchorActive}>
                    <img src={Header1Preview} className=""/>
                </Drag>
            </div>
        </div>
    )

}

const ActiveElement = ({activeTab}) => {
    switch (activeTab) {
        case "Basic": return <Basic />
        case "Text": return <Text />
        case "Navigation": return <Navigation />
        case "Header": return <Header />
        case "Services": return <Services/>
        case "Subscribe": return <Subscribe />
        case "Contact": return <Contact />
        /* case "List": return <List />
        case "Form": return <Form />
        case "Welcome": return <Welcome />
        case "About": return <About />
        case "Team": return <Team />
        case "Promotion": return <Promotion />
        case "Subscribe": return <Subscribe />
        case "Testimonials": return <Testimonials />
        case "Bookings": return <Bookings />
        case "Events": return <Events /> */
    }
}

const Sections = () => {
    const [setIsToggled, setIsToggledRelative] = useContext(SettingsContext);    
    const [activeTab, setActiveTab] = useState("Text");

    const tabs = ["Basic", "Text", "Header", "Navigation", "Form", "List", "Welcome", "About", "Team", "Contact", "Promotion", "Services", "Subscribe", "Testimonials", "Bookings", "Events"]

    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-xl text-black-900'>Sections</h1>
                <img src={CloseIcon} onClick={() => setIsToggledRelative(false)} className="w-10 cursor-pointer h-10" />
            </div>
            <div className='flex flex-row w-full h-full'>
                <div className='flex basis-[30%] p-6 border-r border-r-black-600'>
                    <div className='flex w-full flex-col'>
                        {tabs.map((tab, index) => <p key={index} onClick={() => setActiveTab(tab)} className='p-2 hover:bg-black-600 cursor-pointer rounded-md'>{tab}</p>)}
                    </div>
                </div>
                <div className='flex basis-[70%] flex-col justify-start'>
                    <div className='flex p-4 items-center border-b border-black-600'>
                        <h1 className='text-xl text-black-900'>{activeTab}</h1>
                    </div>
                    <ActiveElement activeTab={activeTab}/>
                </div>
            </div>

        </>
    )
}

export default Sections