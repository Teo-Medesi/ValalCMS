import React, {useContext, useState} from 'react'  
import { UserContext } from './App'
import ProjectPreview from './ProjectPreview'
import Logo from "./assets/images/Valal1.png"
import ProfileIcon from "./assets/images/user.png"
import ProfileIcon2 from "./assets/images/user2.png"
import HomeIcon from "./assets/images/home.png"
import Settings from "./assets/images/settingsWhite.png"
import { signOut } from 'firebase/auth'
import { auth } from "./firebase.config"
import { useEffect } from 'react'

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext)
  const [formattedEmail, setFormattedEmail] = useState("");

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    if (user.email)
    {
      setFormattedEmail(formatEmail(user.email));
    }
  }, [user.email]);

  const formatEmail = email => {
    const formattedEmail = email;
    formattedEmail.replace("@gmail.com", "");
    return formattedEmail;
  }

  return (
    <div className='flex flex-row justify-start bg-background h-screen'>

        <div className='flex flex-col border-black-500 border-r-4 h-screen basis-1/6 bg-primary'>

          <div className='flex basis-[9%] flex-row gap-6 bg-primary-700 border-b-4 border-black-400 px-3 py-8 w-full items-center'>
            <img src={user.photoURL ? user.photoURL : ProfileIcon} className="w-10 h-10 rounded-[50%]"/>
            <p className='text-background text-xl'>{user.displayName ? user.displayName : formattedEmail}</p>
          </div>

          <div className='basis-[84%]'>
            <div className='flex flex-row justify-start hover:bg-primary-700 cursor-pointer gap-8 px-3 py-6'>
              <img src={HomeIcon} className="w-8 h-8"  />  
              <p className='text-background text-xl'>Dashboard</p>
            </div>
            <div className='flex flex-row justify-start hover:bg-primary-700  cursor-pointer gap-8 px-3 py-6'>
              <img src={ProfileIcon2} className="w-8 h-8"  />  
              <p className='text-background text-xl'>Account</p>
            </div>
            <div className='flex flex-row justify-start hover:bg-primary-700  cursor-pointer gap-8 px-3 py-6'>
              <img src={Settings} className="w-8 h-8"  />  
              <p className='text-background text-xl'>Settings</p>
            </div>

          </div>

          <div onClick={handleSignOut} className='basis-[7%] cursor-pointer  flex items-center justify-center hover:bg-tertiary bg-primary-700'>
              <div className='flex flex-row justify-center gap-8 px-3 py-6'>
                <p className='text-background text-xl uppercase'>sign out</p>
              </div>
          </div>

        </div>

        <div className='flex basis-5/6 px-12 py-8 pb-0 flex-col gap-16 h-screen'> 
            <div className='text-4xl text-primary'>Welcome {user.displayName ? user.displayName : user.email}!👋 </div>

            <div className='flex flex-col h-screen'>
              <div className='flex flex-row justify-start gap-12 flex-wrap'>
                  <div><ProjectPreview projectNumber="one"/></div>
                  <div><ProjectPreview projectNumber="two"/></div>
                  <div><ProjectPreview projectNumber="three"/></div>
              </div>
              
              
              <div className="h-full flex flex-col justify-end">
                <div className="flex w-full border-t-2 border-t-black-500 justify-center items-center">
                  <img src={Logo} className="scale-[0.6]" />
                </div>
              </div>

            </div>

        </div>
    </div>
  )
}

export default Dashboard