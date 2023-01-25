import React from 'react'
import { useState, useContext } from 'react'
import UploadIcon from "../../../../assets/images/svgs/uploadIcon.svg"
import UploadModal from '../../../UploadModal'
import { ProjectContext } from "../../../../Project"
import { UserContext } from '../../../../App'
import { ThisAnchorContext } from '../../../../Anchor'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../../../firebase.config'
import { useEffect } from 'react'

const Bg0 = () => {
    const [isActive, setIsActive] = useState(false);
    const [project, _ignore, __ignore] = useContext(ProjectContext)
    const [user, ___ignore] = useContext(UserContext);

    const [storagePath, setStoragePath] = useState("")
    const [imageURL, setImageURL] = useState("");

    // getting the elements parent anchor data
    const anchor = useContext(ThisAnchorContext);

    useEffect(() => {
        if (user != null && project != null && anchor != null) {
            setStoragePath(`users/${user.uid}/projects/${project.name}/pages/home/anchors/${anchor.id}/images/backgroundImage`);
        }
    }, [user, project, anchor])

    useEffect(() => {
        if (storagePath !== "" && storagePath != null)
        {   
            fetchBackgroundImageURL();
        }
    }, [storagePath]);


    const fetchBackgroundImageURL = () => {
        const storageRef = ref(storage, storagePath);
        getDownloadURL(storageRef).then(url => {
            setImageURL(url);
        })
    }


    if (imageURL === "") {
        return (
            <>
                <UploadModal fetchFile={fetchBackgroundImageURL} isActive={isActive} setIsActive={setIsActive} appendFileName={false} storagePath={storagePath} />
                <div onClick={() => setIsActive(true)} className='h-screen cursor-pointer px-5 bg-transparent w-full max-h-screen'>
                    <div className='flex h-full justify-center items-center border border-black-600 rounded'>
                        <img src={UploadIcon} className="w-20 h-20" />
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <div style={{ backgroundImage: `url(${imageURL})` }} className='w-full max-h-screen bg-cover'>
                <img src={imageURL} className="invisible" />
            </div>
        )
    }
}

export default Bg0