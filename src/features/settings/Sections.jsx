import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "./Settings";
import { ProjectContext } from "../project/Project";
import Drag from "../editing/Drag";
import Bg1 from "../../assets/images/backgrounds/bg1.jpg"
import Bg2 from "../../assets/images/backgrounds/bg2.jpg"
import Bg3 from "../../assets/images/backgrounds/bg3.jpg"
import Bg4 from "../../assets/images/backgrounds/bg4.jpg"
import Text1Preview from "../../layout/sections/Text/Text1Preview"
import CloseIcon from "../../assets/svgs/closeIcon.svg"
import UploadIcon from "../../assets/svgs/uploadIcon.svg"
import Basic1Preview from "../../layout/sections/Basic/Basic1Preview";
import Navbar1Preview from "../../layout/sections/Navigation/Navbar1Preview";
import Header1Preview from "../../layout/sections/Header/Header1Preview.PNG"
import Services1Preview from "../../layout/sections/Services/Services1Preview.PNG"
import Subscribe1Preview from "../../layout/sections/Subscribe/Subscribe1Preview.PNG"
import Contact1Preview from "../../layout/sections/Contact/Contact1Preview.PNG"

const Basic = () => {
    const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div style={{scrollbarColor: "#1E293B"}} className="flex flex-col p-6 gap-6 overflow-scroll">

            <Drag type="section" component={"Basic1"} properties={{backgroundColor: "#111316"}} setIsDragging={setIsAnchorActive}>
                <Basic1Preview />
            </Drag>
            <Drag type="section" properties={{}} component={"Bg0"} setIsDragging={setIsAnchorActive}>
                <div className="border border-black-600 rounded h-52 flex justify-center items-center">
                    <img src={UploadIcon} className="w-20 h-20"/>
                </div>
            </Drag>
            <Drag type="section" properties={{}} component={"Bg1"} setIsDragging={setIsAnchorActive}>
                <img src={Bg1} className="w-full h-52" />
            </Drag>
            <Drag type="section" properties={{}} component={"Bg2"} setIsDragging={setIsAnchorActive}>
                <img src={Bg2} className="w-full h-52"/>
            </Drag>
            <Drag type="section" properties={{}} component={"Bg3"} setIsDragging={setIsAnchorActive}>
                <img src={Bg3} className="w-full h-52"/>
            </Drag>
            <Drag type="section" properties={{}} component={"Bg4"} setIsDragging={setIsAnchorActive}>
                <img src={Bg4} className="w-full h-52" />
            </Drag>
        </div>
    )
}

const Contact = () => {
    const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div className="flex flex-col p-6 gap-6">
            <div className="relative">
                <Drag type="section" component={"Contact1"} setIsDragging={setIsAnchorActive}>
                    <img src={Contact1Preview} />
                </Drag>
            </div>
        </div>
    )
}

const Subscribe = () => {
    const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div className="flex flex-col p-6 gap-6">
            <div className="relative">
                <Drag type="section" component={"Subscribe1"} setIsDragging={setIsAnchorActive}>
                    <img src={Subscribe1Preview} />
                </Drag>
            </div>
        </div>
    )
}

const Services = () => {
    const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div className="flex flex-col p-6 gap-6">
            <div className="relative">
                <Drag type="section" component={"Services1"} setIsDragging={setIsAnchorActive}>
                    <img src={Services1Preview} />
                </Drag>
            </div>
        </div>
    )
}

const Text = () => {
    const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div className="flex flex-col p-6 gap-6">
            <div className="relative">
                <Drag type="section" component={"Text1"} setIsDragging={setIsAnchorActive}>
                    <Text1Preview />
                </Drag>
            </div>
        </div>
    )
}

const Navigation = () => {
    const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div className="flex flex-col p-6 gap-6 w-full">
            <div className="relative">
                <Drag type="section" component={"Navbar1"} setIsDragging={setIsAnchorActive}>
                    <Navbar1Preview />
                </Drag>
            </div>
        </div>
    )

}

const Header = () => {
    const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext)

    return (
        <div className="flex flex-col p-6 gap-6 w-full">
        </div>
    )

}

const ActiveElement = ({ activeTab }) => {
    switch (activeTab) {
        case "Basic": return <Basic />
        case "Text": return <Text />
        case "Navigation": return <Navigation />
        case "Header": return <Header />
        case "Services": return <Services />
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
    const [_ignore, [isToggledRelative, setIsToggledRelative]] = useContext(SettingsContext);
    const [activeTab, setActiveTab] = useState("Basic");


    // TODO create backgrounds with images, and image upload for there sections


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
                    <ActiveElement activeTab={activeTab} />
                </div>
            </div>

        </>
    )
}

export default Sections