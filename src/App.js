import React from "react"
import "./assets/css/output.css";
import Project from "./Project"
import ProjectBoard from "./ProjectBoard";
import {Routes, Route} from "react-router-dom"

/* 
Todo list

  add database to featured articles
  add database to comment board
  finish featured articles, add article modal

  make side menu for project settings
  add custom color themes to tailwind
  add more variations of each component
  // DONE ----- make draft functionality
    =>  DONE ----- make project board window
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
      <Route path="/project_one" element={<Project projectNumber="one"/>}/>
      <Route path="/project_two" element={<Project projectNumber="two"/>}/>
      <Route path="/project_three" element={<Project projectNumber="three"/>}/>
      <Route path="/project_four" element={<Project projectNumber="four"/>}/>
    </Routes>
  );
}

export default App;
