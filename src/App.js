import React, { createContext } from "react"
import "./assets/css/output.css";
import Project from "./Project"
import ProjectBoard from "./ProjectBoard";
import {Routes, Route} from "react-router-dom"
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Loading from "./Loading"
import Protected from "./components/Protected";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebase.config"

/* 
Todo list

  add database to featured articles
  add database to comment board
  finish featured articles, add article modal

  // DONE make side menu for project settings
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

export const UserContext = createContext({user: {}})

function App() {
  const [user, setUser] = useState([]);

  onAuthStateChanged(auth, (userRef => {
    if (userRef) setUser(userRef);
  }))

  return (
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<Loading />}/>
          <Route path="/dashboard"  element={<Protected><ProjectBoard /></Protected>} />
          <Route path="/signIn" element={<SignIn setUser={setUser} />}/>
          <Route path="/signUp" element={<SignUp setUser={setUser}/>}/>
          <Route path="/project_one" element={<Protected><Project project="one"/></Protected>}/>
          <Route path="/project_two" element={<Protected><Project projectNumber="two"/></Protected>}/>
          <Route path="/project_three" element={<Protected><Project projectNumber="three"/></Protected>}/>
        </Routes>
      </UserContext.Provider>
  );
}

export default App;
