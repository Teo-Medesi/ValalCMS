import React, {useContext, useState} from 'react'  
import { UserContext } from './App'
import ProjectPreview from './ProjectPreview'
import Logo from "./assets/images/Valal1.png"
import ProfileIcon from "./assets/images/user.png"
import ProfileIcon2 from "./assets/images/user2.png"
import HomeIcon from "./assets/images/home.png"
import Settings from "./assets/images/settingsWhite.png"
import { signOut } from 'firebase/auth'
import { auth, db } from "./firebase.config"
import { useEffect } from 'react'
import { collection, doc, getDocs, setDoc, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext)
  const [formattedEmail, setFormattedEmail] = useState("");
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate()
  
  const fetchProjects = async () => {
    const projectsRef = collection(db, `users/${user.uid}/projects`);
    const snapshot = await getDocs(projectsRef);
    setProjects(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
  }

  // in initial render user is still null
  useEffect(() => {
    if (user !== [] && user !== null) fetchProjects();
    if (user === null) navigate("/");
  }, [user]);


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
    <div className='flex flex-row justify-start overflow-y-scroll bg-black-100 h-auto'>

        <div className='flex flex-col h-screen basis-1/5 text-lg bg-primary'>

          <div className='flex basis-[9%] flex-row gap-6 bg-primary-700 border-b-4 border-black-400 px-3 py-8 w-full items-center'>
            <img src={user.photoURL ? user.photoURL : ProfileIcon} className="w-10 h-10 rounded-[50%]"/>
            <p className='text-background  w-full'>{user.displayName ? user.displayName : formattedEmail}</p>
          </div>

          <div className='basis-[84%]'>
            <div className='flex flex-row justify-start hover:bg-primary-700 cursor-pointer gap-8 px-3 py-6'>
              <img src={HomeIcon} className="w-8 h-8"  />  
              <p className='text-background '>Dashboard</p>
            </div>
            <div className='flex flex-row justify-start hover:bg-primary-700  cursor-pointer gap-8 px-3 py-6'>
              <img src={ProfileIcon2} className="w-8 h-8"  />  
              <p className='text-background '>Account</p>
            </div>
            <div className='flex flex-row justify-start hover:bg-primary-700  cursor-pointer gap-8 px-3 py-6'>
              <img src={Settings} className="w-8 h-8"  />  
              <p className='text-background '>Settings</p>
            </div>

          </div>

          <div onClick={handleSignOut} className='basis-[7%] cursor-pointer  flex items-center justify-center hover:bg-tertiary bg-primary-700'>
              <div className='flex flex-row justify-center gap-8 px-3 py-6'>
                <p className='text-background uppercase '>sign out</p>
              </div>
          </div>

        </div>

        <div className='flex basis-4/5 flex-col h-screen overflow-scroll-y overflow-x-hidden'> 
            <div className='bg-secondary basis-1/6 p-12'>

              <div className='flex flex-row gap-10 flex-nowrap'>
                {projects.map((project, index) => <ProjectPreview name={project.name} key={index} />)}
                
                <div onClick={() => navigate("/createProject")} className='transition flex justify-center items-center ease-in-out duration-200 hover:brightness-75 cursor-pointer w-72 h-40 shadow-md shadow-black-700 bg-black-100 rounded-2xl'> 

                  <div className='text-3xl text-primary'>+</div>

                </div>

              </div>

            </div>

            <div className='basis-5/6 relative'>

              <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg className='w-[calc(193% + 1.3px)] block relative' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-secondary"></path>
                </svg>  
              </div>

              <div className='p-12 py-36'>
                <h1 className='text-black-900 text-4xl'>Get started with Valal</h1>

                <div className='pt-12 pb-6 flex flex-row gap-6'>

                  <div className='h-80 basis-1/2 shadow-md shadow-black-500 rounded-md bg-black-600'>
                  </div>

                  <p className='basis-1/2 text-black-900' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.atem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam  </p>
                </div>

                <p className='text-black-900'>  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
              </div>

            </div>
              


        </div>
    </div>
  )
}

export default Dashboard