import React, { useState } from 'react'
import { useEffect } from 'react'
import Draggable from 'react-draggable'
import CloseIcon from "../../../assets/svgs/closeIcon.svg"
import ElementImport from "../../../components/ElementImport"


const Element = ({ setIsAnchorSelected, elementData }) => {
    const [isSettingsActive, setIsSettingsActive] = useState(false);
    const [marginTop, setMarginTop] = useState(5)
    const [marginRight, setMarginRight] = useState(5)
    const [marginBottom, setMarginBottom] = useState(5)
    const [marginLeft, setMarginLeft] = useState(5)
    const [intervalId, setIntervalId] = useState("");

    const updateMarginTop = () => {
        setIntervalId(setInterval(() => {
            setMarginTop(current => current + 0.1)
            console.log(marginTop)
        }, 30));
    }

    const updateMarginRight = () => {
        setIntervalId(setInterval(() => {
            setMarginLeft(current => current - 0.1)
            console.log(marginRight)
        }, 30));
    }

    const updateMarginBottom = () => {
        setIntervalId(setInterval(() => {
            setMarginTop(current => current - 0.1)
            console.log(marginBottom)
        }, 30));
    }
    
    const updateMarginLeft = () => {
        setIntervalId(setInterval(() => {
            setMarginLeft(current => current + 0.1)
            console.log(marginLeft)
        }, 30));
    }


    const stopInterval = () => {
        console.warn("clear")
        clearInterval(intervalId);
        setIntervalId(null);
    }

    const updateElementPositionX = (id, newX) => {

    }

    const updateElementPositionY = (id, newY) => {

    }

    return (
        <div style={{ marginTop: marginTop + "%", marginLeft: marginLeft + "%" }} onClick={() => setIsAnchorSelected(true)} className='pointer-events-auto z-30 flex' onAuxClick={() => setIsSettingsActive(true)} >
            <div>
                <ElementSettings updatePositionX={updateElementPositionX} updatePositionY={updateElementPositionY} id={elementData.id} className="absolute z-30" isActive={isSettingsActive} setIsActive={setIsSettingsActive} />
            </div>
            <div className='relative'>
                <div className='cursor-pointer absolute w-max p-1 border-4 border-tertiary z-20'>
                    <div onMouseDown={updateMarginTop} onMouseLeave={stopInterval} onMouseUp={stopInterval} className="w-6 h-6 absolute left-1/2 bottom-full -top-[14px] rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginRight} onMouseLeave={stopInterval} onMouseUp={stopInterval} style={{ left: "calc(100% - 10px)" }} className="w-6 h-6 absolute rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginBottom} onMouseLeave={stopInterval} onMouseUp={stopInterval} style={{ top: "calc(100% - 10px)" }} className="w-6 h-6 absolute left-1/2 rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginLeft} onMouseLeave={stopInterval} onMouseUp={stopInterval} className="w-6 h-6 -left-[13px] absolute rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div><ElementImport elementName={elementData.component} /></div>
                </div>
            </div>
        </div>
    )
}

const ElementSettings = ({ isActive, setIsActive, className, updatePositionX, updatePositionY, id }) => {
    const [isDraggable, setIsDraggable] = useState(false);

    const handleUpdateX = (newX) => {
        updatePositionX(id, newX)
    }

    const handleUpdateY = (newY) => {
        updatePositionY(id, newY)
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
                        <div className="basis-1/5 p-4 border-b flex-col flex gap-2 border-black-600">
                            <h1 className=" text-black-900">Align horizontally</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <div onClick={() => handleUpdateX(25)} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>S</div>
                                <div onClick={() => handleUpdateX(50)} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>C</div>
                                <div onClick={() => handleUpdateX(75)} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>E</div>
                            </div>

                        </div>

                        <div className="basis-1/5 p-4 border-b flex flex-col gap-2 border-black-600">
                            <h1 className=" text-black-900">Align vertically</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <div className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>S</div>
                                <div className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>C</div>
                                <div className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>E</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        </div>
    )
}



export default Element