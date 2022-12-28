import React, { useContext, useEffect, useState } from 'react'
import addIcon from "../../assets/images/addIcon2.png"
import MenuIcon from "../../assets/images/menuIcon.png"
import NavLink from './NavLink.js'
import NavLinkBtn from "./NavLinkBtn.js"
import TextField from '../TextField.js'
import {db, storage} from "../../firebase.config"
import {doc, addDoc, collection, deleteDoc, getDocs, updateDoc} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL, deleteObject, listAll} from "firebase/storage"
import UploadModal from '../UploadModal'
import { ProjectContext } from '../../Project'

const NavBar = () => {

  const project = useContext(ProjectContext);
  console.log(project)

  const [navLinks, setNavLinks] = useState([]);
  const [navLogoUpload, setNavLogoUpload] = useState(null);
  const [navLogoURL, setNavLogoURL] = useState("");
  const [title, setTitle] = useState([]);

  // Checks if nav links and navbtn are active
  const [isActive, setIsActive] = useState(true);
  const [isUploadModalActive, setIsUploadModalActive] = useState(false);
  const [isAddBtnActive, setIsAddBtnActive] = useState(true);

  const storagePath = `Projects/Project_${project}/images/logo/`
  const navLinksCollectionPath = `Projects/Project_${project}/navLinks`;
  const titleCollectionPath = `Projects/Project_${project}/navbarTitleText`;
  const navLinksCollection = collection(db, navLinksCollectionPath);
  const titleCollection = collection(db, titleCollectionPath);

  const fetchNavLinks = async () => {
    const data = await getDocs(navLinksCollection);
    setNavLinks(data.docs.map(item => ({...item.data(), id: item.id})));
  }

  const fetchTitle = async () => {
    const data = await getDocs(titleCollection);
    // even though title is only one element, we need to store it in an array anyway
    setTitle(data.docs.map(item => ({...item.data(), id: item.id})));
  }

  const fetchLogo = () => {
    const imagesRef = ref(storage, storagePath);

    // list through all images
    listAll(imagesRef).then(list => {
      list.items.map(itemRef => getDownloadURL(itemRef).then(url => {
        setNavLogoURL(url);
      }))
    })
  }

  // fetch values from database and load them into our navLinks state
  useEffect(() => {
    fetchNavLinks();
    fetchTitle();
    fetchLogo();
  }, []);

  
  const deleteNavLink = async (id) => {
    const navLinkDoc = doc(db, navLinksCollectionPath, id);
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

  const uploadImage = async (file, setIsUploaded) => {
    if (file == 0){ 
      console.log("no file found");
      return;
    }
    
    // here we reference the path to which we want to store our image, not the folder in which we want it to be
    const imageRef = ref(storage, storagePath + file.name);        
    const imagesRef = ref(storage, storagePath)

    listAll(imagesRef).then(list => {
      list.items.map(itemRef => deleteObject(itemRef))
    });


    uploadBytes(imageRef, file).then(() => {
      fetchLogo();

      if (setIsUploaded !== null)
      {
        setIsUploaded(true);
      }
    }).catch(error => console.log("error occured upon upload"));

  }

  const handleUploadClick = () => {
    setIsUploadModalActive(true);
  }

  return (
    <div>
      <UploadModal uploadFunction={uploadImage} setIsActive={setIsUploadModalActive} isHidden={isUploadModalActive ? false : true}/>
      <nav className="flex flex-col md:flex-row md:items-center h-20 md:px-6 lg:px-12 bg-gradient-to-r from-gray-800 to-indigo-900 w-full text-white">
        
        <div className='basis-[10%] items-center md:mr-12 px-3'>  
          <a href="#" className='flex items-center justify-between'>
              <div className='inline-flex items-center'>
                <input id="fileInput" onChange={event => setNavLogoUpload(event.target.files[0])} type="file" className="hidden"/>
                <img src={(navLogoURL == "") ? addIcon : navLogoURL} onClick={handleUploadClick} className="w-20 h-20 hover:bg-gray-700 p-4 mr-2 md:mr-4"/>                
                {title.map(title => <TextField key={1} collection={titleCollectionPath} id={title.id} updateText={updateText} placeHolderText={title.text} defaultStyle={"text-2xl uppercase tracking-wide font-bold"} buttonStyle={'p-3 bg-gray-800 rounded-md md:m-3'} editStyle={"bg-gray-800 w-44 text-gray-300 text-2xl uppercase tracking-wide font-bold rounded-md  text-center italic outline-none"}/>)}
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
          <button className=' md:bg-gray-800 md:px-5  md:py-2 p-3 md:rounded-md text-gray-300 md:text-white'>LOGIN</button>
        </a>
        
      </nav>

    </div>
   
  )
  
}

export default NavBar