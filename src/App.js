import React, { createContext, useEffect } from "react"
import { db } from "./firebase.config";
import "./assets/css/output.css";
import Project from "./features/project/Project"
import Dashboard from "./pages/Dashboard";
import {Routes, Route} from "react-router-dom"
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Loading from "./components/Loading"
import Protected from "./components/Protected";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebase.config"
import { collection, getDocs } from "firebase/firestore";
import ProjectCreation from "./pages/ProjectCreation";
import DevelopmentPage from "./test/DevelopmentPage";

    /* 
      Well I'll be damned if this competition ain't nothing but an unpleasant rhetorical ball smack to my mental wellbeing,
      progress moves so goddamn slow and this shit should be moving a lot lot faster, I feel very overwhelmed 
      Worst part is, most of the time I don't even know what's the most important thing to do
      there's always something to do, but with a deadline you really have to cut a lot of corners
      
      The problem with a CMS is that really is a full package deal, it really needs to have everything
      
      ---- the most important part right now is the back end, saving a users website to the database
      ---- being able to add more elements and assign roles to them
      ---- uploading files, media, iframes
      



    */


/* 
Todo list

  COMPLAINTS / BUGS
    - creating an account with google is not different from signing in with google, therefore creating an accoutn on the sign in page will not be treated as if a new account has been registered
    - entire website is just generally unresponsive and janky
    - designs are inconsistent and don't follow any proper convention
    - sign up and sign in pages have different spacings for some reason which makes the transition from one to another a bit unsatisfying 

  make an account page
  make a settings page (for what exactly??? There is still no real need for these two pages)

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
        <div className="font-inter overflow-hidden">
          <Routes>
            <Route path="/" element={<Loading />}/>
            <Route path="/dashboard"  element={<Protected><Dashboard /></Protected>} />
            <Route path="/signIn" element={<SignIn setUser={setUser} />}/>
            <Route path="/signUp" element={<SignUp setUser={setUser}/>}/>
            {projects.map(project => <Route path={`/${project.name}`} element={<Protected><Project name={project.name}/></Protected>} />)}
            <Route path="/createProject" element={<Protected><ProjectCreation /></Protected>} />
            <Route path="/test" element={<DevelopmentPage />} />
          </Routes>
        </div>
      </UserContext.Provider>
  );
}

export default App;
