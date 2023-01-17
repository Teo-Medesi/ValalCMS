import React, {useState, useContext, useEffect} from "react"
import ColorsIcon from "./assets/images/svgs/colorsIcon.svg"
import Draggable from "react-draggable"
import CloseIcon from "./assets/images/svgs/closeIcon.svg"
import { ProjectContext } from "./Project";

const TextSettings = ({isActive, setIsActive, className, selectedTextBox, updateFont, updateColor, updateFontSize}) => {

    const [isDraggable, setIsDraggable] = useState(false);
    const project = useContext(ProjectContext);
    const [properties, setProperties] = useState({});
    const {font, fontSize, color} = properties;
     
    useEffect(() => {
        if (selectedTextBox.properties != null)
        {
            setProperties(selectedTextBox.properties)

        }
    }, [selectedTextBox.properties]);
    
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

    return (
        <div className={className}>
            <Draggable disabled={isDraggable ? false : true}>
                <div className='w-80 h-[480px] shadow-xl flex-col shadow-black-900 bg-black-100 border-t-primary border-t-[12px] rounded-xl'>
                    <div onMouseDownCapture={() => setIsDraggable(true)} onMouseUp={() => setIsDraggable(false)} className='flex p-3 basis-[10%]  cursor-pointer flex-row items-center justify-between border-b border-black-600'>
                         <h1 className=' font-bold text-black-900'>Text Settings</h1>
                        <img src={CloseIcon} onClick={() => setIsActive(false)} className="w-8 cursor-pointer h-8" />
                    </div>

                    <div onMouseDown={() => setIsDraggable(false)} className="flex flex-col h-full basis-[90%] w-full">
                        <div className="basis-1/5 p-4 border-b flex-col flex  border-black-600">
                            <h1 className=" text-black-900">Font</h1>
                            <div className="h-full w-full flex items-center">
                                <select onChange={event => updateFont(selectedTextBox.name, event.target.value)} defaultValue={font} className='py-1  text-black-900 px-3 min-w-full outline-none bg-white border border-black-600 rounded-md' >
                                    {fonts.map((fontName, index) => <option key={index} value={fontName}>{fontName}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="basis-1/5 p-4 border-b flex flex-col  border-black-600">
                            <p className=' text-black-900'>Font Size</p>
                            <div className="flex flex-col justify-center h-full">
                                <input onChange={event => updateFontSize(selectedTextBox.name, event.target.value)} type="text" defaultValue={fontSize} placeholder={fontSize} list="fontSizes" className='py-1 px-3 min-w-full text-black-900 outline-none border border-black-600 rounded-md'/>
                                <datalist id="fontSizes">
                                  {[...Array(73).keys()].map(index => <option value={((index + 4) / 2) + "px"}>{((index + 4)/ 2) + "px"}</option>)}
                                </datalist>
                            </div>
                        </div>
                        <div className="basis-1/5 p-4 border-b flex flex-col border-black-600">
                            <p className=' text-black-900'>Color</p>
                                <div className="flex flex-row w-full justify-between items-center h-full">
                                    <div style={{background: color}} className="w-7 h-7 cursor-pointer rounded-full"></div>
                                    <input onChange={event => updateColor(selectedTextBox.name, event.target.value)} type="text" defaultValue={color} placeholder={color} className='py-1 text-black-800 px-3 w-64 outline-none border border-black-600 rounded-md'/>
                                    <img src={ColorsIcon} className="w-7 h-7 cursor-pointer"/>
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

export default TextSettings