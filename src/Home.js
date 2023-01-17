import React, { useEffect, createContext } from 'react'
import ArticleSection from "./components/featuredArticles/ArticleSection.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import CommenntBoard from "./components/commentBoard/CommentBoard.js";
import NavBar from './components/navBar/NavBar.js';
import PropTypes from "prop-types"
import PortfolioTemplateEditable from './components/websiteTemplates/PortfolioTemplateEditable.js';

const Content = ({category}) => {
  
  switch (category) {
    case "Portfolio": return <PortfolioTemplateEditable />
  } 
  
}

const Home = ({className, category}) => {

  return (
      <div className={className}>
        <Content category={category} />
      </div>
  )
}

export default Home