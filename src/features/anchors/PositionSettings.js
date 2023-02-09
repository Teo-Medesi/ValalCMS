import React, {useState, useEffect, useContext} from "react";
import Draggable from "react-draggable";
import {ElementContext, ThisAnchorContext} from "./Anchor"
import CloseIcon from "../../assets/svgs/closeIcon.svg"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

const PositionSettings = ({ isActive, setIsActive, className }) => {
    const [isDraggable, setIsDraggable] = useState(false);
    const { position, alignItems, justifyContent, flexDirection, setPosition, setAlignItems, setJustifyContent, setFlexDirection } = useContext(ElementContext);
    const anchorData = useContext(ThisAnchorContext);

    const toggleDirection = () => {
        (flexDirection === "row") ? setFlexDirection("column") : setFlexDirection("row");
    }

    const updatePosition = async () => {
        const anchorRef = doc(db, anchorData.path);
        await updateDoc(anchorRef, {"properties.position.position": position, "properties.position.alignItems": alignItems, "properties.position.justifyContent": justifyContent, "properties.position.flexDirection": flexDirection});
    }

    useEffect(() => {
        if (anchorData.path != null)
        {
            updatePosition();
        }
    }, [position, alignItems, justifyContent, flexDirection])

    return (
        <div className={className + (isActive ? "" : " hidden")}>
            <Draggable defaultPosition={{ x: 200, y: 100 }} disabled={isDraggable ? false : true}>
                <div className='w-80 h-[480px] shadow-xl flex-col shadow-black-900 bg-black-100 border-t-primary border-t-[12px] rounded-xl'>
                    <div onMouseDownCapture={() => setIsDraggable(true)} onMouseUp={() => setIsDraggable(false)} className='flex p-3 basis-[10%]  cursor-pointer flex-row items-center justify-between border-b border-black-600'>
                        <h1 className=' font-bold text-black-900'>Position Settings</h1>
                        <img src={CloseIcon} onClick={() => setIsActive(false)} className="w-8 cursor-pointer h-8" />
                    </div>

                    <div onMouseDown={() => setIsDraggable(false)} className="flex flex-col h-full basis-[90%] w-full relative">
                        <div className="basis-1/5 border-b p-6 border-black-600">
                            <button onClick={toggleDirection} className='bg-primary hover:bg-tertiary w-full h-full p-3 text-background rounded-md hover:brightness-90 uppercase'>{flexDirection}</button>
                        </div>

                        <div className="basis-1/5 p-4 border-b flex-col flex gap-2 border-black-600">
                            <h1 className=" text-black-900">Justify item</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <div onClick={() => { setJustifyContent("start"); setPosition("relative") }} className={'rounded px-4 py-2 cursor-pointer ' + ((justifyContent === "start") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>S</div>
                                <div onClick={() => { setJustifyContent("center"); setPosition("relative") }} className={'rounded px-4 py-2 cursor-pointer ' + ((justifyContent === "center") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>C</div>
                                <div onClick={() => { setJustifyContent("end"); setPosition("relative") }} className={'rounded px-4 py-2 cursor-pointer ' + ((justifyContent === "end") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>E</div>
                            </div>

                        </div>

                        <div className="basis-1/5 p-4 border-b flex flex-col gap-2 border-black-600">
                            <h1 className=" text-black-900">Align item</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <div onClick={() => { setAlignItems("start"); setPosition("relative") }} className={'rounded px-4 py-2 cursor-pointer ' + ((alignItems === "start") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>S</div>
                                <div onClick={() => { setAlignItems("center"); setPosition("relative") }} className={'rounded px-4 py-2 cursor-pointer ' + ((alignItems === "center") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>C</div>
                                <div onClick={() => { setAlignItems("end"); setPosition("relative") }} className={'rounded px-4 py-2 cursor-pointer ' + ((alignItems === "end") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>E</div>
                            </div>
                        </div>

                        <div className="basis-1/5 border-b p-6 border-black-600">
                            <button className='bg-error w-full h-full p-3 text-background rounded-md hover:brightness-90'>Remove Element</button>
                        </div>
                    </div>
                </div>
            </Draggable>
        </div>
    )
}

export default PositionSettings