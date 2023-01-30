import React, {useContext, useState} from "react";
import Drag from "../editing/Drag"
import { SettingsContext } from "./Settings";
import CloseIcon from "../../assets/svgs/closeIcon.svg"
import Paragraph1Preview from "../../layout/elements/Paragraph1Preview";
import Paragraph1BoldPreview from "../../layout/elements/Paragraph1BoldPreview";
import Paragraph1 from "../../layout/elements/Paragraph1"
import Paragraph1Bold from "../../layout/elements/Paragraph1Bold"

const Text = () => {

    // aight, let's brainstorm a bit
    /*
        the text part of it is pretty damn simple, we'll make it the same way we did for section components

        now the tricky part is actually throwing the text into our page
        obviously the text would have to be of absolute positioning for a start, maybe later on we can work out some kind of grid for relative positioning
        

        to be able to drop it in, we'd have to make each section a drop zone
        this is the part that worries me for now, since our portfolio page is not thought out well enough, we'll skip past it for now, later on we will systematize the portfolio components
        
        making a drop functionality for each and every component individually, of which there will be hundreds, would be incredibly redundant and inefficient 
        therefore we need to create somekind of wrapper div that encapsulates all of our sections on an individual basis without us having to explicitly name them
        the best option for now seems to be the anchor component, every section is and will be a child of an anchor, therefore all of our logic should be handled there

        <div>
            {for each element in our drop basket return element}
            {children}
        </div>
    */
    return (
        <div className="flex flex-col p-6 gap-6">
            <Drag element={<Paragraph1 />} type="element"><Paragraph1Preview /></Drag>
            <Drag element={<Paragraph1Bold />} type="element"><Paragraph1BoldPreview /></Drag>
            <Drag element={<Paragraph1 />} type="element"><Paragraph1Preview /></Drag>
            <Drag element={<Paragraph1Bold />} type="element"><Paragraph1BoldPreview /></Drag>
            
        </div>
    )
}

const Images = () => {
    
}

const Buttons = () => {
    
}

const ActiveElement = ({activeTab}) => {
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
    const [setIsToggled] = useContext(SettingsContext);    
    const [activeTab, setActiveTab] = useState("Text");

    const tabs = ["Text", "Image", "Button", "Strip", "Decorative", "Box", "Gallery", "Forms", "List", "Payments", "Input"]

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
                    <ActiveElement activeTab={activeTab}/>
                </div>
            </div>


        </>
    )
}

export default AddElements