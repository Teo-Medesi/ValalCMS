import React, { useState, useEffect, useContext } from "react";
import Draggable from "react-draggable";
import { ElementContext } from "./Anchor"
import { ThisElementPositionContext } from "./elements/Element";
import CloseIcon from "../../assets/svgs/closeIcon.svg"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

const PositionSettings = ({ isActiveProp, elementData, className, context }) => {
    const [isActive, setIsActive] = isActiveProp;
    const [isDraggable, setIsDraggable] = useState(false);
    const { alignItems, justifyContent, flexDirection, setAlignItems, setJustifyContent, setFlexDirection, gap, setGap } = useContext(context);

    const toggleDirection = () => {
        (flexDirection === "row") ? setFlexDirection("column") : setFlexDirection("row");
    }

    const updatePosition = async () => {
        if (context === ThisElementPositionContext)
        {
            const elementRef = doc(db, `${elementData.path}/${elementData.id}`);
            await updateDoc(elementRef, { "properties.position.alignItems": alignItems, "properties.position.justifyContent": justifyContent, "properties.position.flexDirection": flexDirection, "properties.position.gap": gap });
        } else {
            const elementRef = doc(db, elementData.path);
            await updateDoc(elementRef, { "properties.position.alignItems": alignItems, "properties.position.justifyContent": justifyContent, "properties.position.flexDirection": flexDirection, "properties.position.gap": gap });
        }
    }

    useEffect(() => {
        if (elementData.path != null) {
            updatePosition();
        }
    }, [alignItems, justifyContent, flexDirection])

    return (
        <div className={className + (isActive ? "" : " hidden")}>
            <Draggable defaultPosition={{ x: 200, y: 100 }} disabled={isDraggable ? false : true}>
                <div className='w-80 shadow-xl flex-col shadow-black-900 bg-black-100 border-t-primary border-t-[12px] rounded-xl'>
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
                                <div title="start" onClick={() => setJustifyContent("start")} className={'rounded px-4 py-2 cursor-pointer ' + ((justifyContent === "start") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>S</div>
                                <div title="center" onClick={() => setJustifyContent("center")} className={'rounded px-4 py-2 cursor-pointer ' + ((justifyContent === "center") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>C</div>
                                <div title="end" onClick={() => setJustifyContent("end")} className={'rounded px-4 py-2 cursor-pointer ' + ((justifyContent === "end") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>E</div>
                                <div title="space-between" onClick={() => setJustifyContent("space-between")} className={'rounded px-4 py-2 cursor-pointer ' + ((justifyContent === "space-between") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>B</div>
                            </div>

                        </div>

                        <div className="basis-1/5 p-4 border-b flex flex-col gap-2 border-black-600">
                            <h1 className=" text-black-900">Align item</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <div title="start" onClick={() => setAlignItems("start")} className={'rounded px-4 py-2 cursor-pointer ' + ((alignItems === "start") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>S</div>
                                <div title="center" onClick={() => setAlignItems("center")} className={'rounded px-4 py-2 cursor-pointer ' + ((alignItems === "center") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>C</div>
                                <div title="end" onClick={() => setAlignItems("end")} className={'rounded px-4 py-2 cursor-pointer ' + ((alignItems === "end") ? " bg-primary text-white" : "hover:bg-black-700 bg-black-600")}>E</div>
                            </div>
                        </div>

                        <div className="basis-1/5 p-4 flex-col flex  border-black-600">

                            <h1 className=" text-black-900">Gap</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <input type="number" step={4} value={gap} onChange={event => setGap(event.target.value)} className='py-1 text-black-800 px-3 w-full outline-none border border-black-600 rounded-md' />
                            </div>

                        </div>

                    </div>
                </div>
            </Draggable>
        </div>
    )
}

export default PositionSettings