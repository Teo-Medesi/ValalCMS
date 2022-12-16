import React from "react"
import NavBar from "./components/navBar/NavBar.js"
import "./assets/output.css";
import ArticleSection from "./components/featuredArticles/ArticleSection.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import CommenntBoard from "./components/commentBoard/CommentBoard.js";


function App() {
  return (
    <div className="">
      <NavBar />
      <Header />
      <CommenntBoard />
      <ArticleSection />
      <Footer />
    </div>
  );
}

export default App;
