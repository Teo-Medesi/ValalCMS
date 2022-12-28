import React from 'react'  
import ProjectPreview from './ProjectPreview'

const ProjectBoard = () => {
  return (
    <div className='bg-gray-100 h-screen px-[5%]'>
        <div className='flex flex-col gap-20 bg-white p-[5%] h-screen '> 
            <div className='text-4xl italic'>Welcome back user!👋 </div>

            <div className='flex justify-between flex-wrap'>
                <div className='basis-[30%]'><ProjectPreview projectNumber="one"/></div>
                <div className='basis-[30%]'><ProjectPreview projectNumber="two"/></div>
                <div className='basis-[30%]'><ProjectPreview projectNumber="three"/></div>
                <div className='mt-6'><ProjectPreview projectNumber="four"/></div>
            </div>

        </div>
    </div>
  )
}

export default ProjectBoard