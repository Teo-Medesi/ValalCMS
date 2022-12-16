import React, { useEffect } from 'react'
import Logo from "./images/logoIcon.png"
import MenuIcon from "./images/menuIcon.png"
import { useState } from 'react'
import NavLink from './NavLink.js'
import NavLinkBtn from "./NavLinkBtn.js"
import TextField from '../TextField.js'
import {db, storage} from "../../firebase.config"
import {doc, addDoc, collection, deleteDoc, getDocs, updateDoc} from "firebase/firestore"
import {ref, uploadBytes} from "firebase/storage"

const NavBar = () => {

  const [navLinks, setNavLinks] = useState([]);
  const [navLogoUpload, setNavLogoUpload] = useState(null);
  const [title, setTitle] = useState([]);

  // Checks if nav links and navbtn are active
  const [isActive, setIsActive] = useState(true);
  const [isAddBtnActive, setIsAddBtnActive] = useState(true);

  const navLinksCollection = collection(db, "navLinks");
  const titleCollection = collection(db, "title");

  const fetchNavLinks = async () => {
    const data = await getDocs(navLinksCollection);
    setNavLinks(data.docs.map(item => ({...item.data(), id: item.id})));
  }

  const fetchTitle = async () => {
    const data = await getDocs(titleCollection);
    // even though title is only one element, we need to store it in an array anyway
    setTitle(data.docs.map(item => ({...item.data(), id: item.id})));
  }

  // fetch values from database and load them into our navLinks state
  useEffect(() => {
    fetchNavLinks();
    fetchTitle();
  }, []);

  
  const deleteNavLink = async (id) => {
    const navLinkDoc = doc(db, "navLinks", id);
    await deleteDoc(navLinkDoc);
    fetchNavLinks();
  }   
  const handleClick = event => {
    setIsActive(current => !current);
  }
 
  const addNavLink = async () => {
    if(isAddBtnActive)
    {
      await addDoc(navLinksCollection, {key: navLinks.length + 1, text: "Click me", link: "#"});
      fetchNavLinks();

      // a bit redundant since we already have a handleIfActive function, but without this if check the addButton would get re-rendered 2 more times before dissapearing, making it look a bit glitchy
      if (navLinks.length === 4)
      {
        setIsAddBtnActive(false);
      }
    }
  }
  
  const handleIfAddBtnActive = () => {
    if(navLinks.length < 5)
    {
      setIsAddBtnActive(true);
    }
    else {
      setIsAddBtnActive(false);
    }
    
  }

  // in order to update text via TextField, we must pass in updateText(), the id and collection of the document
  const updateText = async (id, text, collection) => {
    const navLinkDoc = doc(db, collection, id);
    await updateDoc(navLinkDoc, {text: text});
  }

  const uploadImage = () => {
    document.getElementById("fileInput").click();       
    if (navLogoUpload == null) return;

    const imageRef = ref(storage, "images");        
    uploadBytes(imageRef, navLogoUpload).then(() => (
      console.log("Image uploaded")
    ));

  }

  return (
    <nav className="flex flex-col md:flex-row md:items-center h-20 md:px-6 lg:px-12 bg-gradient-to-r from-gray-800 to-indigo-900 w-full text-white">
        
        <div className='basis-[10%] items-center md:mr-12 px-3'>  
          <a href="#" className='flex items-center justify-between'>
              <div className='inline-flex items-center'>
                <input id="fileInput" onChange={event => setNavLogoUpload(event.target.files[0])} type="file" className="hidden"/>
                <img src={Logo} onClick={uploadImage} className="w-20 h-20 hover:bg-gray-700 p-4 mr-2 md:mr-4"/>                
                {title.map(title => <TextField collection={"title"} id={title.id} updateText={updateText} placeHolderText={title.text} defaultStyle={"text-2xl uppercase tracking-wide font-bold"} buttonStyle={'p-3 bg-gray-800 rounded-md md:m-3'} editStyle={"bg-gray-800 w-44 text-gray-300 text-2xl uppercase tracking-wide font-bold rounded-md  text-center italic outline-none"}/>)}
              </div>
              
              <button onClick={handleClick}  className="p-2 text-white mt-1 md:hidden ml-auto rounded-md hover:bg-gray-800"><img src={MenuIcon}/></button>
          </a>

        </div>
        <div className={isActive ? "basis-[80%] md:justify-start bg-gradient-to-r from-gray-800 to-indigo-900 md:from-transparent md:to-transparent" : "basis-[80%] md:justify-start bg-gradient-to-r from-gray-800 to-indigo-900 md:from-transparent md:to-transparent hidden"}>


          <ul className='flex flex-col md:inline-flex md:flex-row'>
            {navLinks.map(navLink => <NavLink updateText={updateText} onDelete={deleteNavLink} text={navLink.text} link={navLink.link} id={navLink.id} key={navLink.key}/>)}

            <NavLinkBtn addFunction={addNavLink} isActive={isAddBtnActive} checkIfActive={handleIfAddBtnActive}/>

          </ul>
        </div>

        <a href="#" className={isActive ? 'flex basis-[10%] text-xl justify-center bg-gray-800 md:rounded-md hover:text-white hover:brightness-125' : 'flex basis-[10%] p-3 text-xl md:justify-end bg-gray-800 md:justify-center md:rounded-md hover:text-white hover:brightness-125 hidden'}>
          <button className=' md:bg-gray-800 md:px-5 md:py-2 p-3 md:rounded-md text-gray-300 md:text-white'>LOGIN</button>
        </a>
    </nav>
  )
}

export default NavBar