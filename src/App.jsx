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
            {projects.map((project, index) => <Route key={index} path={`/${project.name}`} element={<Protected><Project name={project.name}/></Protected>} />)}
            <Route path="/createProject" element={<Protected><ProjectCreation /></Protected>} />
            <Route path="/test" element={<DevelopmentPage />} />
          </Routes>
        </div>
      </UserContext.Provider>
  );
}

export default App;
