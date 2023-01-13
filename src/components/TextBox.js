import React,{useEffect, useState} from 'react'

const TextBox = ({children, className, placeholder, setText, customSetFunction, customParameter, onDoubleClick}) => {
    // the idea is for TextBox to just be a wrapper element that returns children if edit mode is off
    // if edit mode is on
    
    const [isEditMode, setIsEditMode] = useState(false);
    const [newText, setNewText] = useState(placeholder);

    useEffect(() => {
        if (setText == null && customSetFunction == null) console.error("'setText' and 'customSetFunction' are both undefined, please assign a value to either 'setText' or 'customSetFunction', but not to both.");
    }, [])


    const handleEdit = () => {
        if (customSetFunction == null) setText(newText);
        else customSetFunction(newText, customParameter);
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
        if (onDoubleClick != null)
        {
            onDoubleClick();
        }
    }

    if (isEditMode) {
        return (
            <div className={className}>
                <textarea onKeyDown={handleKeyDown} autoFocus defaultValue={placeholder} onChange={event => setNewText(event.target.value)} className='border-gray-500 rounded-md outline-none p-2 overflow-hidden resize-none border bg-transparent w-full h-full' type="text"/>
            </div>
        )
    } else {
        return (
            <div className={className} onDoubleClick={handleDoubleClick}>
                {children}
            </div>
        )
    }

    
}

export default TextBox