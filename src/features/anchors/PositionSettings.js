import React, {useState, useContext} from "react";
import Draggable from "react-draggable";
import {ElementContext} from "./Anchor"
import CloseIcon from "../../assets/svgs/closeIcon.svg"

const PositionSettings = ({ isActive, setIsActive, className }) => {
    const [isDraggable, setIsDraggable] = useState(false);
    const { position, setPosition, setAlignItems, setJustifyContent, flexDirection, setFlexDirection } = useContext(ElementContext);

    const toggleDirection = () => {
        (flexDirection === "row") ? setFlexDirection("column") : setFlexDirection("row");
    }

    return (
        <div className={className + (isActive ? "" : " hidden")}>
            <Draggable defaultPosition={{ x: 200, y: 100 }} disabled={isDraggable ? false : true}>
                <div className='w-80 h-[480px] shadow-xl flex-col shadow-black-900 bg-black-100 border-t-primary border-t-[12px] rounded-xl'>
                    <div onMouseDownCapture={() => setIsDraggable(true)} onMouseUp={() => setIsDraggable(false)} className='flex p-3 basis-[10%]  cursor-pointer flex-row items-center justify-between border-b border-black-600'>
                        <h1 className=' font-bold text-black-900'>Element Settings</h1>
                        <img src={CloseIcon} onClick={() => setIsActive(false)} className="w-8 cursor-pointer h-8" />
                    </div>

                    <div onMouseDown={() => setIsDraggable(false)} className="flex flex-col h-full basis-[90%] w-full relative">
                        <div className="basis-1/5 border-b p-6 border-black-600">
                            <button onClick={toggleDirection} className='bg-primary hover:bg-tertiary w-full h-full p-3 text-background rounded-md hover:brightness-90 uppercase'>{flexDirection}</button>
                        </div>

                        <div className="basis-1/5 p-4 border-b flex-col flex gap-2 border-black-600">
                            <h1 className=" text-black-900">Justify item</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <div onClick={() => { setJustifyContent("start"); setPosition("relative") }} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>S</div>
                                <div onClick={() => { setJustifyContent("center"); setPosition("relative") }} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>C</div>
                                <div onClick={() => { setJustifyContent("end"); setPosition("relative") }} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>E</div>
                            </div>

                        </div>

                        <div className="basis-1/5 p-4 border-b flex flex-col gap-2 border-black-600">
                            <h1 className=" text-black-900">Align item</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <div onClick={() => { setAlignItems("start"); setPosition("relative") }} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>S</div>
                                <div onClick={() => { setAlignItems("center"); setPosition("relative") }} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>C</div>
                                <div onClick={() => { setAlignItems("end"); setPosition("relative") }} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>E</div>
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