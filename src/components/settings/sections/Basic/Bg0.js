import React from 'react'
import { useState } from 'react'
import UploadIcon from "../../../../assets/images/svgs/uploadIcon.svg"
import UploadModal from '../../../UploadModal'

const Bg0 = () => {
    const [isActive, setIsActive] = useState(false);
    
    return (
        <>
            <UploadModal isActive={isActive} setIsActive={setIsActive} />
            <div onClick={() => setIsActive(true)} className='h-screen cursor-pointer px-5 bg-transparent w-full max-h-screen'>
                <div className='flex h-full justify-center items-center border border-black-600 rounded'>
                    <img src={UploadIcon} className="w-20 h-20" />
                </div>
            </div>
        </>
    )
}

export default Bg0