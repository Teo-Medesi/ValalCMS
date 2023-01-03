import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import PreviewPicture from "./assets/images/Capture.PNG"
import { storage } from './firebase.config'
import { ref, listAll, getDownloadURL } from 'firebase/storage'


const ProjectPreview = (projectNumber) => {

  return (
    <Link to={`/project_${projectNumber.projectNumber}`}>
        <div className='transition p-6 ease-in-out duration-200 hover:brightness-75 cursor-pointer w-96 h-48 bg-gradient-to-tl from-secondary to-primary rounded-2xl'> 
          <p className='text-2xl font-semibold text-white'>Project_{projectNumber.projectNumber}</p>
        </div>
    </Link>
  )
}

export default ProjectPreview