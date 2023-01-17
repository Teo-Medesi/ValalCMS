import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import PreviewPicture from "./assets/images/Capture.PNG"
import { storage } from './firebase.config'
import { ref, listAll, getDownloadURL } from 'firebase/storage'


const ProjectPreview = ({name}) => {

  return (
    <Link to={`/${name}`}>
        <div className='transition p-6 ease-in-out duration-200 hover:brightness-75 cursor-pointer w-72 h-40 shadow-md shadow-black-700 bg-black-100 rounded-2xl'> 
          <p className='text-2xl text-black-900'>{name}</p>

          <div className='w-full h-full flex justify-end items-end pb-8'>
            <div className='flex flex-row gap-1'>
              <div className='rounded-full w-8 h-8 bg-primary'></div>
              <div className='rounded-full w-8 h-8 bg-secondary'></div>
              <div className='rounded-full w-8 h-8 bg-tertiary'></div>
              <div className='rounded-full w-8 h-8 bg-gradient-to-tr from-primary to-secondary'></div>
            </div>
          </div>
        </div>
    </Link>
  )
}

export default ProjectPreview