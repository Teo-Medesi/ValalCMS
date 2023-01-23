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
  const [isToggled, setIsToggled] = useState(false);
  const [isToggledRelative, setIsToggledRelative] = useState(false);
  const [isAnchorActive, setIsAnchorActive] = useState(false);

  const [user] = useContext(UserContext);


  const fetchProject = async () => {
    const projectPath = `users/${user.uid}/projects/${name}`;
    const projectRef = doc(db, projectPath);
    const projectSnap = await getDoc(projectRef);
    setProject({...projectSnap.data(), id: projectSnap.id, path: projectPath});
  }

  // in initial render user is still null
  useEffect(() => {
    if (user !== [] && user !== null) fetchProject();
  }, [user]);


  return (
    <ProjectContext.Provider value={[project, [isAnchorActive, setIsAnchorActive, fetchProject]]}>
        <div onDragOver={event => event.preventDefault()} onDrop={event => event.preventDefault()} className='flex overflow-hidden min-h-screen max-h-full relative flex-row justify-between'>
            <Settings isToggled={isToggled} isToggledRelative={isToggledRelative} setIsToggledRelative={setIsToggledRelative} setIsToggled={setIsToggled} />
            <Home className={isToggled ? "basis-[100%] overflow-scroll max-h-screen overflow-x-hidden" : isToggledRelative ? "basis-3/5 max-h-screen overflow-scroll overflow-x-hidden " : "basis-[95%] max-h-screen overflow-scroll overflow-x-hidden"} category={project.category} template={project.template}/>
        </div>
    </ProjectContext.Provider>
  )
}

export default Project