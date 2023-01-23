import React,{useEffect, useState} from 'react'
import { useRef } from 'react';
import { onlyText } from 'react-children-utilities';

const TextBox = ({children, className, customSetFunction, customParameter, onChange, properties}) => {
    // the idea is for TextBox to just be a wrapper element that returns children if edit mode is off
    // if edit mode is on

    const {font, fontSize, color} = properties; 
    const elementRef = useRef(null);

    // so each textbox component can have for now up to 3 properties which we can we ask to be passed down in a map 
    // text color, font size and font

    const [isEditMode, setIsEditMode] = useState(false);
    const [text, setText] = useState(onlyText(children));

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);


    useEffect(() => {
        if (setText == null && customSetFunction == null) console.error("'setText' and 'customSetFunction' are both undefined, please assign a value to either 'setText' or 'customSetFunction', but not to both.");
    }, [])

    useEffect(() => {
        if (elementRef.current != null) 
        {
            setHeight(elementRef.current.clientHeight);
            setWidth(elementRef.current.clientWidth);
        }
    }, [elementRef.current]);


    const handleEdit = () => {
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

    if (isEditMode) {
        return (
            <div style={{fontSize: fontSize, fontFamily: font, color: color}} className={className}>
                <textarea style={{width: width + 20, height: height + 20}} onKeyDown={handleKeyDown} autoFocus defaultValue={text} onChange={event => setText(event.target.value)} className='border-gray-500 rounded-md outline-none p-2 overflow-hidden resize-none border bg-transparent h-full' type="text"/>
            </div>
        )
    } else {
        return (
            <div style={{fontSize: fontSize, font: font, color: color}} ref={elementRef} className={className} onDoubleClick={handleDoubleClick}>
                {text}
            </div>
        )
    }
}

TextBox.defaultProps = {
    properties: {
        font: "Inter",
        fontSize: "16px",
        color: "#ffffff"
    }
}

export default TextBox