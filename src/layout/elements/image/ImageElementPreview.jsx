import React from 'react'
import UploadIcon from "../../../assets/svgs/uploadIcon.svg"

const ImageElementPreview = () => {
        return (
            <>
                <div className='h-80 w-full cursor-pointer p-5 bg-transparent'>
                    <div className='flex h-full w-full justify-center items-center border border-black-600 rounded'>
                        <img src={UploadIcon} className="w-10 h-10" />
                    </div>
                </div>
            </>
        )
}

export default ImageElementPreview