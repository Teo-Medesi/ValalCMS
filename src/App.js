import React from "react"
import "./assets/output.css";
import Home from "./Home.js";
import ProjectBoard from "./ProjectBoard";
import {Routes, Route} from "react-router-dom"

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
    <Routes>
      <Route path="/" element={<ProjectBoard />}/>
      <Route path="/project_one" element={<Home projectNumber="one"/>}/>
      <Route path="/project_two" element={<Home projectNumber="two"/>}/>
      <Route path="/project_three" element={<Home projectNumber="three"/>}/>
      <Route path="/project_four" element={<Home projectNumber="four"/>}/>
    </Routes>
  );
}

export default App;
