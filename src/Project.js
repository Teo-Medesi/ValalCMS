import React,{useEffect, useState, useContext} from 'react'
import Home from './Home'
import { createContext } from 'react';
import Logo from "./assets/images/settingsWhite.png"
import Settings from './Settings';
import { doc, getDoc } from 'firebase/firestore';
import { UserContext } from './App';
import { db } from './firebase.config';

export const ProjectContext = createContext();

const Project = ({name}) => {
  const [settingsComponent, setSettingsComponent] = useState("");
  const [project, setProject] = useState([]);

  const [user] = useContext(UserContext);

  const fetchProject = async () => {
    const projectRef = doc(db, `users/${user.uid}/projects/${name}`);
    const projectSnap = await getDoc(projectRef);
    setProject({...projectSnap.data(), id: projectSnap.id});
  }

  // in initial render user is still null
  useEffect(() => {
    if (user !== [] && user !== null) fetchProject();
  }, [user]);


  return (
    <ProjectContext.Provider value={name}>
        <div className='flex'>
          <div className='basis-[20%]'>
              <div className="fixed flex flex-col min-h-screen w-[20%] bg-primary border-r border-gray-800 shadow-inner">
                  <div className='flex gap-2 flex-row items-center py-4 pl-1'>
                      <img onClick={() => setSettingsComponent("")} className="w-12 h-12 transition duration-300 cursor-pointer hover:rotate-45" src={Logo}/>
                      <p className='uppercase font-bold text-2xl underline text-background underline-offset-4 hover:shadow-xl cursor-pointer'>{name}</p>
                  </div>
                  <Settings setSettingsComponent={setSettingsComponent} settingsComponent={settingsComponent} />
              </div>
          </div>
            <Home className={"basis-[80%]"} category={project.category}/>
        </div>
    </ProjectContext.Provider>
  )
}

export default Project