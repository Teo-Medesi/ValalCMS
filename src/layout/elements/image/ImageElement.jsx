import React, { useState, useContext, useEffect } from 'react'
import UploadIcon from "../../../assets/svgs/uploadIcon.svg"
import UploadModal from '../../../features/editing/UploadModal'
import { ProjectContext } from "../../../features/project/Project"
import { UserContext } from '../../../App'
import { ElementContext, ThisAnchorContext } from '../../../features/anchors/Anchor'
import { getDownloadURL, ref } from 'firebase/storage'
import { db, storage } from '../../../firebase.config'
import { ThisElementContext } from '../../../features/anchors/elements/Element'
import { useRef } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const ImageElement = () => {
    const [isActive, setIsActive] = useState(false);
    const [project, _ignore, __ignore] = useContext(ProjectContext)
    const [user, ___ignore] = useContext(UserContext);
    const elementData = useContext(ThisElementContext);

    const {fetchElements} = useContext(ElementContext)

    const [storagePath, setStoragePath] = useState("")
    const [imageURL, setImageURL] = useState("");

    const imageRef = useRef(null);

    // getting the elements parent anchor data
    const anchorData = useContext(ThisAnchorContext);
    const {updateOverlay} = useContext(ElementContext)

    useEffect(() => {
        if (user != null && project != null && anchorData != null && elementData != null) {
            setStoragePath(`users/${user.uid}/projects/${project.name}/pages/home/anchors/${anchorData.id}/elements/${elementData.id}/images/backgroundImage`);
        }
    }, [user, project, anchorData, elementData])

    useEffect(() => {
        console.log(storagePath, imageRef.current)
        
        if (storagePath !== "" && storagePath != null)
        {   
            fetchBackgroundImageURL();
        }
    }, [storagePath]);

    const onUpload = () => {
        const elementRef = doc(db, `${elementData.path}/${elementData.id}`);

        let initialSize;
        if (anchorData.height > 400)
        {
            initialSize = 400;
        }
        else {
            initialSize = anchorData.height / 1.2;
        }

        updateDoc(elementRef, {"properties.width": initialSize + "px", "properties.height": initialSize + "px"}).then(() => fetchElements())
    }

    const handleOverlay = async () => {
        const elementRef = doc(db, `${elementData.path}/${elementData.id}`);
        const elementParentSnap = await getDoc(elementRef.parent.parent);
        if (elementParentSnap.data().component === "Multiple")
        {
            updateOverlay(isActive, elementParentSnap.id);
        }
        else {
            updateOverlay(isActive, elementData.id);
        }


    }

    useEffect(() => {
        handleOverlay();
    }, [isActive])

    const fetchBackgroundImageURL = () => {
        console.log("fetched");
        const storageRef = ref(storage, storagePath);
        getDownloadURL(storageRef).then(url => {
            setImageURL(url);
        })
    }


    if (imageURL === "") {
        return (
            <>
                <UploadModal onUpload={onUpload} fetchFile={fetchBackgroundImageURL} isActive={isActive} setIsActive={setIsActive} appendFileName={false} storagePath={storagePath} />
                <div onDoubleClick={() => setIsActive(true)} className='h-64 w-64 cursor-pointer p-3 bg-transparent'>
                    <div className='flex h-full w-full justify-center items-center border border-black-600 rounded'>
                        <img src={UploadIcon} className="w-20 h-20" />
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
                <img src={imageURL} style={{height: "100%", width: "100%",  backgroundSize: "100% 100%" }} className='bg-cover aspect-square' />
        )
    }
}

export default ImageElement