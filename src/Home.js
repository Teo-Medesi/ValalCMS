import React, { useEffect, useState, useContext } from 'react'
import PropTypes from "prop-types"
import PortfolioTemplateEditable from './components/websiteTemplates/PortfolioTemplateEditable.js';
import EmptyProject from './components/websiteTemplates/EmptyProject.js';
import { UserContext } from './App.js';
import { ProjectContext } from './Project.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.config.js';

const Content = ({category, template, anchors, anchorsPath}) => {
  
  if (template != "none")
  {
    switch (category) {
      case "Portfolio": return <PortfolioTemplateEditable />
    } 
  }
  else {
    return <EmptyProject anchorsPath={anchorsPath} anchors={anchors} />
  }

  
}

const Home = ({className, category, template}) => {

  const [anchors, setAnchors] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [project, _ignore] = useContext(ProjectContext);

  const fetchAnchors = async () => {
    const anchorsCollection = collection(db, `${project.path}/pages/home/anchors`);
    const anchorsSnap = await getDocs(anchorsCollection);
    anchorsSnap.forEach(anchorSnap => setAnchors(current => ([...current, {...anchorSnap.data(), id: anchorSnap.id, path: `${project.path}/pages/home/anchors/${anchorSnap.id}`}])))
  }

  useEffect(() => {
    if (user != null && user != [] && project.path != null)
    {
      fetchAnchors();
    }

  }, [user, project.path])
  

  return (
      <div className={className}>
        <Content category={category} template={template} anchorsPath={`${project.path}/pages/home/anchors/`} anchors={anchors}/>
      </div>
  )
}

export default Home