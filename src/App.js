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
        ok, let me collect my thoughts here before we go on forward
        we want to focus more on functionality and for now just forget a bit about design

        in these 4 days of non-stop work I have organize myself and assign a clear goal and quota that is to be met at the end
        of the day

        Since we are still lacking a lot of functionality I would like to dedicate 3 days to just expanding our app's capabilities

        The goal for day 1 will be setting up our backend for our projects in firebase
            ---- DONE no matter the design, the create project section is complete
            ---- DONE uppon completion of the create project questions, all of the users answers should be stored and used to create a new project collection
            ---- DONE after the project is created, the user should be redirected to the new project and a project link should be added to the dashboard
            ---- DONE for each project a new Route should be created
            ---- DONE we need to make a new Textbox component since the old one has some really shit code, better to clear the slate and start clean
            reorganize the sidepanel, make it toggleable, if it's not toggled make it show only icons
            pretty much copy the sidepanel of wix, not in design but in content
            
            --TEMPLATE--
            the template we made will be our theme for pretty much every template we make in the future because of it's simplicity
            for now I want to keep the template preview and editable template separate
            that way, once the user is happy with his editable template, he can choose to see it in action, and we will just pass in all the 
            prefferences and content into a new preview template

            let's start with first making the text editable, we may want to update our Textbox component for this or quite possibly rewrite it
            upon clicking on a textbox, the sidemenu will open and navigate to text editing, giving control over font, font size, color, text decoration and the such

            --DATABASE--
            ---DONE for each page of the project we want to create a collection, in that collection we will have a prefferences document and collections for each component
            for each textbox in the page we want to create a new textbox document, we'll make it self-numerating and in the future the user will have access to 
            a mock-up of the current page collection where he will be able to manipulate the documents and collections in a file explorer kind of way

        the fourth day will be something like a maintenance day, fixing redundancies in code, documenting code, organizing our working directories
        adding naming conventions among many more conventions (remember, 10% means a lot, even a 5% makes a difference in a competition)
        
        the design part of the process would hopefully be done to some extent by Ivano, but I can't yet count on him for sure
        therefore, the fifth day would be atleast half dedicated to making more templates and components

    */

  /*
  
    DAY 2 
    
    copy the design of wixes sidepanel and start working on the functionality from there
    make text decorable
  
  
  */





/* 
Todo list

  COMPLAINTS / BUGS
    - creating an account with google is not different from signing in with google, therefore creating an accoutn on the sign in page will not be treated as if a new account has been registered
    - entire website is just generally unresponsive and janky
    - designs are inconsistent and don't follow any proper convention
    - sign up and sign in pages have different spacings for some reason which makes the transition from one to another a bit unsatisfying 

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
