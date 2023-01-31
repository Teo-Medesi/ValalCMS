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
      Enthusiam is dropping pretty low on this project already, I guess the 90/10 rule is becoming more apparent, although I doubt Im even close to 60%,
      not 90% of the work, it's just that I've been working on this project for so long and I've been treating it more as a learning experience than as a product
      
      To give up now would be pretty cowardly, I don't think I could forgive myself for giving up on this as I usually do on most things.
      Let's not settle on mediocrity and let's instead do this project some justice.

      
      
      - organizing our workspace, opting for a better folder structure --- DONE
      
      - using custom hooks for anchors instead of manually fetching anchors everywhere
        ----> useAnchors - custom hook for getting our anchors, this would be used pretty much only in home or wherever we need all of our anchors 
        ----> useAnchor - custom hook for getting individual anchor, it would have only one parameter, the anchor path which it will get from Home,
                          it would fetch and rerender *only* the anchor which needs to be rerendered, not all anchors as we did with fetchAnchors.
                          What if the user has multiple pages and a lot of heavy duty anchors, it wouldn't make sense to fetch all of them if only 
                          one of them changed.
        
        we would also need useUser as it would be used quite often
        useProject is not of that high priority


      - adding add element functionality, the ability to add absolutely positioned textboxes
      - absolutely positioned images
      - textbox resizability and alignment ---> perhaps I want to center text inside of a container, it's z index would be higher than anything else
        on the screen and we could resize it for example to be screen width, then we can center the text inside of it
      

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
