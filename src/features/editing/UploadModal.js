import React, {useState, useEffect} from 'react'
import { useRef } from 'react'
import BirdImage from "../../assets/svgs/birdIcon.svg"
import CloseIcon from "../../assets/svgs/closeIcon.svg"
import { storage } from '../../firebase.config'
import { ref, uploadBytes } from 'firebase/storage'

const UploadModal = ({isActive, setIsActive, storagePath, appendFileName, fetchFile}) => {

    // How to use the upload modal? 
    // 1. include it in the jsx where you want to render it,
    // 2. regulate it's visibility with state and pass your state in as isActive, setIsActive
    // 3. specify the storage path to where the file or blob should be uploaded

    const [file, setFile] = useState(0);
    const [previewFileURL, setPreviewFileURL] = useState("")
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploadText, setUploadText] = useState("Upload");
    const inputRef = useRef(null);
    
    const handleClick = () => {
        inputRef.current.click();
    }

    useEffect(() => {
        if (file !== 0 && file !== null)
        {
            setPreviewFileURL(URL.createObjectURL(file));
        }
    },[file]);

    const handleUploadClick = () => {
        setUploadText("Uploading...");

        if (file != null && file != 0)
        {
            const storageRef = ref(storage, storagePath + (appendFileName ? `/${file.name}` : ""));
            uploadBytes(storageRef, file).then(() => {
                setUploadText("Uploaded")
                setIsUploaded(true);

                if (fetchFile != null)
                {
                    fetchFile();
                }
            }).catch(error => console.error(error));
        }
    }

    const handleClose = () => {
        setIsActive(false);
        setFile(0);
        setUploadText("Upload");
        setPreviewFileURL("");
    }

    return (
        <div className={'w-screen h-screen fixed z-40 pointer-events-auto top-0 left-0 right-0 bottom-0 py-12 justify-center flex bg-[rgb(0,0,0,0.1)] ' + (isActive ? "" : "hidden")}>
            <div className='flex flex-col justify-between border bg-gray-100 border-black-600 border-t-8 border-t-primary gap-24 w-[75%] xl:w-[50%] rounded-md p-6 h-full'>
                <div className='flex flex-row basis-1/4 justify-between'>
                    <input type="file" ref={inputRef} onChange={event => setFile(event.target.files[0])} className="hidden"/>
                    <button onClick={handleClick} className='basis-[28%] h-min bg-gradient-to-r bg-primary text-xl text-white rounded-md p-4'>Select Image</button>
                    <div className='text-center italic text-black-600 bg-white border rounded-md border-black-600 text-xl p-4 h-min w-full basis-[60%]'>{(file.name == null) ? "Click on the select image button" : file.name}</div>
                    <div onClick={handleClose} className='basis-[8%] h-[66px] flex justify-center items-center w-full cursor-pointer hover:bg-gray-300 rounded-md'><img src={CloseIcon} className="w-14 h-14"/></div>
                </div>

                <div className='flex flex-col basis-2/4 gap-12 justify-center items-center border-black-600 border rounded-xl w-full h-full py-5'>
                    <div className={(file == 0) ? 'text-2xl text-black-700' : 'hidden'}>Your image will be displayed here!</div>
                    <img src={(file === 0 || file === null) ? BirdImage : previewFileURL} className={(file === 0) ? "w-56 h-56 " : "max-w-[250px] max-h-[250px]"}/>

                    <button onClick={handleUploadClick} className='h-min cursor-pointer w-96 bg-gray-800 text-xl text-white rounded-md p-4'>{isUploaded ? "Image uploaded!" : uploadText}</button>
                </div>

            </div>
        </div>
    )
}

UploadModal.defaultProps = {
    appendFileName: true
}

export default UploadModal