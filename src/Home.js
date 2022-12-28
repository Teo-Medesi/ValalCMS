import React, { useEffect, createContext } from 'react'
import ArticleSection from "./components/featuredArticles/ArticleSection.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import CommenntBoard from "./components/commentBoard/CommentBoard.js";
import NavBar from './components/navBar/NavBar.js';
import PropTypes from "prop-types"

export const ProjectContext = createContext();

const Home = ({projectNumber}) => {

  return (
    <ProjectContext.Provider value={projectNumber}>
      <div>
          <NavBar/>
          <Header/>
          <ArticleSection/>
          <Footer/>
      </div>
    </ProjectContext.Provider>
  )
}

Home.propTypes = {
  projectNumber: PropTypes.string.isRequired
}

export default Home