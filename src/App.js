import React, { createContext, useEffect } from "react"
import { db } from "./firebase.config";
import "./assets/css/output.css";
import Project from "./Project"
import Dashboard from "./Dashboard";
import {Routes, Route} from "react-router-dom"
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Loading from "./Loading"
import Protected from "./components/Protected";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebase.config"
import { collection, getDocs } from "firebase/firestore";
import ProjectCreation from "./ProjectCreation";
import PortfolioTemplate from "./components/websiteTemplates/PortfolioTemplate";

/* 
Todo list

  COMPLAINTS / BUGS
    - creating an account with google is not different from signing in with google, therefore creating an accoutn on the sign in page will not be treated as if a new account has been registered
    - entire website is just generally unresponsive and janky
    - designs are inconsistent and don't follow any proper convention
    - sign up and sign in pages have different spacings for some reason which makes the transition from one to another a bit unsatisfying 

  ------- TASKS AT THE TOP ARE THE MOST IMPORTANT -------
    
    // update dashboard and the projects to use the newly created database structure
    // make functionality for adding new projects, upon making a new project the user is directed towards a simple setup page 
    where he declares his preferred color theme, fonts, project name and website title,  set of icons he will be using...

  make an account page
  make a settings page
  make a config file in firebase for user preferences 


  add database to featured articles
  finish featured articles, add article modal

  add more variations of each component
  basic CMS functionality, the option to replace one component with another
  make it so the user can choose between atleast 3 navbar components, with different themes
    => make modal for selecting which navbar the user wants to be displayed

  make a landing page for the CMS
  make a few themes for the already existing components, make these themes global
  make font themes

*/

export const UserContext = createContext({user: {}})

function App() {
  const [user, setUser] = useState([]);
  const [projects, setProjects] = useState([]);
 
  
  const fetchProjects = async () => {
    const projectsRef = collection(db, `users/${user.uid}/projects`);
    const snapshot = await getDocs(projectsRef);
    setProjects(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
  }
  
  // in initial render user is still null
  useEffect(() => {
    if (user !== [] && user !== null) fetchProjects();
  }, [user]);

  onAuthStateChanged(auth, (userRef => {
    if (userRef) setUser(userRef);
    else setUser(null)
  }))

  return (
      <UserContext.Provider value={[user, setUser]}>
        <div className="font-inter">
          <Routes>
            <Route path="/" element={<Loading />}/>
            <Route path="/dashboard"  element={<Protected><Dashboard /></Protected>} />
            <Route path="/signIn" element={<SignIn setUser={setUser} />}/>
            <Route path="/signUp" element={<SignUp setUser={setUser}/>}/>
            {projects.map(project => <Route path={`/${project.name}`} element={<Protected><Project name={project.name}/></Protected>} />)}
            <Route path="/createProject" element={<Protected><ProjectCreation /></Protected>} />
            <Route path="/template" element={<PortfolioTemplate />} />
          </Routes>
        </div>
      </UserContext.Provider>
  );
}

export default App;
