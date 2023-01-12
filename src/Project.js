import React,{useEffect, useState, useContext} from 'react'
import Home from './Home'
import { createContext } from 'react';
import SettingsLogo from "./assets/images/svgs/gearIcon.svg"
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
          <div className='basis-[5%]'>
              <div className="fixed flex flex-col min-h-screen w-[5%] bg-primary border-r border-gray-800 shadow-inner">
                  <Settings setSettingsComponent={setSettingsComponent} settingsComponent={settingsComponent} />
              </div>
          </div>
            <Home className={"basis-[95%]"} category={project.category}/>
        </div>
    </ProjectContext.Provider>
  )
}

export default Project