import React, { useEffect, useState, useContext } from 'react'
import Home from '../../pages/Home'
import { createContext } from 'react';
import Settings from '../settings/Settings';
import { doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../App';
import { db } from '../../firebase.config';

export const ProjectContext = createContext();
export const HomeContext = createContext();

const Project = ({ name }) => {
  const [settingsComponent, setSettingsComponent] = useState("");
  const [project, setProject] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [isToggledRelative, setIsToggledRelative] = useState(false);
  const [isAnchorActive, setIsAnchorActive] = useState(false);

  const [homePath, setHomePath] = useState("");
  const [home, setHome] = useState([]);
  const [user] = useContext(UserContext);

  const fetchProject = async () => {
    const projectPath = `users/${user.uid}/projects/${name}`;
    const projectRef = doc(db, projectPath);
    const projectSnap = await getDoc(projectRef);
    setProject({ ...projectSnap.data(), id: projectSnap.id, path: projectPath });
  }

  // in initial render user is still null
  useEffect(() => {
    if (user !== [] && user !== null) fetchProject();
  }, [user]);


  const fetchHome = async () => {
    const homeRef = doc(db, homePath);
    const homeSnap = await getDoc(homeRef);

    setHome(homeSnap.data());
  }


  useEffect(() => {
    if (user != null && user != [] && project.path != null) {
      setHomePath(`${project.path}/pages/home`);
    }

  }, [user, project.path])


  useEffect(() => {
    if (homePath !== "" && homePath != null) {
      fetchHome();
    }
  }, [homePath])



  return (
    <ProjectContext.Provider value={[project, [isAnchorActive, setIsAnchorActive, fetchProject]]}>
      <HomeContext.Provider value={[home, fetchHome]}>
        <div onDragOver={event => event.preventDefault()} onDrop={event => event.preventDefault()} className='flex overflow-hidden min-h-screen max-h-full relative flex-row justify-between'>
          <Settings isToggled={isToggled} isToggledRelative={isToggledRelative} setIsToggledRelative={setIsToggledRelative} setIsToggled={setIsToggled} />
          <Home className={isToggled ? "basis-[100%] overflow-scroll max-h-screen overflow-x-hidden" : isToggledRelative ? "basis-3/5 max-h-screen overflow-scroll overflow-x-hidden " : "basis-[95%] max-h-screen overflow-scroll overflow-x-hidden"} category={project.category} template={project.template} />
        </div>
      </HomeContext.Provider>
    </ProjectContext.Provider>
  )
}

export default Project