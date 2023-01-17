import React, { useContext, useEffect, useRef, useState } from 'react'
import CloseIcon from "./assets/images/svgs/closeIcon.svg"
import GearIcon from "./assets/images/svgs/gearIcon.svg"
import {useDrop } from 'react-dnd';
import { ProjectContext } from './Project';
import Draggable from 'react-draggable';

const Anchor = () => {
    const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext);
    
    const [isSettingsActive, setIsSettingsActive] = useState(false);
    const [settingsPosition, setSettingsPosition] = useState({x: 0, y: 0})

    const elementRef = useRef(null);
    const [height, setHeight] = useState(0);

    const [element, setElement] = useState(0)
    const [elementBasket, setElementBasket] = useState([<></>]);
    
    const [{isOver}, dropRef] = useDrop({
        accept: "section",
        drop: (item) => {setElement(item)},
        collect: (monitor) => ({isOver: monitor.isOver()})
    })

    const [{isOverElement}, elementDropRef] = useDrop({
        accept: "element",
        drop: (item) => {
            setElementBasket(current => [...current, item]);
            console.log(elementBasket)
        }, 
        collect: (monitor) => ({isOverElement: monitor.isOver()})
    }) 

    useEffect(() => {
        if (elementRef.current != null)
        {
            setHeight(elementRef.current.clientHeight);
        }
    }, [elementRef.current])


    const handleAuxClick = event => {
        event.preventDefault();
        setIsSettingsActive(true);
        console.log(settingsPosition)
    }

    const handleClick = event => {
        event.preventDefault();
        setIsSettingsActive(false);
    }

    const handleMouseMovement = event => {
        if (!isSettingsActive)
        {
            setSettingsPosition({
                x: event.clientX - event.target.offsetLeft - 70,
                y: event.clientY - event.target.offsetTop - 200
            })
        }
    }

    if (element == null || element === 0)
    {
        return (
            <div ref={dropRef} className={'w-full flex justify-center items-center hover:brightness-75  p-6 text-2xl text-black-700 border-2 border-black-900 border-spacing-6 min-h-[150px] bg-black-100 ' + (isAnchorActive ? " " : "hidden ") + (isOver ? "brightness-75" : "")}>
                <div className='flex items-center justify-center w-full h-full border-2 border-black-700 border-dashed'>
                    <p>Drag and drop an element.</p>
                </div>
            </div>
          )
    }
    else {
        return (
            <div className={'relative cursor-pointer border-y-4 border-transparent ' + (isOverElement ? "border-4 border-primary " : " ") + (`max-h-[${height}px]`)} ref={elementDropRef} onAuxClick={handleAuxClick} onMouseMove={handleMouseMovement} onContextMenu={(event) => event.preventDefault()} onClick={handleClick}>
                <div style={{transform: `translate(${settingsPosition.x}px, ${settingsPosition.y}px)`}}  className={'bg-black-100 w-40 flex border-t-primary border-t-4 flex-col rounded-md absolute ' + (isSettingsActive ? "" : "hidden")}>
                    <div onClick={() => setElement(0)} className='text-black-900 p-3 items-center border-b border-b-black-700 flex flex-row justify-between'>
                        <p>Remove</p>
                        <img src={CloseIcon} className="w-7 h-7"/>
                    </div>
                    <div className='text-black-900 p-3 flex flex-row items-center justify-between'>
                        <p>Settings</p>
                        <img src={GearIcon} className="w-6 h-6" />
                    </div>
                </div>
                {elementBasket.map((element, index) => <Draggable key={index}><div>{element}</div></Draggable>)}

                <div ref={elementRef}>{element}</div>
            </div>
        ); 
    }
}

export default Anchor