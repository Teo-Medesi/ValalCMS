import React, { useContext, useEffect, useRef, createContext, useState } from 'react'
import { ResizableBox } from 'react-resizable';
import { useDrop } from 'react-dnd';
import { ChromePicker } from 'react-color';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { AnchorContext } from '../../pages/Home';
import Element from './elements/Element';
import PositionSettings from "./PositionSettings"
import Draggable from 'react-draggable';
import useWindowDimensions from './hooks/useWindowDimensions';
import CloseIcon from "../../assets/svgs/closeIcon.svg"
import GearIcon from "../../assets/svgs/gearIcon.svg"
import PositionIcon from "../../assets/svgs/positionIcon.svg"
import GroupIcon from "../../assets/svgs/groupIcon.svg"
import UngroupIcon from "../../assets/svgs/ungroupIcon.svg"

export const ThisAnchorContext = createContext();
export const ElementContext = createContext();

const Anchor = ({ anchorData, component }) => {

    const [isAnchorSelected, setIsAnchorSelected] = useState(false);
    const [isSettingsActive, setIsSettingsActive] = useState(false);
    const [isAnchorSettingsActive, setIsAnchorSettingsActive] = useState(false);
    const [isElementSettingsActive, setIsElementSettingsActive] = useState(false);
    const [isScreenOverlay, setIsScreenOverlay] = useState(false);
    const [visibleElementID, setVisibleElementID] = useState("");

    const { windowWidth, windowHeight } = useWindowDimensions();

    const [flexDirection, setFlexDirection] = useState("row");
    const [justifyContent, setJustifyContent] = useState("");
    const [alignItems, setAlignItems] = useState("");
    const [position, setPosition] = useState("relative");
    const [gap, setGap] = useState(0);

    const [isTempPositionActive, setIsTempPositionActive] = useState(false);
    const [tempPosition, setTempPosition] = useState({});
    const [settingsPosition, setSettingsPosition] = useState({ x: 0, y: 0 })

    const [paddingX, setPaddingX] = useState(0);
    const [paddingY, setPaddingY] = useState(0);

    const [anchors, anchorsPath, fetchAnchors] = useContext(AnchorContext);

    const [selectedElements, setSelectedElements] = useState([]);

    const elementRef = useRef(null);
    const anchorRef = useRef(null);
    const positionSettingsRef = useRef(null);
    const elementBasketRef = useRef(null);

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

    useEffect(() => {
        if (anchorData.properties.paddingX != null && anchorData.properties.paddingY != null) {
            setPaddingX(anchorData.properties.paddingX)
            setPaddingY(anchorData.properties.paddingY)
        }

        if (anchorData.properties.position != null) {
            if (anchorData.properties.position.justifyContent != null) setJustifyContent(anchorData.properties.position.justifyContent);
            if (anchorData.properties.position.alignItems != null) setAlignItems(anchorData.properties.position.alignItems);
            if (anchorData.properties.position.flexDirection != null) setFlexDirection(anchorData.properties.position.flexDirection);
            if (anchorData.properties.position.gap != null) setGap(anchorData.properties.position.gap);
        }
    }, [anchorData.properties])

    const updateOverlay = (state, id) => {

        if (state === true) {
            setIsScreenOverlay(true);
            setVisibleElementID(id);
        }
        else {
            setIsScreenOverlay(false)
            setVisibleElementID("");
        }
    }

    useEffect(() => {
        console.log(visibleElementID)
        console.log(elementBasket)
        elementBasket.map(element => {
            console.log(element.id)
        })
    }, [visibleElementID])

    const fetchElements = async () => {
        const elementsRef = query(collection(db, `${anchorData.path}/elements`), orderBy("ID"));
        const elementsSnap = await getDocs(elementsRef);
        setElementBasket(elementsSnap.docs.map(element => { return { ...element.data(), id: element.id } }));
        setIsTempPositionActive(false);

    }


    const addElement = component => {
        if (component.componentName !== "" && component.properties != null) {
            const elementsRef = collection(db, `${anchorData.path}/elements`);
            addDoc(elementsRef, { component: component.componentName, properties: component.properties, path: `${anchorData.path}/elements`, ID: 0 }).then(() => fetchElements());
        }
    }

    const groupElements = () => {
        setIsSettingsActive(false);
        if (selectedElements.length > 1) {
            // first we need to delete the elements we are grouping
            // now we need to create a new element, it's component will be equal to "multiple" 
            // displaying the new group of elements as one will be done in Element.js
            // element -> subElements -> the IDs of our selected elements

            const elementsRef = collection(db, `${anchorData.path}/elements`);
            addDoc(elementsRef, { component: "Multiple", properties: { isGroup: true }, path: `${anchorData.path}/elements` }).then(docRef => {

                selectedElements.forEach((element, index) => {
                    deleteDoc(doc(db, `${element.path}/${element.id}`)).then(() => fetchElements());
                    setDoc(doc(db, `${anchorData.path}/elements/${docRef.id}/subElements/${element.id}`), { component: element.component, properties: element.properties, id: element.id, path: `${anchorData.path}/elements/${docRef.id}/subElements`, ID: index }).then(() => fetchElements())
                });

            }).then(() => fetchElements());

            alert("Please refresh to see changes. Having some problems with firestore calls :(")
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick, true)
    }, [])

    useEffect(() => {
        if (backgroundColor != null) {
            const anchorRef = doc(db, anchorData.path);
            updateDoc(anchorRef, { "properties.backgroundColor": backgroundColor }).then(() => fetchAnchors());
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
        if (event.repeat) return;

        if (anchorRef.current != null && !anchorRef.current.contains(event.target) && !positionSettingsRef.current.contains(event.target) && !elementBasketRef.current.contains(event.target)) {
            setIsAnchorSelected(false);
            setIsSettingsActive(false);
            setSelectedElements([]);
        }
        else {
            setIsAnchorSelected(true)
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
        setSize({ width: size.width + "px", height: size.height + "px" });
    };

    const onResizeStop = event => {
        const anchorRef = doc(db, anchorData.path);
        updateDoc(anchorRef, { width: size.width + "px", height: size.height + "px" }).then(() => fetchAnchors());
    }

    const handleSettingsClick = event => {
        setIsAnchorSettingsActive(true);
        setIsSettingsActive(false);
    }


    // we need to let go of our old idea of how we should position elements, enough of Y, more of X
    /* 
        My current idea seems pretty good. Why make our own positioning system when we can use flexbox or plain css?
        We can make a element div that is positioned directly above our anchor (higher z-index) make it's width and height equal to section and make it absolute,
        then we give it a transparent background.

        The problem I'm thinking of right now is interactability with the base section. If we have a wrapper div directly above our base section, how will
        we interact with it?
    */

    if (component != null || component !== 0) {
        return (
            <ThisAnchorContext.Provider value={anchorData}>

                <div className='relative'>

                    <ElementContext.Provider value={{ isScreenOverlay, visibleElementID, updateOverlay, fetchElements, selectedElements, setSelectedElements, justifyContent, setJustifyContent, alignItems, setAlignItems, position, setPosition, setIsAnchorSelected, flexDirection, setFlexDirection, gap, setGap }}>
                        <div ref={elementBasketRef} style={{ flexWrap: "wrap", width: "100%", paddingTop: paddingY + "px", paddingBottom: paddingY + "px", paddingLeft: paddingX + "px", paddingRight: paddingX + "px", height: size.height, flexDirection: flexDirection, justifyContent: justifyContent, alignItems: alignItems, gap: gap + "px" }} onContextMenu={event => event.preventDefault()} className="bg-transparent pointer-events-none absolute flex">
                            {elementBasket.map((element, index) => <Element elementData={element} key={index} />)}
                        </div>
                        <div ref={positionSettingsRef}><PositionSettings className="absolute pointer-events-auto z-40" isActiveProp={[isElementSettingsActive, setIsElementSettingsActive]} elementData={anchorData} context={ElementContext} /></div>
                    </ElementContext.Provider>

                    <div className='pointer-events-auto z-50' ref={anchorRef}>
                        <div className={'relative w-full h-full ' + (isOverElement ? "border-4 border-secondary " : "") + (`max-h-[${anchorData.height}px] `) + (isAnchorSelected ? "border-[6px] border-secondary" : "border-transparent ")} ref={elementDropRef} onAuxClick={handleAuxClick} onMouseMove={handleMouseMovement} onContextMenu={(event) => event.preventDefault()}>

                            <div style={{ left: settingsPosition.x, top: "20px" }} className={'bg-black-100 w-40 flex border-t-4 flex-col rounded-md absolute z-40 ' + (isSettingsActive ? " " : "hidden ") + ((selectedElements.length > 1) ? "border-t-valid" : "border-t-primary")}>

                                <div onClick={groupElements} className={'text-black-900 cursor-pointer p-3 hover:bg-black-600 hover:rounded-b-md border-b border-b-valid flex flex-row items-center justify-between ' + ((selectedElements.length > 1) ? "" : "hidden")}>
                                    <p>Group</p>
                                    <img src={GroupIcon} className="w-6 h-6" />
                                </div>
                                <div className={'text-black-900 cursor-pointer p-3 hover:bg-black-600 hover:rounded-b-md flex flex-row items-center justify-between ' + ((selectedElements.length > 1) ? "" : "hidden")}>
                                    <p>Ungroup</p>
                                    <img src={UngroupIcon} className="w-5 h-5" />
                                </div>
                                <div onClick={() => deleteAnchor()} className={'text-black-900 p-3 hover:bg-black-600 cursor-pointer items-center border-b border-b-black-700 flex flex-row justify-between ' + ((selectedElements.length > 1) ? "hidden" : "")}>
                                    <p>Remove</p>
                                    <img src={CloseIcon} className="w-7 h-7" />
                                </div>
                                <div onClick={handleSettingsClick} className={'text-black-900 cursor-pointer p-3 hover:bg-black-600 hover:rounded-b-md border-b border-b-black-700 flex flex-row items-center justify-between ' + ((selectedElements.length > 1) ? "hidden" : "")}>
                                    <p>Settings</p>
                                    <img src={GearIcon} className="w-6 h-6" />
                                </div>
                                <div onClick={() => { setIsElementSettingsActive(true); setIsSettingsActive(false) }} className={'text-black-900 cursor-pointer p-3 hover:bg-black-600 hover:rounded-b-md flex flex-row items-center justify-between ' + ((selectedElements.length > 1) ? "hidden" : "")}>
                                    <p>Position</p>
                                    <img src={PositionIcon} className="w-6 h-6" />
                                </div>

                            </div>

                            <AnchorSettings className="absolute z-40" sizeProp={[size, setSize]} paddingXProp={[paddingX, setPaddingX]} paddingYProp={[paddingY, setPaddingY]} background={[backgroundColor, setBackgroundColor]} setIsActive={setIsAnchorSettingsActive} isActive={isAnchorSettingsActive} />
                            <div className='w-full h-full' style={{ background: backgroundColor, height: size.height }} ref={elementRef}>{component}</div>
                        </div>
                    </div>

                </div>
            </ThisAnchorContext.Provider>
        );
    }
}

const AnchorSettings = ({ isActive, setIsActive, className, background, paddingXProp, paddingYProp, sizeProp }) => {

    const [isDraggable, setIsDraggable] = useState(false);
    const [isColorPickerActive, setIsColorPickerActive] = useState(false);

    const anchorData = useContext(ThisAnchorContext);

    // we are destructuring our background prop 
    const [backgroundColor, setBackgroundColor] = background;
    const [paddingX, setPaddingX] = paddingXProp;
    const [paddingY, setPaddingY] = paddingYProp
    const [size, setSize] = sizeProp;

    const handleColorChange = event => {
        if (event.target.value.length === 7) {
            setBackgroundColor(event.target.value);
        }
    }

    const handleClose = async () => {
        setIsActive(false);

        const anchorRef = doc(db, anchorData.path);
        await updateDoc(anchorRef, { "properties.paddingX": paddingX, "properties.paddingY": paddingY, height: size.height });
    }

    return (
        <div className={className + (isActive ? "" : " hidden")}>
            <Draggable defaultPosition={{ x: 200, y: 100 }} disabled={isDraggable ? false : true}>
                <div className='w-80 h-[480px] shadow-xl flex-col shadow-black-900 bg-black-100 border-t-primary border-t-[12px] rounded-xl'>
                    <div onMouseDownCapture={() => setIsDraggable(true)} onMouseUp={() => setIsDraggable(false)} className='flex p-3 basis-[10%]  cursor-pointer flex-row items-center justify-between border-b border-black-600'>
                        <h1 className=' font-bold text-black-900'>Anchor Settings</h1>
                        <img src={CloseIcon} onClick={handleClose} className="w-8 cursor-pointer h-8" />
                    </div>

                    <div onMouseDown={() => setIsDraggable(false)} className="flex flex-col h-full basis-[90%] w-full relative">
                        <ChromePicker color={backgroundColor} onChange={(color) => setBackgroundColor(color.hex)} className={'absolute right-40 z-20' + (isColorPickerActive ? "" : " hidden")} />
                        <div className="basis-1/5 p-4 border-b flex-col flex  border-black-600">

                            <h1 className=" text-black-900">Background Color</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <input type="text" defaultValue={(backgroundColor != "") ? backgroundColor : "transparent"} onChange={handleColorChange} className='py-1 text-black-800 px-3 w-[88%] outline-none border border-black-600 rounded-md' />
                                <div onClick={() => setIsColorPickerActive(current => !current)} style={{ background: backgroundColor }} className={"w-7 h-7 hover:border-secondary border-transparent border-2 cursor-pointer rounded-full" + ((backgroundColor === "") ? " border-secondary" : "")}></div>
                            </div>

                        </div>

                        <div className="basis-1/5 p-4 gap-4 border-b flex flex-col  border-black-600">
                            <p className=' text-black-900'>Padding</p>
                            <div className="flex flex-col justify-between h-full">
                                <div className='flex flex-row justify-between'>
                                    <div className='basis-[46%] flex gap-2 flex-row items-center justify-between'>
                                        <p>x</p>
                                        <div className='flex flex-row items-center gap-1'>
                                            <button onClick={() => setPaddingX(current => current - 4)} className='text-xl bg-black-600 hover:bg-black-700 rounded p-1 px-3'>-</button>
                                            <input onChange={event => setPaddingX(event.target.value)} value={paddingX} type="text" className='text-center p-1 w-full h-full text-black-900 outline-none border border-black-600 rounded' />
                                            <button onClick={() => setPaddingX(current => current + 4)} className='text-lg bg-black-600 rounded p-1 px-3 hover:bg-black-700'>+</button>
                                        </div>
                                    </div>
                                    <div className='basis-[46%] flex gap-2 flex-row items-center justify-between'>
                                        <p>y</p>
                                        <div className='flex flex-row items-center gap-1'>
                                            <button onClick={() => setPaddingY(current => current - 4)} className='text-xl bg-black-600 rounded p-1 px-3 hover:bg-black-700'>-</button>
                                            <input onChange={event => setPaddingY(event.target.value)} value={paddingY} type="text" className='text-center p-1 h-full w-full text-black-900 outline-none border border-black-600 rounded' />
                                            <button onClick={() => setPaddingY(current => current + 4)} className='text-lg bg-black-600 rounded p-1 px-3 hover:bg-black-700'>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="basis-1/5 p-4 gap-4 border-b flex flex-col  border-black-600">
                            <p className=' text-black-900'>Size</p>
                            <div className='flex flex-row justify-between'>
                                <div className='basis-[46%] flex gap-2 flex-row items-center justify-between'>
                                    <p>height</p>
                                    <div className='flex flex-row items-center gap-1'>
                                        <input onChange={event => setSize(current => ({ ...current, height: event.target.value }))} value={size.height} type="text" className='text-center p-1 w-full h-full text-black-900 outline-none border border-black-600 rounded' />
                                    </div>
                                </div>
                                <div className='basis-[46%] flex gap-2 flex-row items-center justify-between'>
                                    <p>width</p>
                                    <div className='flex flex-row items-center gap-1'>
                                        <input title="sections take up screen width" value={"screen"} type="text" className='text-center p-1 h-full w-full text-black-700 italic outline-none border border-black-600 rounded' />
                                    </div>
                                </div>
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

export default Anchor
