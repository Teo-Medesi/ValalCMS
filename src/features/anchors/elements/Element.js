import { doc, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import ElementImport from "../../../components/ElementImport"
import { db } from '../../../firebase.config'
import { ElementContext } from '../Anchor'


const Element = ({ elementData }) => {
    const { position, setIsAnchorSelected } = useContext(ElementContext);

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
        if (position != null && position === "relative") {
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

    const handleClick = event => {
        setIsAnchorSelected(true);
        if (elementRef.current != null && !elementRef.current.contains(event.target)) {
            setIsSelected(false);
        }
        else {
            setIsSelected(true)
        }
    }

    // don't forget that you need to set pointer events to auto

    return (
        <>
            <div onAuxClick={() => setIsSettingsActive(true)} onClick={() => setIsAnchorSelected(true)} onMouseUp={stopInterval} ref={elementRef} style={{ marginTop: marginTop + "%", marginLeft: marginLeft + "%" }} className={'cursor-pointer pointer-events-auto z-30 flex w-max h-max p-1 border-4 border-transparent ' + (isSelected ? "border-tertiary " : " ") + (position)}>
                <div className={isSelected ? "" : "hidden"}>
                    <div onMouseDown={updateMarginTop} className="w-6 h-6 absolute left-1/2 bottom-full -top-[14px] rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginRight} style={{ left: "calc(100% - 10px)" }} className="w-6 h-6 absolute rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginBottom} style={{ top: "calc(100% - 10px)" }} className="w-6 h-6 absolute left-1/2 rounded-full bg-white border-[3px] border-tertiary"></div>
                    <div onMouseDown={updateMarginLeft} className="w-6 h-6 -left-[13px] absolute rounded-full bg-white border-[3px] border-tertiary"></div>
                </div>
                <ElementImport elementName={elementData.component} />
            </div>
        </>
    )
}

export default Element