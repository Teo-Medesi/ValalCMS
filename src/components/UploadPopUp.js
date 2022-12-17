import React, {useState, useEffect} from 'react'
import BirdImage from "./images/bird.png"

const UploadPopUp = ({uploadFunction, hidden}) => {

    const [file, setFile] = useState(0);
    const [previewFileURL, setPreviewFileURL] = useState("");

    const handleClick = () => {
        document.getElementById("input").click();
    }

    useEffect(() => {
        if (file !== 0)
        {
            console.log("File changed")
            setPreviewFileURL(URL.createObjectURL(file));
        }
    },[file]);

    const handleUploadClick = () => {
        uploadFunction(file);
    }

    return (
        <div className={hidden ? 'w-screen h-screen fixed py-12 justify-center bg-[rgb(0,0,0,0.1)] hidden' : 'w-screen h-screen fixed py-12 justify-center flex bg-[rgb(0,0,0,0.1)]'}>
            <div className='flex flex-wrap justify-between bg-gray-100 w-[75%] xl:w-[50%] rounded-xl p-6 h-full'>
                <input id="input" onChange={event => setFile(event.target.files[0])} type="file" className="hidden"/>
                <button onClick={handleClick} className='basis-[28%] h-min bg-gradient-to-r from-gray-800 to-indigo-900 text-xl text-white rounded-md p-4'>Select Image</button>
                <div className='text-center italic text-gray-600 bg-white border rounded-md border-gray-200 text-xl p-4 h-min w-full basis-[70%]'>{(file.name == null) ? "Click on the select image button" : file.name}</div>

                <div className='flex flex-col gap-12 justify-center items-center mt-5 border-gray-500 border rounded-xl w-full h-[460px] py-5'>
                    <div className={(file == 0) ? 'text-2xl text-gray-600 italic' : 'text-2xl text-gray-600 italic hidden'}>Your image will be displayed here!</div>
                    <img src={(file == 0) ? BirdImage : previewFileURL} className={(file == 0) ? "w-60 h-60" : "max-w-[250px] max-h-[250px]"}/>

                    <button onClick={handleUploadClick} className='h-min w-96 bg-gray-800 text-xl text-white rounded-md p-4'>Upload</button>
                </div>

            </div>
        </div>
    )
}

export default UploadPopUp