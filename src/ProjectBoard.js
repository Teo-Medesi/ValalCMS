import React, {useContext} from 'react'  
import { UserContext } from './App'
import ProjectPreview from './ProjectPreview'
import Logo from "./assets/images/Valal1.png"

const ProjectBoard = () => {
  const user = useContext(UserContext)

  return (
    <div className='bg-background p-12 h-screen'>
        <div className='flex  flex-col gap-20 h-screen pb-12'> 
            <div className='text-4xl text-primary'>Welcome back {user.displayName ? user.displayName : user.email}!👋 </div>

            <div className='flex flex-col h-screen'>
              <div className='flex flex-row justify-start gap-12 flex-wrap'>
                  <div><ProjectPreview projectNumber="one"/></div>
                  <div><ProjectPreview projectNumber="two"/></div>
                  <div><ProjectPreview projectNumber="three"/></div>
              </div>
              
              
              <div className="h-full flex flex-col justify-end">
                <div className="flex w-full border-t-2 border-t-black-500 justify-center items-center">
                  <img src={Logo} className="scale-75" />
                </div>
              </div>

            </div>

        </div>
    </div>
  )
}

export default ProjectBoard