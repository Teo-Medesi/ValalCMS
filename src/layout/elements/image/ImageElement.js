import React, { useState, useContext, useEffect } from 'react'
import UploadIcon from "../../../assets/svgs/uploadIcon.svg"
import UploadModal from '../../../features/editing/UploadModal'
import { ProjectContext } from "../../../features/project/Project"
import { UserContext } from '../../../App'
import { ThisAnchorContext } from '../../../features/anchors/Anchor'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../../firebase.config'
import { ThisElementContext } from '../../../features/anchors/elements/Element'
import { useRef } from 'react'

const ImageElement = () => {
    const [isActive, setIsActive] = useState(false);
    const [project, _ignore, __ignore] = useContext(ProjectContext)
    const [user, ___ignore] = useContext(UserContext);
    const elementData = useContext(ThisElementContext);

    const [storagePath, setStoragePath] = useState("")
    const [imageURL, setImageURL] = useState("");
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    const imageRef = useRef(null);

    // getting the elements parent anchor data
    const anchor = useContext(ThisAnchorContext);

    useEffect(() => {
        if (user != null && project != null && anchor != null && elementData != null) {
            setStoragePath(`users/${user.uid}/projects/${project.name}/pages/home/anchors/${anchor.id}/elements/${elementData.id}/images/backgroundImage`);
        }
    }, [user, project, anchor, elementData])

    useEffect(() => {
        if (storagePath !== "" && storagePath != null && imageRef.current != null)
        {   
            fetchBackgroundImageURL();
            setImageWidth(imageRef.current.clientWidth)
            setImageHeight(imageRef.current.clientHeight)
            
        }
    }, [storagePath, imageRef.current]);


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
                <div onClick={() => setIsActive(true)} className='h-64 w-64 cursor-pointer p-3 bg-transparent'>
                    <div className='flex h-full w-full justify-center items-center border border-black-600 rounded'>
                        <img src={UploadIcon} className="w-20 h-20" />
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
                <img src={imageURL} ref={imageRef} style={{height: "auto", width: "auto",  backgroundSize: "100% 100%" }} className='bg-cover aspect-square' />
        )
    }
}

export default ImageElement