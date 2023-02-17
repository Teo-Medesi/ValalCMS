import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "./Settings";
import CloseIcon from "../../assets/svgs/closeIcon.svg"
import Drag from "../editing/Drag";

const Embed = () => {
    const [tempURL, setTempURL] = useState("");    
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



    if (tempURL != "" && tempURL.includes("http")) {
        return <Drag setIsDragging={setIsDragging} component={"Embed"} type="element" properties={{url: tempURL, width: "450px", height: "300px"}}><iframe src={tempURL} className="h-64 rounded-md" /></Drag>
    }
    else {
        return (
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Embed media</h1>
                <div className="border p-3 border-black-600 w-full rounded-md h-64">
                    <input onChange={event => setTempURL(event.target.value)} placeholder="enter your url here" className="text-2xl bg-transparent placeholder:italic outline-none text-black-600" />
                </div>
            </div>

        )
    }
}

const Media = () => {
    const [[isToggled, setIsToggled], _ignore] = useContext(SettingsContext);

    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-xl text-black-900'>Media</h1>
                <img src={CloseIcon} onClick={() => setIsToggled(false)} className="w-12 cursor-pointer h-12" />
            </div>
            <div className="p-6 min-h-screen flex flex-col gap-6 overflow-y-scroll">
                <div className="flex flex-col gap-6">
                    <Embed />

                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-lg text-black-800">https://www.youtube.com/watch?v=Pp6AUK9o0o0</h1>
                            <p className="text-black-700 italic">Don't embed media directly from the "watch" endpoint</p>
                        </div>

                        <div>
                            <h1 className="text-lg text-valid">https://www.youtube.com/embed/Pp6AUK9o0o0</h1>
                            <p className="text-black-700 italic">Instead of using "watch", replace the endpoint with "embed" (for youtube)</p>
                        </div>
                    </div>

                    <p className="text-black-800"><span className="bg-black-600 p-1 rounded">X-Frame-Options</span> is a response header set by the domain from which you are requesting media (youtube.com in this example). Youtube and most other HTTPS domains have the header set to <span className="bg-black-600 p-1 rounded">SAMEORIGIN</span>, which means that they have disallowed loading of the resource in an iframe outside of their domain. To embed media from other websites, please research how to import the <span className="bg-black-600 p-1 rounded">/embed</span> version of the media.</p>
                </div>
            </div>
        </>
    )
}

export default Media