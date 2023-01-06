import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import PreviewPicture from "./assets/images/Capture.PNG"
import { storage } from './firebase.config'
import { ref, listAll, getDownloadURL } from 'firebase/storage'


const ProjectPreview = ({id, name}) => {

  return (
    <Link to={`/project_${id}`}>
        <div className='transition p-6 ease-in-out duration-200 hover:brightness-75 cursor-pointer w-80 h-44 shadow-md shadow-black-700 bg-black-100 rounded-2xl'> 
          <p className='text-2xl text-black-900'>{name}</p>
        </div>
    </Link>
  )
}

export default ProjectPreview