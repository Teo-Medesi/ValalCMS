import React, { useEffect, createContext } from 'react'
import PropTypes from "prop-types"
import PortfolioTemplateEditable from './components/websiteTemplates/PortfolioTemplateEditable.js';
import EmptyProject from './components/websiteTemplates/EmptyProject.js';

const Content = ({category, template}) => {
  
  if (template != "none")
  {
    switch (category) {
      case "Portfolio": return <PortfolioTemplateEditable />
    } 
  }
  else {
    return <EmptyProject />
  }

  
}

const Home = ({className, category, template}) => {

  return (
      <div className={className}>
        <Content category={category} template={template} />
      </div>
  )
}

export default Home