import React, { useEffect } from 'react'
import ArticleSection from "./components/featuredArticles/ArticleSection.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import CommenntBoard from "./components/commentBoard/CommentBoard.js";
import NavBar from './components/navBar/NavBar.js';
import PropTypes from "prop-types"
import html2canvas from 'html2canvas';
import { db } from './firebase.config.js';
import { doc, updateDoc } from 'firebase/firestore';

const Home = ({projectNumber}) => {
  return (
    <div id="capture" className=''>
        <NavBar project={projectNumber}/>
        <Header project={projectNumber}/>
        <CommenntBoard project={projectNumber}/>
        <ArticleSection project={projectNumber}/>
        <Footer project={projectNumber}/>
    </div>
  )
}

Home.propTypes = {
  projectNumber: PropTypes.string
}

export default Home