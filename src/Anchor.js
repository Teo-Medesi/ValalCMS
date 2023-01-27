import React, { useContext, useEffect, useRef, useState } from 'react'
import CloseIcon from "./assets/images/svgs/closeIcon.svg"
import { Resizable, ResizableBox } from 'react-resizable';
import GearIcon from "./assets/images/svgs/gearIcon.svg"
import {useDrop } from 'react-dnd';
import { ProjectContext } from './Project';
import Draggable from 'react-draggable';
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase.config';
import { AnchorContext } from './Home';
import { createContext } from 'react';

export const ThisAnchorContext = createContext();

const ResizeHandle = () => {
    return (
        <div className='flex justify-center w-screen bg-secondary h-2 relative'><div className='w-8 h-8 absolute -top-3 cursor-pointer rounded-full border-secondary border-2 z-[2] bg-white'></div></div>
    )
}

const Anchor = ({anchorData, component}) => {
    
    const [isSelected, setIsSelected] = useState(false);
    const [isSettingsActive, setIsSettingsActive] = useState(false);
    const [settingsPosition, setSettingsPosition] = useState({x: 0, y: 0})

    const [anchors, anchorsPath, fetchAnchors] = useContext(AnchorContext);

    const elementRef = useRef(null);
    const anchorRef = useRef(null);

    const [size, setSize] = useState({});
    const [clientHeight, setClientHeight] = useState(0);
    
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
            const anchorRef = doc(db, anchorData.path);
            if (anchorData.initialized == null || anchorData.initialized === false)
            {
                console.log("anchor initialized")
                updateDoc(anchorRef, {width: elementRef.current.clientWidth, height: elementRef.current.clientHeight, initialized: true}).then(() => {
                    fetchAnchors()
                    setSize({width: elementRef.current.clientWidth, height: elementRef.current.clientHeight});
                });
            }
            else {
                console.log("fetching data");
                console.dir(anchorData.width, anchorData.height, anchorData.initialized)
                setSize({width: anchorData.width, height: anchorData.height})
            }

            
        }
    }, [elementRef.current])


    useEffect(() => {
        document.addEventListener("click", handleClick, true)
    })

    const deleteAnchor = async () => {
        const docRef = doc(db, anchorData.path);
        await sortAnchorsBeforeDelete();
        deleteDoc(docRef).then(() => {
            fetchAnchors()
        });
    }

    const sortAnchorsBeforeDelete = async () => {
        // [1, 2, 3, 4, 5] deleted [2] => [1, 3, 4, 5] => [1, 2, 3, 4]
        const anchorsRef = query(collection(db, anchorsPath), orderBy("ID"));
        const anchorsSnap = await getDocs(anchorsRef);

        anchorsSnap.forEach(async anchor => {
            // we want every anchor, which has an id higher than the deleted one
            const deletedAnchorID = anchorData.ID;
            if (anchor.data().ID > deletedAnchorID)
            {
                await updateDoc(doc(db, `${anchorsPath}/${anchor.id}`), {ID: (anchor.data().ID - 1)});
            }
        })
    }

    const handleAuxClick = event => {
        event.preventDefault();
        setIsSettingsActive(true);
    }

    const handleClick = event => {
        if (anchorRef.current != null && !anchorRef.current.contains(event.target))
        {
            setIsSelected(false);
            setIsSettingsActive(false);
        }
        else {
            setIsSelected(true)
        }

    }

    const handleMouseMovement = event => {
        if (!isSettingsActive)
        {
            setSettingsPosition({
                x: event.clientX - event.target.offsetLeft - 100,
                y: event.clientY - event.target.offsetTop - 20
            })
        }
    }

    const onResize = (event, {element, size, handle}) => {
        console.log("resize")
        setSize({width: size.width, height: size.height});
      };

     const onResizeStop = event => {
        const anchorRef = doc(db, anchorData.path);
        updateDoc(anchorRef, {width: size.width, height: size.height}).then(() => fetchAnchors());
     } 

    if (component != null || component !== 0)
    {
        return (
            <ThisAnchorContext.Provider value={anchorData}>
                    <div ref={anchorRef}>
                        <div className={'relative' + (isOverElement ? "border-4 border-secondary " : "border-transparent ") + (`max-h-[${anchorData.height}px] `) + (isSelected ? "border-[6px] border-secondary border-b-0" : "border-transparent ")} ref={elementDropRef} onAuxClick={handleAuxClick} onMouseMove={handleMouseMovement} onContextMenu={(event) => event.preventDefault()}>
                            <div style={{transform: `translate(${settingsPosition.x}px, ${settingsPosition.y}px)`}}  className={'bg-black-100 w-40 flex border-t-primary border-t-4 flex-col rounded-md absolute z-10 ' + (isSettingsActive ? "" : "hidden")}>
                                <div onClick={() => deleteAnchor()} className='text-black-900 p-3 cursor-pointer items-center border-b border-b-black-700 flex flex-row justify-between'>
                                    <p>Remove</p>
                                    <img src={CloseIcon} className="w-7 h-7"/>
                                </div>
                                <div className='text-black-900 cursor-pointer p-3 flex flex-row items-center justify-between'>
                                    <p>Settings</p>
                                    <img src={GearIcon} className="w-6 h-6" />
                                </div>
                            </div>
                            {elementBasket.map((element, index) => <Draggable key={index}><div>{element}</div></Draggable>)}
                            <ResizableBox onResize={onResize} onResizeStop={onResizeStop} width={size.width} height={size.height} handle={<div className={'flex justify-center w-screen bg-secondary h-2 relative ' + (isSelected ? "" : "hidden")}><div className='w-8 h-8 absolute -top-3 cursor-pointer rounded-full border-secondary border-2 z-[2] bg-white'></div></div>}>
                                <div className='w-full h-full' ref={elementRef}>{component}</div>
                            </ResizableBox>
                        </div>
                    </div>
            </ThisAnchorContext.Provider>
        ); 
    }
}

export default Anchor