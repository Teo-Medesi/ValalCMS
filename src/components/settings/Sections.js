import React, {useContext, useEffect, useState} from "react";
import Drag from "../Drag";
import Text1Preview from "./sections/Text1Preview";
import { SettingsContext } from "../../Settings";
import CloseIcon from "../../assets/images/svgs/closeIcon.svg"
import { ProjectContext } from "../../Project";
import Text1 from "./sections/Text1";
import Basic1 from "./sections/Basic1";
import Basic1Preview from "./sections/Basic1Preview";

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

const ActiveElement = ({activeTab}) => {
    switch (activeTab) {
        case "Basic": return <Basic />
        case "Text": return <Text />
        /* case "List": return <List />
        case "Form": return <Form />
        case "Welcome": return <Welcome />
        case "About": return <About />
        case "Team": return <Team />
        case "Contact": return <Contact />
        case "Promotion": return <Promotion />
        case "Services": return <Services />
        case "Subscribe": return <Subscribe />
        case "Testimonials": return <Testimonials />
        case "Bookings": return <Bookings />
        case "Events": return <Events /> */
    }
}

const Sections = () => {
    const [setIsToggled, setIsToggledRelative] = useContext(SettingsContext);    
    const [activeTab, setActiveTab] = useState("Text");

    const tabs = ["Basic", "Text", "List", "Form", "Welcome", "About", "Team", "Contact", "Promotion", "Services", "Subscribe", "Testimonials", "Bookings", "Events"]

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