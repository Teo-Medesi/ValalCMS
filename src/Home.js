import React, { useEffect, useState, useContext, createContext } from 'react'
import PropTypes from "prop-types"
import PortfolioTemplateEditable from './components/websiteTemplates/PortfolioTemplateEditable.js';
import EmptyProject from './components/websiteTemplates/EmptyProject.js';
import { UserContext } from './App.js';
import { ProjectContext } from './Project.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase.config.js';

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

  const [anchors, setAnchors] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [project, _ignore] = useContext(ProjectContext);
  const [anchorsPath, setAnchorsPath] = useState("");
  
  const fetchAnchors = async () => {
    // if we don't specify orderBy("id"), the array we get returned won't be sorted, therefore all the anchors that is sections would be unsorted
    const anchorsRef = query(collection(db, anchorsPath), orderBy("ID"));
    const anchorsSnap = await getDocs(anchorsRef);
    
    // before we set our anchors we want to make sure our anchors array is empty, if it isn't, our anchors won't be replaced, they'll just be duplicated 
    setAnchors([]);
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