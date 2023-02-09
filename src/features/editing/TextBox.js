import React,{useEffect, useState} from 'react'
import { useRef } from 'react';
import { onlyText } from 'react-children-utilities';
import TextSettings from './TextSettings';
import { db } from '../../firebase.config';
import { updateDoc, doc } from 'firebase/firestore';

const TextBox = ({children, className, anchorData, index, onChange, properties}) => {
    // the idea is for TextBox to just be a wrapper element that returns children if edit mode is off
    // if edit mode is on

    const {id, font, fontSize, color} = properties; 
    const elementRef = useRef(null);
    const [isSettingsActive, setIsSettingsActive] = useState(false);

    // so each textbox component can have for now up to 3 properties which we can we ask to be passed down in a map 
    // text color, font size and font

    const [isEditMode, setIsEditMode] = useState(false);
    const [text, setText] = useState(onlyText(children));

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
        if (anchorData.properties.textBoxes[index].text != null)
        {
            setText(anchorData.properties.textBoxes[index].text);
        }
    }, [])

    const handleEdit = () => {
        updateText();
        setIsEditMode(false);
    }

    const handleKeyDown = event => {
        if(event.key === "Enter")
        {
            handleEdit();
        }
    }

    const handleDoubleClick = () => {
        setIsEditMode(current => !current);
        if (onChange != null)
        {
            onChange();
        }
    }

    const updateText = () => {
        let textBoxesCopy = anchorData.properties.textBoxes;
        textBoxesCopy[index].text = text;      

        const anchorRef = doc(db, anchorData.path);
        updateDoc(anchorRef, { "properties.textBoxes": textBoxesCopy });
    }

    if (isEditMode) {
        return (
            <>
                <TextSettings anchorData={anchorData} index={index} isActive={isSettingsActive} setIsActive={setIsSettingsActive} className="absolute z-10"/>
                <div style={{fontSize: fontSize, fontFamily: font, color: color}} className={className}>
                    <textarea style={{width: width + 20, height: height + 20}} onKeyDown={handleKeyDown} autoFocus defaultValue={text} onChange={event => setText(event.target.value)} className='border-gray-500 rounded-md outline-none p-2 overflow-hidden resize-none border bg-transparent h-full' type="text"/>
                </div>
            </>
        )
    } else {
        return (
            <div style={{fontSize: fontSize, fontFamily: font, color: color}} ref={elementRef} className={className} onDoubleClick={handleDoubleClick}>
                {text}
            </div>
        )
    }
}

TextBox.defaultProps = {
    properties: {
        id: "",
        font: "",
        fontSize: "",
        color: ""
    }
}

export default TextBox