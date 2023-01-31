import React, { useContext, useEffect, useRef, createContext, useState } from 'react'
import CloseIcon from "../../assets/svgs/closeIcon.svg"
import {ResizableBox } from 'react-resizable';
import GearIcon from "../../assets/svgs/gearIcon.svg"
import { useDrop } from 'react-dnd';
import { ChromePicker  } from 'react-color';
import Draggable from 'react-draggable';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { AnchorContext } from '../../pages/Home';
import ElementImport from '../../components/ElementImport';

export const ThisAnchorContext = createContext();

const AnchorSettings = ({ isActive, setIsActive, className, background }) => {

    const [isDraggable, setIsDraggable] = useState(false);
    const [isColorPickerActive, setIsColorPickerActive] = useState(false);
    // we are destructuring our background prop 
    const [backgroundColor, setBackgroundColor] = background;

    const handleColorChange = event => {
        if (event.target.value.length === 7)
        {
            setBackgroundColor(event.target.value);
        }
    }

    return (
        <div className={className + (isActive ? "" : " hidden")}>
            <Draggable defaultPosition={{x: 200, y: 100}}  disabled={isDraggable ? false : true}>
                <div className='w-80 h-[480px] shadow-xl flex-col shadow-black-900 bg-black-100 border-t-primary border-t-[12px] rounded-xl'>
                    <div onMouseDownCapture={() => setIsDraggable(true)} onMouseUp={() => setIsDraggable(false)} className='flex p-3 basis-[10%]  cursor-pointer flex-row items-center justify-between border-b border-black-600'>
                        <h1 className=' font-bold text-black-900'>Anchor Settings</h1>
                        <img src={CloseIcon} onClick={() => setIsActive(false)} className="w-8 cursor-pointer h-8" />
                    </div>

                    <div onMouseDown={() => setIsDraggable(false)} className="flex flex-col h-full basis-[90%] w-full relative">
                        <ChromePicker color={backgroundColor} onChange={(color) => setBackgroundColor(color.hex)} className={'absolute right-40 z-20' + (isColorPickerActive ? "" : " hidden")}/>
                        <div className="basis-1/5 p-4 border-b flex-col flex  border-black-600">

                            <h1 className=" text-black-900">Background Color</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <input type="text" defaultValue={(backgroundColor != "") ? backgroundColor : "transparent"} onChange={handleColorChange} className='py-1 text-black-800 px-3 w-[88%] outline-none border border-black-600 rounded-md' />
                                <div onClick={() => setIsColorPickerActive(current => !current)} style={{background: backgroundColor}} className={"w-7 h-7 hover:border-secondary border-transparent border-2 cursor-pointer rounded-full" + ((backgroundColor === "") ? " border-secondary" : "" ) }></div>
                            </div>
                        
                        </div>
                            
                        <div className="basis-1/5 p-4 border-b flex flex-col  border-black-600">
                            <p className=' text-black-900'>blank</p>
                            <div className="flex flex-col justify-center h-full">
                                <input type="text" className='py-1 px-3 min-w-full text-black-900 outline-none border border-black-600 rounded-md' />
                            </div>
                        </div>
                        <div className="basis-1/5 p-4 border-b flex flex-col  border-black-600">
                            <p className=' text-black-900'>blank</p>
                            <div className="flex flex-col justify-center h-full">
                                <input type="text" className='py-1 px-3 min-w-full text-black-900 outline-none border border-black-600 rounded-md' />
                            </div>
                        </div>
                        <div className="basis-1/5 p-4 border-b border-black-600"></div>
                        <div className="basis-1/5 p-4"></div>
                    </div>

                </div>
            </Draggable>
        </div>
    )
}

const Anchor = ({ anchorData, component }) => {

    const [isSelected, setIsSelected] = useState(false);
    const [isSettingsActive, setIsSettingsActive] = useState(false);
    const [isAnchorSettingsActive, setIsAnchorSettingsActive] = useState(false);
    
    const [settingsPosition, setSettingsPosition] = useState({ x: 0, y: 0 })

    const [anchors, anchorsPath, fetchAnchors] = useContext(AnchorContext);

    const elementRef = useRef(null);
    const anchorRef = useRef(null);

    const [size, setSize] = useState({});
    const [backgroundColor, setBackgroundColor] = useState(anchorData.properties.backgroundColor);

    const [elementBasket, setElementBasket] = useState([]);

    const [{ isOverElement }, elementDropRef] = useDrop({
        accept: "element",
        drop: (item) => {
            addElement(item);
            console.log(item)
        },
        collect: (monitor) => ({ isOverElement: monitor.isOver() })
    })

    useEffect(() => {
        if (elementRef.current != null) {
            const anchorRef = doc(db, anchorData.path);
            if (anchorData.initialized == null || anchorData.initialized === false) {
                console.info("%c anchor initialized", "background: green;")
                updateDoc(anchorRef, { width: elementRef.current.clientWidth, height: elementRef.current.clientHeight, initialized: true }).then(() => {
                    fetchAnchors()
                    setSize({ width: elementRef.current.clientWidth, height: elementRef.current.clientHeight });
                });
            }
            else {
                setSize({ width: anchorData.width, height: anchorData.height })
            }


        }
    }, [elementRef.current])

    const fetchElements = async () => {
        const elementsRef = collection(db, `${anchorData.path}/elements`);
        const elementsSnap = await getDocs(elementsRef);
        setElementBasket(elementsSnap.docs.map(element => ({...element.data(), id: element.id})));
    }


    const addElement = component => {
        if (component.componentName !== "" && component.properties != null)
        {
            const elementsRef = collection(db, `${anchorData.path}/elements`);
            addDoc(elementsRef, {component: component.componentName, properties: component.properties}).then(() => fetchElements());
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick, true)
    })

    useEffect(() => {
        if (backgroundColor != null)
        {
            const anchorRef = doc(db, anchorData.path);
            updateDoc(anchorRef, {"properties.backgroundColor": backgroundColor}).then(() => fetchAnchors());
        }
    }, [backgroundColor])

    useEffect(() => {
        fetchElements();
    }, []);
    

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
            if (anchor.data().ID > deletedAnchorID) {
                await updateDoc(doc(db, `${anchorsPath}/${anchor.id}`), { ID: (anchor.data().ID - 1) });
            }
        })
    }

    const handleAuxClick = event => {
        event.preventDefault();
        setIsSettingsActive(true);
    }

    const handleClick = event => {
        if (anchorRef.current != null && !anchorRef.current.contains(event.target)) {
            setIsSelected(false);
            setIsSettingsActive(false);
        }
        else {
            setIsSelected(true)
        }

    }

    const handleMouseMovement = event => {
        if (!isSettingsActive) {
            setSettingsPosition({
                x: event.clientX - event.target.offsetLeft - 100,
                y: event.clientY - event.target.offsetTop - 20
            })
        }
    }

    const onResize = (event, { element, size, handle }) => {
        setSize({ width: size.width, height: size.height });
    };

    const onResizeStop = event => {
        const anchorRef = doc(db, anchorData.path);
        updateDoc(anchorRef, { width: size.width, height: size.height }).then(() => fetchAnchors());
    }

    const handleSettingsClick = event => {
        setIsAnchorSettingsActive(true);
        setIsSettingsActive(false);
    }

    // TODO problem is with drag offset
    const handleElementDrag = (event, id) => {
        console.log(`new x: ${event.clientX}`)
        const elementRef = doc(db, `${anchorData.path}/elements/${id}`);
        updateDoc(elementRef, {"properties.clientX" : event.clientX, "properties.clientY": event.clientY}).then(() => fetchElements());
    }

    if (component != null || component !== 0) {
        return (
            <ThisAnchorContext.Provider value={anchorData}>
                <div ref={anchorRef}>
                    <div className={'relative w-full h-full' + (isOverElement ? "border-4 border-secondary " : "") + (`max-h-[${anchorData.height}px] `) + (isSelected ? "border-[6px] border-secondary" : "border-transparent ")} ref={elementDropRef} onAuxClick={handleAuxClick} onMouseMove={handleMouseMovement} onContextMenu={(event) => event.preventDefault()}>

                        <div style={{ transform: `translate(${settingsPosition.x}px, ${settingsPosition.y}px)` }} className={'bg-black-100 w-40 flex border-t-primary border-t-4 flex-col rounded-md absolute z-10 ' + (isSettingsActive ? "" : "hidden")}>
                            <div onClick={() => deleteAnchor()} className='text-black-900 p-3 hover:bg-black-600 cursor-pointer items-center border-b border-b-black-700 flex flex-row justify-between'>
                                <p>Remove</p>
                                <img src={CloseIcon} className="w-7 h-7" />
                            </div>
                            <div onClick={handleSettingsClick} className='text-black-900 cursor-pointer p-3 hover:bg-black-600 hover:rounded-b-md flex flex-row items-center justify-between'>
                                <p>Settings</p>
                                <img src={GearIcon} className="w-6 h-6" />
                            </div>
                        </div>

                        {elementBasket.map((element, index) => <Draggable position={{x: element.properties.clientX, y: element.properties.clientY}} onStop={event => handleElementDrag(event, element.id)} key={index}><div className='cursor-pointer'><ElementImport elementName={element.component} /></div></Draggable>)}


                        <AnchorSettings className="absolute z-10" background={[backgroundColor, setBackgroundColor]} setIsActive={setIsAnchorSettingsActive} isActive={isAnchorSettingsActive}/>

                        <ResizableBox onResize={onResize} onResizeStop={onResizeStop} width={size.width} height={size.height} handle={<div className={'flex justify-center w-screen bg-secondary h-2 relative ' + (isSelected ? "" : "hidden")}><div className='w-8 h-8 absolute -top-3 cursor-pointer rounded-full border-secondary border-2 z-[2] bg-white'></div></div>}>
                            <div className='w-full h-full' style={{background: backgroundColor}} ref={elementRef}>{component}</div>
                        </ResizableBox>

                    </div>
                </div>
            </ThisAnchorContext.Provider>
        );
    }
}

export default Anchor