import React, { useEffect, useState, useContext, createContext } from 'react'
import PropTypes from "prop-types"
import PortfolioTemplateEditable from './components/websiteTemplates/PortfolioTemplateEditable.js';
import EmptyProject from './components/websiteTemplates/EmptyProject.js';
import { UserContext } from './App.js';
import { ProjectContext } from './Project.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.config.js';

export const AnchorContext = createContext();

const Content = ({category, template}) => {
  
  if (template != "none")
  {
    switch (category) {
      case "Portfolio": return <PortfolioTemplateEditable />
    } 
  }
  else {
    return <EmptyProject/>
  }
  
}

const Home = ({className, category, template}) => {

  const [anchors, setAnchors] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [project, _ignore] = useContext(ProjectContext);
  const [anchorsPath, setAnchorsPath] = useState("");
  
  const fetchAnchors = async () => {
    const anchorsCollection = collection(db, anchorsPath);
    const anchorsSnap = await getDocs(anchorsCollection);
    anchorsSnap.forEach(anchorSnap => setAnchors(current => ([...current, {...anchorSnap.data(), id: anchorSnap.id, path: `${project.path}/pages/home/anchors/${anchorSnap.id}`}])))
  }

  useEffect(() => {
    if (user != null && user != [] && project.path != null)
    {
      setAnchorsPath(`${project.path}/pages/home/anchors`);
    }

  }, [user, project.path])
  
  useEffect(() => {
    if (anchorsPath !== "" && anchorsPath != null) 
    {
      fetchAnchors();
    }
  }, [anchorsPath])
  

  return (
      <AnchorContext.Provider value={[anchors, anchorsPath, fetchAnchors]}>
        <div className={className}>
          <Content category={category} template={template}/>
        </div>
      </AnchorContext.Provider>
  )
}

export default Home