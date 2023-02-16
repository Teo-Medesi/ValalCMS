import React, { useContext, useEffect, useState } from "react";
import Drag from "../editing/Drag"
import { SettingsContext } from "./Settings";
import CloseIcon from "../../assets/svgs/closeIcon.svg"
import * as All from "../../layout/elements/ElementsExport"

const Text = () => {

    const [isDragging, setIsDragging] = useState(0);
    const [toggled, _ignore] = useContext(SettingsContext);
    const [isToggled, setIsToggled] = toggled;

    useEffect(() => {
      if (isDragging !== 0)
      {
        if (isDragging)
        {
            setIsToggled(false);
        }
      }
    }, [isDragging])
    

    return (
        <div className="flex flex-col p-6 gap-6">
            <Drag setIsDragging={setIsDragging} properties={{}} component={"Paragraph1"} type="element"><All.Paragraph1Preview /></Drag>
            <Drag setIsDragging={setIsDragging} properties={{}} component={"Paragraph1Bold"} type="element"><All.Paragraph1BoldPreview /></Drag>
            <Drag setIsDragging={setIsDragging} properties={{}} component={"Paragraph1"} type="element"><All.Paragraph1Preview /></Drag>
            <Drag setIsDragging={setIsDragging} properties={{}} component={"Paragraph1Bold"} type="element"><All.Paragraph1BoldPreview /></Drag>
        </div>
    )
}

const Images = () => {
    const [isDragging, setIsDragging] = useState(0);
    const [toggled, _ignore] = useContext(SettingsContext);
    const [isToggled, setIsToggled] = toggled;

    useEffect(() => {
      if (isDragging !== 0)
      {
        if (isDragging)
        {
            setIsToggled(false);
        }
      }
    }, [isDragging])

    return (
        <div className="flex flex-col p-6 gap-6">
            <Drag setIsDragging={setIsDragging} properties={{}} component={"ImageElement"} type="element"><All.ImageElementPreview /></Drag>
        </div>
    )
}

const Buttons = () => {

}

const ActiveElement = ({ activeTab }) => {
    switch (activeTab) {
        case "Text": return <Text />
        case "Images": return <Images />
        case "Buttons": return <Buttons />
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



const AddElements = () => {
    const [[isToggled, setIsToggled], _ignore] = useContext(SettingsContext);
    const [activeTab, setActiveTab] = useState("Text");

    const tabs = ["Text", "Images", "Button", "Strip", "Decorative", "Box", "Gallery", "Forms", "List", "Payments", "Input"]

    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-xl text-black-900'>Add Elements</h1>
                <img src={CloseIcon} onClick={() => setIsToggled(false)} className="w-12 cursor-pointer h-12" />
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

export default AddElements