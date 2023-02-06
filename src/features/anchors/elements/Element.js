import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import Draggable from 'react-draggable'
import CloseIcon from "../../../assets/svgs/closeIcon.svg"
import ElementImport from "../../../components/ElementImport"
import { db } from '../../../firebase.config'


const Element = ({ setIsAnchorSelected, elementData, setPosition, position, setAlignItems, alignItems, setJustifyContent, justifyContent }) => {
    const [isSettingsActive, setIsSettingsActive] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const [marginTop, setMarginTop] = useState(elementData.marginTop)
    const [marginLeft, setMarginLeft] = useState(elementData.marginLeft)

    const [intervalId, setIntervalId] = useState("");
    const [marginToUpdate, setMarginToUpdate] = useState("");

    const elementRef = useRef(null);

    const updateMarginTop = async () => {
        setIntervalId(setInterval(() => {
            setMarginTop(current => current + 0.2);
            setMarginToUpdate("top");
        }, 20))
    }

    useEffect(() => {
        if (position != null && position === "relative")
        {
            setMarginTop(0);
            setMarginLeft(0);
        }
    }, [position])

    const updateMarginRight = async () => {
        setIntervalId(setInterval(() => {
            setMarginLeft(current => current - 0.2)
            setMarginToUpdate("left");
        }, 20));
    }

    const updateMarginBottom = async () => {
        setIntervalId(setInterval(() => {
            if (marginTop >= 0) setMarginTop(current => current - 0.2)
            setMarginToUpdate("top");
        }, 20));
    }

    const updateMarginLeft = async () => {
        setIntervalId(setInterval(() => {
            setMarginLeft(current => current + 0.2)
            setMarginToUpdate("left");
        }, 20));
    }

    const updateMargin = async (direction) => {
        const elementRef = doc(db, `${elementData.path}/${elementData.id}`);
        switch (direction) {
            case "top":
                await updateDoc(elementRef, { marginTop: marginTop });
                break;

            case "left":
                await updateDoc(elementRef, { marginLeft: marginLeft });
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick, true)
        document.addEventListener("mouseup", stopInterval, true)
    })

    const stopInterval = () => {
        updateMargin(marginToUpdate)
        clearInterval(intervalId);
        setIntervalId(null);
    }

    const updateElementPositionX = (id, newX) => {

    }

    const updateElementPositionY = (id, newY) => {

    }

    const handleClick = event => {
        setIsAnchorSelected(true);
        if (elementRef.current != null && !elementRef.current.contains(event.target)) {
            setIsSelected(false);
            setIsSettingsActive(false);
        }
        else {
            setIsSelected(true)
        }

    }

    // WHY NO COLUMN WORK AAA

    return (
        <div onMouseUp={stopInterval} ref={elementRef} style={{ marginTop: marginTop + "%", marginLeft: marginLeft + "%" }} onClick={() => setIsAnchorSelected(true)} className='pointer-events-auto z-30 flex w-full h-full' onAuxClick={() => setIsSettingsActive(true)} >
                <ElementSettings setAlignItems={setAlignItems} setJustifyContent={setJustifyContent} setPosition={setPosition} updatePositionX={updateElementPositionX} updatePositionY={updateElementPositionY} id={elementData.id} className="absolute z-30" isActive={isSettingsActive} setIsActive={setIsSettingsActive} />
            <div style={{width: "100%", flexDirection:  'column', justifyContent: justifyContent, alignItems: alignItems}} className='relative flex'>
                <div className={'cursor-pointer absolute w-max p-1 border-4 border-transparent z-20 ' + (isSelected ? "border-tertiary" : "")}>
                    <div className={isSelected ? "" : "hidden"}>
                        <div onMouseDown={updateMarginTop} className="w-6 h-6 absolute left-1/2 bottom-full -top-[14px] rounded-full bg-white border-[3px] border-tertiary"></div>
                        <div onMouseDown={updateMarginRight} style={{ left: "calc(100% - 10px)" }} className="w-6 h-6 absolute rounded-full bg-white border-[3px] border-tertiary"></div>
                        <div onMouseDown={updateMarginBottom} style={{ top: "calc(100% - 10px)" }} className="w-6 h-6 absolute left-1/2 rounded-full bg-white border-[3px] border-tertiary"></div>
                        <div onMouseDown={updateMarginLeft} className="w-6 h-6 -left-[13px] absolute rounded-full bg-white border-[3px] border-tertiary"></div>
                    </div>
                    <ElementImport elementName={elementData.component} />
                </div>
            </div>
        </div>
    )
}

const ElementSettings = ({ isActive, setIsActive, className, updatePositionX, updatePositionY, setPosition, id, setAlignItems, setJustifyContent }) => {
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
                                <div onClick={() => {setJustifyContent("start"); setPosition("relative")}} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>S</div>
                                <div onClick={() => {setJustifyContent("center"); setPosition("relative")}} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>C</div>
                                <div onClick={() => {setJustifyContent("end"); setPosition("relative")}} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>E</div>
                            </div>

                        </div>

                        <div className="basis-1/5 p-4 border-b flex flex-col gap-2 border-black-600">
                            <h1 className=" text-black-900">Align vertically</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <div onClick={() => {setAlignItems("start"); setPosition("relative")}}  className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>S</div>
                                <div onClick={() => {setAlignItems("center"); setPosition("relative")}} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>C</div>
                                <div onClick={() => {setAlignItems("end"); setPosition("relative")}} className='rounded px-4 py-2 cursor-pointer hover:bg-black-700 bg-black-600'>E</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        </div>
    )
}



export default Element