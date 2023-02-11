import React,{useContext, useEffect, useState} from 'react'
import { useRef } from 'react';
import { onlyText } from 'react-children-utilities';
import TextSettings from './TextSettings';
import { db } from '../../firebase.config';
import { updateDoc, doc } from 'firebase/firestore';
import { ThisElementContext } from '../anchors/elements/Element';

const TextBox = ({children, className}) => {
 
    const elementData = useContext(ThisElementContext);
    
    const elementRef = useRef(null);
    const [isSettingsActive, setIsSettingsActive] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);

    const [text, setText] = useState(onlyText(children));
    const [font, setFont] = useState("");
    const [fontSize, setFontSize] = useState("");
    const [color, setColor] = useState("");

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (elementRef.current != null) 
        {
            setHeight(elementRef.current.clientHeight);
            setWidth(elementRef.current.clientWidth);
        }
    }, [elementRef.current]);

    useEffect(() => {
        if (isEditMode) 
        {
            setIsSettingsActive(true);
        }
    }, [isEditMode]);

    useEffect(() => {
        if (elementData.properties.text != null)
        {    
            setText(elementData.properties.text);
        }
    }, [])


    const handleEdit = () => {
        updateText();
        setIsEditMode(false);
    }

    const handleKeyDown = event => {
        if(event.key === "Enter")
        {
            if (isEditMode)
            {
                handleEdit();
            } else {
                event.preventDefault();
                setIsEditMode(true);
            }
        }
    }

    const handleDoubleClick = () => {
        setIsEditMode(current => !current);
    }

    const updateText = async () => {
        const elementRef = doc(db, `${elementData.path}/${elementData.id}`);
        updateDoc(elementRef, {"properties.text": text})
    }

    if (isEditMode) {
        return (
            <>
                {/* <TextSettings isActive={isSettingsActive} setIsActive={setIsSettingsActive} className="absolute z-10"/> */}
                <div style={{fontSize: fontSize, fontFamily: font, color: color}} className={className}>
                    <textarea style={{width: width + 20, height: height + 20}} onKeyDown={handleKeyDown} autoFocus defaultValue={text} onChange={event => setText(event.target.value)} className='border-gray-500 rounded-md outline-none p-2 overflow-hidden resize-none border bg-transparent h-full' type="text"/>
                </div>
            </>
        )
    } else {
        return (
            <div tabIndex={0} onKeyDown={handleKeyDown} style={{fontSize: fontSize, fontFamily: font, color: color}} ref={elementRef} className={className} onDoubleClick={handleDoubleClick}>
                {text}
            </div>
        )
    }
}

export default TextBox