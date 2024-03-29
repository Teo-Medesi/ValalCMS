import React, { useEffect, useState, useContext, createContext } from 'react'
import EmptyProject from '../layout/websiteTemplates/EmptyProject/EmptyProject.jsx';
import { UserContext } from '../App.jsx';
import { ProjectContext } from '../features/project/Project.jsx';
import { HomeContext } from '../features/project/Project.jsx';
import useAnchors from '../features/anchors/hooks/useAnchors.jsx';

export const AnchorContext = createContext();

const Content = ({category, template}) => {
  
/*   if (template != "none")
  {
    switch (category) {
      case "Portfolio": return <PortfolioTemplateEditable />
    } 
  }
  else {
    return <EmptyProject/>
  } */

  // no template functionality as of now
  return <EmptyProject />
  
}

const Home = ({className, category, template}) => {

  const [anchorsPath, setAnchorsPath] = useState("");
  const {anchors, fetchAnchors} = useAnchors(anchorsPath);

  const [home, fetchHome] = useContext(HomeContext);
  
  const [user, setUser] = useContext(UserContext);
  const [project, _ignore] = useContext(ProjectContext);


  useEffect(() => {
    if (user != null && user != [] && project.path != null)
    {
      setAnchorsPath(`${project.path}/pages/home/anchors`);
    }

  }, [user, project.path])

  return (
        <AnchorContext.Provider value={[anchors, anchorsPath, fetchAnchors]}>
          <div style={{backgroundColor: home.backgroundColor}} className={className}>
            <Content category={category} template={template}/>
          </div>
        </AnchorContext.Provider>
  )
}

export default Home