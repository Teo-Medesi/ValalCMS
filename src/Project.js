import React from 'react'
import {Link} from "react-router-dom"
import PreviewPicture from "./images/Capture.PNG"

const Project = (projectNumber) => {
  return (
    <Link to={`project_${projectNumber.projectNumber}`}>
        <div className='flex justify-center items-center transition ease-in-out duration-200 hover:brightness-75 cursor-pointer w-96 h-48 border-2 border-gray-700'><img src={PreviewPicture}/></div>
        <div className='text-xl'>Project_{projectNumber.projectNumber}</div>
    </Link>
  )
}

export default Project