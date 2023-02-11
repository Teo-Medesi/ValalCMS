import { doc, getDocs, updateDoc, collection, deleteDoc } from 'firebase/firestore'
import React, { useContext, useState, createContext } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import ElementImport from "../../../components/ElementImport"
import { db } from '../../../firebase.config'
import { ElementContext } from '../Anchor'
import Draggable from "react-draggable"
import CloseIcon from "../../../assets/svgs/closeIcon.svg"
import { ChromePicker } from 'react-color'
import TextSettings from '../../editing/TextSettings'


export const ThisElementContext = createContext();

const Element = ({ elementData, isSubElement }) => {
    const { position, selectedElements, setSelectedElements } = useContext(ElementContext);

    const [isGroup, setIsGroup] = useState(false);
    const [isSettingsActive, setIsSettingsActive] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isMultipleSelected, setIsMultipleSelected] = useState(false);

    const [marginTop, setMarginTop] = useState(elementData.marginTop)
    const [marginLeft, setMarginLeft] = useState(elementData.marginLeft)

    const [background, setBackground] = useState("transparent");
    const [paddingX, setPaddingX] = useState(0);
    const [paddingY, setPaddingY] = useState(0);
    const [borderRadius, setBorderRadius] = useState(0);

    const [font, setFont] = useState("");
    const [fontSize, setFontSize] = useState(16)
    const [fontColor, setFontColor] = useState("");

    const [intervalId, setIntervalId] = useState("");
    const [marginToUpdate, setMarginToUpdate] = useState("");

    const [isShiftPressed, setIsShiftPressed] = useState(false);

    const [subElements, setSubElements] = useState([]);

    const elementRef = useRef(null);

    const updateMarginTop = async () => {
        setIntervalId(setInterval(() => {
            setMarginTop(current => current + 0.2);
            setMarginToUpdate("top");
        }, 20))
    }

    useEffect(() => {
        if (position != null && position === "relative") {
            setMarginTop(0);
            setMarginLeft(0);
        }
    }, [position])

    useEffect(() => {
        (selectedElements.length > 1) ? setIsMultipleSelected(true) : setIsMultipleSelected(false);
    }, [selectedElements])

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

    // Jesus Christ if only somebody told me sooner: UPDATED STATE CANNOT BE ACCESSED INSIDE OF AN EVENT HANDLER CALLBACK FUNCTION! 
    // If the event listener is attached to the callback on the initial render, it will only have access to the initial value of state!!!
    // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
    // In my case I'm just adding the event

    
    const fetchSubElements = async () => {
        if (elementData.component === "Multiple")
        {
            const subElementsRef = collection(db, `${elementData.path}/${elementData.id}/subElements`);
            const subElementsSnap = await getDocs(subElementsRef);
            setSubElements(subElementsSnap.docs.map(element => { return { ...element.data(), id: element.id } }));
            console.log(subElementsSnap.docs.map(element => { return { ...element.data(), id: element.id } }))
        }
    }

    useEffect(() => {
        if (elementData != null)
        {
            fetchSubElements();
            
            if (elementData.properties.background != null) setBackground(elementData.properties.background);
            if (elementData.properties.borderRadius != null) setBorderRadius(elementData.properties.borderRadius);
            if (elementData.properties.paddingX != null) setPaddingX(elementData.properties.paddingX);
            if (elementData.properties.paddingY != null) setPaddingY(elementData.properties.paddingY);
            if (elementData.properties.isGroup != null) setIsGroup(elementData.properties.isGroup);
            if (elementData.properties.font != null) setFont(elementData.properties.font);
            if (elementData.properties.fontColor != null) setFontColor(elementData.properties.fontColor);
            if (elementData.properties.fontSize != null) setFontSize(elementData.properties.fontSize);
            
        }
    }, [])
    
    useEffect(() => {
        document.addEventListener("mousedown", handleClick, true)
        document.addEventListener("mouseup", stopInterval, true)
        
        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)

        return () => {
            document.removeEventListener("mousedown", handleClick, true)
            document.removeEventListener("mouseup", stopInterval, true)
            
            document.removeEventListener("keydown", handleKeyDown, true)
            document.removeEventListener("keyup", handleKeyUp, true)
        }
    }, [isShiftPressed, selectedElements])

    const handleKeyDown = event => {
        if (event.repeat) return;
        if (event.key === "Shift") {
            setIsShiftPressed(true);
        }
        else if (event.key === "Enter")
        {
            if (elementRef.current != null && elementRef.current.contains(event.target))
            {
                setIsSelected(true);
            } else {
                setIsSelected(false);
            }
        }
        
    }

    const handleKeyUp = event => {
        setIsShiftPressed(false);
        if (event.repeat) return;

    }

    const stopInterval = () => {
        clearInterval(intervalId);
        setIntervalId(null);

        updateMargin(marginToUpdate)
    }

    const handleClick = event => {
        if (elementRef.current != null && !elementRef.current.contains(event.target)) {
            if (!isShiftPressed && selectedElements.length <= 1) {
                setIsSelected(false);
            }
        }
    }

    const selectElement = () => {
        setIsSelected(true);
        if (!selectedElements.includes(elementData)) {
            if (selectedElements.length === 0 || isShiftPressed)
            {
                setSelectedElements(current => [...current, elementData]);
            }
        }
    }

    // don't forget that you need to set pointer events to auto

    return (
        <ThisElementContext.Provider value={elementData}>
            <div onAuxClick={() => setIsSettingsActive(true)} onClick={selectElement} ref={elementRef} style={{ marginTop: marginTop + "%", marginLeft: marginLeft + "%" }} className={'cursor-pointer pointer-events-auto z-30 flex w-max h-max p-1 border-4 ' + ((isSelected && !isSubElement && isGroup) ? "border-valid " : (isSelected && !isSubElement) ? "border-tertiary " : "border-transparent ") + (position)}>
                <div className={(isSelected && !isMultipleSelected && !isShiftPressed) ? "hidden" : "hidden"}>
                    <div onMouseDown={updateMarginTop} className="w-6 h-6 absolute left-[45%] bottom-full -top-[14px] rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginRight} style={{ left: "calc(100% - 10px)" }} className="w-6 h-6 absolute rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginBottom} style={{ top: "calc(100% - 10px)" }} className="w-6 h-6 absolute left-[45%] rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginLeft} className="w-6 h-6 -left-[13px] absolute rounded-full bg-white border-[3px] border-tertiary"></div>
                </div>
                <div style={{userSelect: (isShiftPressed ? "none" : "auto"), borderRadius: borderRadius + "px", background: background, fontFamily: font, fontSize: fontSize + "px", color: fontColor, paddingLeft: paddingX + "px", paddingRight: paddingX + "px", paddingTop: paddingY + "px", paddingBottom: paddingY + "px"}} tabIndex={0} className="flex flex-row"><ImportElement subElements={subElements} elementData={elementData}/></div>
            </div>
            <ElementSettings className="absolute z-40 pointer-events-auto" font={[font, setFont]} fontColor={[fontColor, setFontColor]} fontSize={[fontSize, setFontSize]} elementData={elementData} isGroup={isGroup} borderRadiusProp={[borderRadius, setBorderRadius]} background={[background, setBackground]} paddingXProp={[paddingX, setPaddingX]} setIsActive={setIsSettingsActive} isActive={(isSubElement) ? false : isSettingsActive} paddingYProp={[paddingY, setPaddingY]} />
        </ThisElementContext.Provider>
    )
}

Element.defaultProps = {
    isSubElement: false
}

const ImportElement = ({elementData, subElements}) => {
    if (elementData.component === "Multiple" && subElements != [])
    {
        return subElements.map(element => <Element isSubElement={true} elementData={element} />)
    }
    else {
        return <ElementImport elementName={elementData.component}/>
    }
}


const ElementSettings = ({elementData, isActive, setIsActive, className, background, paddingXProp, paddingYProp, borderRadiusProp, isGroup, font, fontSize, fontColor}) => {    
    const {fetchElements} = useContext(ElementContext);

    const [isTextSettingsActive, setIsTextSettingsActive] = useState(false);
    
    const [isDraggable, setIsDraggable] = useState(false);
    const [isColorPickerActive, setIsColorPickerActive] = useState(false);

    // we are destructuring our props 
    const [backgroundColor, setBackgroundColor] = background;
    const [paddingX, setPaddingX] = paddingXProp;
    const [paddingY, setPaddingY] = paddingYProp;
    const [borderRadius, setBorderRadius] = borderRadiusProp;

    const handleColorChange = event => {
        if (event.target.value.length === 7) {
            setBackgroundColor(event.target.value);
        }
    }

    const handleClose = async () => {
        setIsActive(false);

        const elementRef = doc(db, `${elementData.path}/${elementData.id}`);
        await updateDoc(elementRef, {"properties.paddingX": paddingX, "properties.paddingY": paddingY, "properties.background": backgroundColor, "properties.borderRadius": borderRadius});
    }

    const deleteElement = () => {
        const elementRef = doc(db, `${elementData.path}/${elementData.id}`);
        deleteDoc(elementRef).then(() => fetchElements());
    }


    return (
        <>
        <div className={className + (isActive ? "" : " hidden")}>
            <Draggable defaultPosition={{ x: 200, y: 100 }} disabled={isDraggable ? false : true}>
                <div className='w-80 h-[480px] shadow-xl flex-col shadow-black-900 bg-black-100 border-t-[12px] rounded-xl border-t-primary'>
                    <div onMouseDownCapture={() => setIsDraggable(true)} onMouseUp={() => setIsDraggable(false)} className='flex p-3 basis-[10%]  cursor-pointer flex-row items-center justify-between border-b border-black-600'>
                        <h1 className=' font-bold text-black-900'>Element Settings</h1>
                        <img src={CloseIcon} onClick={handleClose} className="w-8 cursor-pointer h-8" />
                    </div>

                    <div onMouseDown={() => setIsDraggable(false)} className="flex flex-col h-full basis-[90%] w-full relative">
                        <ChromePicker color={backgroundColor} onChange={(color) => setBackgroundColor(color.hex)} className={'absolute right-40 z-20' + (isColorPickerActive ? "" : " hidden")} />
                        <div className="basis-1/5 p-4 border-b flex-col flex  border-black-600">

                            <h1 className=" text-black-900">Background Color</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <input type="text" defaultValue={(backgroundColor != "") ? backgroundColor : "transparent"} onChange={handleColorChange} className='py-1 text-black-800 px-3 w-[88%] outline-none border border-black-600 rounded-md' />
                                <div onClick={() => setIsColorPickerActive(current => !current)} style={{ background: backgroundColor }} className={"w-7 h-7 hover:border-secondary border-2 cursor-pointer rounded-full " + ((backgroundColor === "transparent") ? "border-secondary" : "border-transparent")}></div>
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
                        <div className="basis-1/5 p-4 border-b flex-col flex  border-black-600">

                            <h1 className=" text-black-900">Border-radius</h1>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <input type="number" value={borderRadius} onChange={event => setBorderRadius(event.target.value)} step={4} className='py-1 text-black-800 px-3 w-full outline-none border border-black-600 rounded-md' />
                            </div>

                        </div>
                        <div className="basis-1/5 flex gap-2 flex-row justify-between border-b p-6 border-black-600">
                            <button onClick={deleteElement} className='bg-error basis-1/2 w-full h-full p-3 text-background rounded-md hover:brightness-90'>Remove Element</button>
                            <button onClick={() => setIsTextSettingsActive(true)} className='basis-1/2 text-white rounded-md w-full h-full p-2 bg-primary hover:brightness-90'>Text settings</button>
                        </div>
                        <div className="basis-1/5 p-4">
                        </div>
                    </div>

                </div>
            </Draggable>
        </div>
        <TextSettings className="absolute z-40 pointer-events-auto" isActiveProp={[isTextSettingsActive, setIsTextSettingsActive]} fontProp={font} colorProp={fontColor} fontSizeProp={fontSize}/>
        </>

    )
}

export default Element

/*

    How about we do absolutely no code work for the template sections?
    We can make them inside of our own app! As will the user be able to for their own custom sections!

    We add a basic, slap on our elements and just save the anchor to a root level collection
    users on the other hand will be able to add it to their own custom collection instead

    How do we scale down everything down a notch and make it so that each site is not only editable in anchor configuration but in the element as well

    instead of sections being composed of fixed designs that cannot be altered, why not make them be composed of alterable elements?

    we make a bunch of elements and instead of the user having to add them in some combination, we prefabricate them to a ready design
    if the user doesn't like it, it can be edited

    it's like we already edited them a bit for them instead of being fixed and ineditable

    in order to do this, we need to initialize our anchor with a predetermined elements collection and set the properties on anchor as well

    the ideal solution is to keep all of the initialization out of the sections component

    we can initialize the component inside of our anchor!
    let's say that navbar1 has 3 elements, upon adding the anchor we can add these 3 elements into the elements collection of the anchor and
    set the position of the anchor as well.

    How would we group elements?

    anchor -> element -> subElements

    say we have 5 elements
        TEXT1   TEXT2   TEXT3   TEXT4   TEXT5

        we want to group the middle three, we'll set the element.component property to "multiple"
        if Element.js see's that component is set to "multiple", it will look for a subElements collection
        every subElement will be like a normal element with a component import just that they will be mapped over in one Element hence making them grouped

        TEXT234 elements are deleted and instead copied into the subElements collection of one new element

    now we have 3 elements (say for example we justify the elements between)

        TEXT1           TEXT2 TEXT3 TEXT4           TEXT5
      (element1)        (   element2    )         (element3)

      first of all we need to temporarily store the ID's of the elements that we want to group
      they will be selected by holding shift

      we need a selectedElements array in state, when we select an element, we'll add it to the array
      ---> passing the array into our element

      now we want to make a function that groups them

*/