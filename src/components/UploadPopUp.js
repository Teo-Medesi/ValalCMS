import React, {useState, useEffect} from 'react'
import BirdImage from "./images/bird.png"
import CloseIcon from "./images/close.png"

// ONLY ONE INSTANCE OF UPLOAD MODAL CAN EXIST UPON RENDER
const UploadPopUp = ({uploadFunction, isHidden, setIsActive}) => {

    const initialState = {
        file: 0,
        previewFileURL: "",
        isUploaded: false
    }

    const [file, setFile] = useState(initialState.file);
    const [previewFileURL, setPreviewFileURL] = useState(initialState.previewFileURL)
    const [isUploaded, setIsUploaded] = useState(initialState.isUploaded);

    const handleClick = () => {
        document.getElementById("input").click();
    }

    useEffect(() => {
        if (file !== 0 && file !== null)
        {
            console.log("File changed")
            setPreviewFileURL(URL.createObjectURL(file));
            console.log(previewFileURL);
            console.log(file.name);
        }
    },[file]);


    // TO-DO make this shit work, state resets but causes errors when trying to upload images
     useEffect(() => {
        setIsUploaded(initialState.isUploaded);
    //    setFile(initialState.file);
    //    setPreviewFileURL(initialState.previewFileURL);
    }, [isHidden]);
 
    const handleUploadClick = () => {
        uploadFunction(file, setIsUploaded);
    }

    const handleClose = () => {
        setIsActive(false);
    }

    return (
        <div className={isHidden ? 'w-screen h-screen fixed justify-center bg-[rgb(0,0,0,0.2)] hidden' : 'w-screen h-screen fixed top-0 left-0 right-0 bottom-0 py-12 justify-center flex bg-[rgb(0,0,0,0.1)]'}>
            <div className='flex flex-col gap-24 bg-gray-100 w-[75%] xl:w-[50%] rounded-xl p-6 h-full'>
                <div className='flex justify-between'>
                    <input id="input" onChange={event => setFile(event.target.files[0])} type="file" className="hidden"/>
                    <button onClick={handleClick} className='basis-[28%] h-min bg-gradient-to-r from-gray-800 to-indigo-900 text-xl text-white rounded-md p-4'>Select Image</button>
                    <div className='text-center italic text-gray-600 bg-white border rounded-md border-gray-200 text-xl p-4 h-min w-full basis-[60%]'>{(file.name == null) ? "Click on the select image button" : file.name}</div>
                    <img src={CloseIcon} onClick={handleClose} className="w-[66px] h-[66px] basis-[5%] cursor-pointer hover:bg-gray-300 p-1 rounded-md"/>
                </div>

                <div className='flex flex-col gap-12 justify-center items-center mt-5 border-gray-500 border rounded-xl w-full h-full py-5'>
                    <div className={(file == 0) ? 'text-2xl text-gray-600 italic' : 'text-2xl text-gray-600 italic hidden'}>Your image will be displayed here!</div>
                    <img src={(file == 0) ? BirdImage : previewFileURL} className={(file == 0) ? "w-56 h-56 " : "max-w-[250px] max-h-[250px]"}/>

                    <button onClick={handleUploadClick} className={isUploaded ? 'h-min w-96 bg-gradient-to-r from-[#2d388a] to-[#00aeef] text-xl text-white rounded-md p-4' : 'h-min w-96 bg-gray-800 text-xl text-white rounded-md p-4'}>{isUploaded ? "Image uploaded!" : "Upload"}</button>
                </div>

            </div>
        </div>
    )
}

export default UploadPopUp