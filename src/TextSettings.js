import React, {useState} from "react"
import Draggable from "react-draggable"
import CloseIcon from "./assets/images/svgs/closeIcon.svg"

const TextSettings = ({isActive, setIsActive, className}) => {

    const [isDraggable, setIsDraggable] = useState(false);

    return (
        <div className={className}>
            <Draggable disabled={isDraggable ? false : true}>
                <div className='w-96 h-[600px] shadow-xl flex-col shadow-black-900 bg-black-100 border-t-primary border-t-[12px] rounded-xl'>
                    <div onMouseDownCapture={() => setIsDraggable(true)} onMouseUp={() => setIsDraggable(false)} className='flex p-3 basis-[10%]  cursor-pointer flex-row items-center justify-between border-b border-black-600'>
                         <h1 className='text-xl font-bold text-black-900'>Text Settings</h1>
                        <img src={CloseIcon} onClick={() => setIsActive(false)} className="w-8 cursor-pointer h-8" />
                    </div>

                    <div onMouseDown={() => setIsDraggable(false)} className="flex flex-col h-full basis-[90%] w-full">
                        <div className="basis-1/5 p-4 border-b flex-col flex  border-black-600">
                            <h1 className="text-xl text-black-900">Font</h1>
                            <div className="h-full w-full flex items-center">
                                <select className='py-1 text-xl text-black-900 px-3 min-w-full outline-none bg-white border border-black-600 rounded-md' >
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Times">Times New Roman</option>
                                    <option value="OpenSans">Open Sans</option>
                                    <option value="Gotham">Gotham</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Bodoni">Bodoni</option>
                                    <option value="GillSans">Gill Sans</option>
                                    <option value="FranklinGothic">Franklin Gothic</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Garamond">Garamond</option>
                                    <option value="Sabon">Sabon</option>
                                    <option value="Myriad">Myriad</option>
                                    <option value="Verdana">Verdana</option>
                                </select>
                            </div>
                        </div>
                        <div className="basis-1/5 p-4 border-b border-black-600"></div>
                        <div className="basis-1/5 p-4 border-b border-black-600"></div>
                        <div className="basis-1/5 p-4 border-b border-black-600"></div>
                        <div className="basis-1/5 p-4"></div>
                    </div>

                </div>
            </Draggable>
        </div>
    )
}

export default TextSettings