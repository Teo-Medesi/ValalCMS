import React, { useEffect, createContext } from 'react'
import ArticleSection from "./components/featuredArticles/ArticleSection.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import CommenntBoard from "./components/commentBoard/CommentBoard.js";
import NavBar from './components/navBar/NavBar.js';
import PropTypes from "prop-types"

const Home = ({className}) => {
  return (
      <div className={className}>
          <NavBar/>
          <Header/>
          <ArticleSection/>
          <Footer/>
      </div>
  )
}

Home.propTypes = {
  projectNumber: PropTypes.string.isRequired
}

export default Home