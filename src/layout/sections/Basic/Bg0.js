import React, { useState, useContext, useEffect } from 'react'
import UploadIcon from "../../../assets/svgs/uploadIcon.svg"
import UploadModal from '../../../features/editing/UploadModal'
import { ProjectContext } from "../../../features/project/Project"
import { UserContext } from '../../../App'
import { ThisAnchorContext } from '../../../features/anchors/Anchor'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../../firebase.config'

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
                <div onClick={() => setIsActive(true)} className='h-[90vh] cursor-pointer p-5 bg-transparent w-full max-h-screen'>
                    <div className='flex h-full w-full justify-center items-center border border-black-600 rounded'>
                        <img src={UploadIcon} className="w-20 h-20" />
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <div style={{ backgroundImage: `url(${imageURL})`, minWidth: "100%", height: "inherit", backgroundSize: "100% 100%" }} className='w-screen h-[90vh] max-h-screen bg-cover'>
                <img src={imageURL} className="invisible" />
            </div>
        )
    }
}

export default Bg0