import React, { useContext, useEffect, useRef, useState } from 'react'
import CloseIcon from "./assets/images/svgs/closeIcon.svg"
import GearIcon from "./assets/images/svgs/gearIcon.svg"
import {useDrop } from 'react-dnd';
import { ProjectContext } from './Project';
import Draggable from 'react-draggable';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase.config';

const Anchor = ({anchorData, anchorPath}) => {
    
    const [isSettingsActive, setIsSettingsActive] = useState(false);
    const [settingsPosition, setSettingsPosition] = useState({x: 0, y: 0})

    const elementRef = useRef(null);
    const [height, setHeight] = useState(0);

    const [elementBasket, setElementBasket] = useState([<></>]);

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

    const deleteAnchor = async () => {
        const docRef = doc(db, anchorPath);
        await deleteDoc(docRef);
    }

    const handleAuxClick = event => {
        event.preventDefault();
        setIsSettingsActive(true);
    }

    const handleClick = event => {
        event.preventDefault();
        setIsSettingsActive(false);
    }

    const handleMouseMovement = event => {
        if (!isSettingsActive)
        {
            setSettingsPosition({
                x: event.clientX - event.target.offsetLeft,
                y: event.clientY - event.target.offsetTop
            })
        }
    }

    if (anchorData.element != null || anchorData.element !== 0)
    {
        return (
            <div className={'relative cursor-pointer border-y-4 border-transparent ' + (isOverElement ? "border-4 border-primary " : " ") + (`max-h-[${height}px]`)} ref={elementDropRef} onAuxClick={handleAuxClick} onMouseMove={handleMouseMovement} onContextMenu={(event) => event.preventDefault()} onClick={handleClick}>
                <div style={{transform: `translate(${settingsPosition.x}px, ${settingsPosition.y}px)`}}  className={'bg-black-100 w-40 flex border-t-primary border-t-4 flex-col rounded-md absolute z-10 ' + (isSettingsActive ? "" : "hidden")}>
                    <div onClick={() => deleteAnchor()} className='text-black-900 p-3 items-center border-b border-b-black-700 flex flex-row justify-between'>
                        <p>Remove</p>
                        <img src={CloseIcon} className="w-7 h-7"/>
                    </div>
                    <div className='text-black-900 p-3 flex flex-row items-center justify-between'>
                        <p>Settings</p>
                        <img src={GearIcon} className="w-6 h-6" />
                    </div>
                </div>
                {elementBasket.map((element, index) => <Draggable key={index}><div>{element}</div></Draggable>)}

                <div ref={elementRef}>{anchorData.element}</div>
            </div>
        ); 
    }
}

export default Anchor