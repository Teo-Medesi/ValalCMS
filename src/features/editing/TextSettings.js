import React, { useState, useContext } from "react"
import Draggable from "react-draggable"
import CloseIcon from "../../assets/svgs/closeIcon.svg"
import { db } from "../../firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { ChromePicker } from "react-color";
import { ThisElementContext } from "../anchors/elements/Element";

const TextSettings = ({ isActiveProp, className, colorProp, fontProp, fontSizeProp}) => {

    const [isDraggable, setIsDraggable] = useState(false);
    const [isColorPickerActive, setIsColorPickerActive] = useState(false);

    const [isActive, setIsActive] = isActiveProp;

    const elementData = useContext(ThisElementContext);

    const [color, setColor] = colorProp;
    const [font, setFont] = fontProp;
    const [fontSize, setFontSize] = fontSizeProp;

    const fonts = [
        "Helvetica",
        "Inter",
        "Times New Roman",
        "Open Sans",
        "Gotham",
        "Arial",
        "Bodoni",
        "Gill Sans",
        "Franklin Gothic",
        "Georgia",
        "Garamond",
        "Sabon",
        "Verdana",
        "Myriad"
    ]

    const handleClose = async () => {
        setIsActive(false);

        const elementRef = doc(db, `${elementData.path}/${elementData.id}`);
        await updateDoc(elementRef, {"properties.font": font, "properties.fontSize": fontSize, "properties.fontColor": color});
    }


    return (
        <div className={className + (isActive ? "" : " hidden")}>
            <Draggable defaultPosition={{x: 200, y: 200}} disabled={isDraggable ? false : true}>
                <div className='w-80 h-[480px] shadow-xl flex-col shadow-black-900 bg-black-100 border-t-primary border-t-[12px] rounded-xl'>
                    <div onMouseDownCapture={() => setIsDraggable(true)} onMouseUp={() => setIsDraggable(false)} className='flex p-3 basis-[10%]  cursor-pointer flex-row items-center justify-between border-b border-black-600'>
                        <h1 className=' font-bold text-black-900'>Text Settings</h1>
                        <img src={CloseIcon} onClick={handleClose} className="w-8 cursor-pointer h-8" />
                    </div>

                    <div onMouseDown={() => setIsDraggable(false)} className="flex flex-col h-full basis-[90%] w-full">
                    <ChromePicker color={color} onChange={(color) => setColor(color.hex)} className={'absolute right-40 z-20' + (isColorPickerActive ? "" : " hidden")}/>
                        
                        
                        <div className="basis-1/5 p-4 border-b flex-col flex  border-black-600">
                            <h1 className=" text-black-900">Font</h1>
                            <div className="h-full w-full flex items-center">
                                <select onChange={event => setFont(event.target.value)} value={font} className='py-1  text-black-900 px-3 min-w-full outline-none bg-white border border-black-600 rounded-md' >
                                    {fonts.map((fontName, index) => <option key={index} value={fontName}>{fontName}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="basis-1/5 p-4 border-b flex flex-col  border-black-600">
                            <p className=' text-black-900'>Font Size</p>
                            <div className="flex flex-col justify-center h-full">
                                <input onChange={event => setFontSize(event.target.value)} type="number" step={2} defaultValue={fontSize} placeholder={fontSize} list="fontSizes" className='py-1 px-3 min-w-full text-black-900 outline-none border border-black-600 rounded-md' />
                                <datalist id="fontSizes">
                                    {[...Array(73).keys()].map(index => <option key={index} value={((index + 4) / 2) + "px"}>{((index + 4) / 2) + "px"}</option>)}
                                </datalist>
                            </div>
                        </div>
                        <div className="basis-1/5 p-4 border-b flex flex-col border-black-600">

                            <p className=' text-black-900'>Color</p>
                            <div className="flex flex-row w-full justify-between items-center h-full">
                                <input type="text" defaultValue={(color != "") ? color : "transparent"} onChange={event => setColor(event.target.value)} className='py-1 text-black-800 px-3 w-[88%] outline-none border border-black-600 rounded-md' />
                                <div onClick={() => setIsColorPickerActive(current => !current)} style={{ background: color }} className="w-7 h-7 hover:border-secondary border-transparent border-2 cursor-pointer rounded-full"></div>
                            </div>

                        </div>
                        <div className="basis-1/5 p-4 border-b border-black-600">
                            <p className="italic text-black-700">Styles are applied after closing this box.</p>
                        </div>
                        <div className="basis-1/5 p-4"></div>
                        
                    </div>

                </div>
            </Draggable>
        </div>
    )
}

export default TextSettings