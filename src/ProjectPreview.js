import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import PreviewPicture from "./assets/images/Capture.PNG"
import { storage } from './firebase.config'
import { ref, listAll, getDownloadURL } from 'firebase/storage'


const ProjectPreview = (projectNumber) => {

  const initialState = {
    previewURL: ""
  }

  const [previewURL, setPreviewURL] = useState(initialState.previewURL);

  const fetchPreviewURL = () => {
    const imagesRef = ref(storage, `Projects/Project_${projectNumber.projectNumber}/images/headerImage/`);

    listAll(imagesRef).then(list => {
      list.items.map(itemRef => getDownloadURL(itemRef).then(url => {
        setPreviewURL(url);
      }));
    })
  }

  useEffect(() => {
    fetchPreviewURL();
  })

  return (
    <Link to={`project_${projectNumber.projectNumber}`}>
        <div className='border-2 transition ease-in-out duration-200 hover:brightness-75 cursor-pointer w-96 h-48 border-gray-700'><img className="w-96 h-[188px]" src={(previewURL !== initialState.previewURL) ? previewURL : PreviewPicture}/></div>
        <div className='text-xl'>Project_{projectNumber.projectNumber}</div>
    </Link>
  )
}

export default ProjectPreview