import React from "react"
import NavBar from "./components/navBar/NavBar.js"
import "./assets/output.css";
import ArticleSection from "./components/featuredArticles/ArticleSection.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import CommenntBoard from "./components/commentBoard/CommentBoard.js";

/* 
Todo list

  add database to featured articles
  add database to comment board
  finish featured articles, add article modal

  add more variations of each component
  make draft functionality
    => make project board window
  basic CMS functionality, the option to replace one component with another
  make it so the user can choose between atleast 3 navbar components, with different themes
    => make modal for selecting which navbar the user wants to be displayed

  add user authentication
  make a landing page for the CMS which takes to user to a login page, after the user is authenticated he can access the editor
  make a few themes for the already existing components, make these themes global
  in order for themes to apply to the entire project, we must have a project, that is we need to add the option of having more different editing templates that is projects
  make font themes

*/


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
