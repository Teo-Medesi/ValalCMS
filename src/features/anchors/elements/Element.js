import { doc, updateDoc } from 'firebase/firestore'
import React, { useContext, useState, createContext } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import ElementImport from "../../../components/ElementImport"
import { db } from '../../../firebase.config'
import { ElementContext } from '../Anchor'


export const ThisElementContext = createContext();

const Element = ({ elementData }) => {
    const { position, selectedElements, setSelectedElements } = useContext(ElementContext);

    const [isSettingsActive, setIsSettingsActive] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isMultipleSelected, setIsMultipleSelected] = useState(false);

    const [marginTop, setMarginTop] = useState(elementData.marginTop)
    const [marginLeft, setMarginLeft] = useState(elementData.marginLeft)

    const [intervalId, setIntervalId] = useState("");
    const [marginToUpdate, setMarginToUpdate] = useState("");

    const [isShiftPressed, setIsShiftPressed] = useState(false);

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
        if (!selectedElements.includes(elementData.id)) {
            if (selectedElements.length === 0 || isShiftPressed)
            {
                setSelectedElements(current => [...current, elementData.id]);
            }
        }
    }

    // don't forget that you need to set pointer events to auto

    return (
        <ThisElementContext.Provider value={elementData}>
            <div onAuxClick={() => setIsSettingsActive(true)} onClick={selectElement} ref={elementRef} style={{ marginTop: marginTop + "%", marginLeft: marginLeft + "%" }} className={'cursor-pointer pointer-events-auto z-30 flex w-max h-max p-1 border-4 border-transparent ' + (isSelected ? "border-tertiary " : " ") + (position)}>
                <div className={(isSelected && !isMultipleSelected && !isShiftPressed) ? "" : "hidden"}>
                    <div onMouseDown={updateMarginTop} className="w-6 h-6 absolute left-[45%] bottom-full -top-[14px] rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginRight} style={{ left: "calc(100% - 10px)" }} className="w-6 h-6 absolute rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginBottom} style={{ top: "calc(100% - 10px)" }} className="w-6 h-6 absolute left-[45%] rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginLeft} className="w-6 h-6 -left-[13px] absolute rounded-full bg-white border-[3px] border-tertiary"></div>
                </div>
                <div style={{userSelect: (isShiftPressed ? "none" : "auto")}}><ElementImport elementName={elementData.component} /></div>
            </div>
        </ThisElementContext.Provider>
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