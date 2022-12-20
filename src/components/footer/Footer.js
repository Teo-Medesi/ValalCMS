import React, { useEffect, useState } from 'react'
import TextField from '../TextField'
import Logo from "./images/logo.png"
import {db} from "../../firebase.config"
import {doc, addDoc, collection, deleteDoc, getDocs, updateDoc} from "firebase/firestore"
import { storage } from '../../firebase.config'
import { ref, deleteObject, listAll, uploadBytes} from "firebase/storage"
import UploadModal from '../UploadModal'

const Footer = () => {
  
  const InitialState = {
    imageURL: "",
    isUploadModalActive: false
  }
  
  // first off, we need to fetch the image from our storage, we need an imageURL state
  const [imageURL, setImageURL] = useState(InitialState.imageURL);
  const [isUploadModalActive, setIsUploadModalActive] = useState(InitialState.isUploadModalActive);
  const [text, setText] = useState([]);
  const footerCollection = collection(db, "footerText");

  const fetchText = async () => {
    const data = await getDocs(footerCollection);
    // even though title is only one element, we need to store it in an array anyway
    setText(data.docs.map(item => ({...item.data(), id: item.id})));
  }

  const updateText = async (id, text, collection) => {
    const navLinkDoc = doc(db, collection, id);
    await updateDoc(navLinkDoc, {text: text});
  }

  useEffect(() => {
    fetchText();
    fetchImage();
  }, [])
  
  const fetchImage = () => {
    const imagesRef = ref(storage, "images/headerImage" );

    listAll(imagesRef).then(list => {
      list.items.map(itemRef => getDownloadURL(itemRef).then(url => {
        setImageURL(url);
      }));
    })
    console.log(imageURL)
  }

  useEffect(() => {
    fetchImage();
  },[]);
  
  const uploadImage = async (file, setIsUploaded) => {
    if (file == 0){
      console.log("no file found");
      return;
    }
    
    // here we reference the path to which we want to store our image, not the folder in which we want it to be
    const imageRef = ref(storage, "images/headerImage/" + file.name);        
    const imagesRef = ref(storage, "images/headerImage")

    listAll(imagesRef).then(list => {
      list.items.map(itemRef => deleteObject(itemRef))
    });


    uploadBytes(imageRef, file).then(() => {
      fetchImage();

      if (setIsUploaded !== null)
      {
        setIsUploaded(true);
      }
    }).catch(error => console.log("error occured upon upload"));

  }

  const handleUploadClick = () => {
    setIsUploadModalActive(true);
  }


  if (isUploadModalActive === true)
  {
    return (
      <div>
        <UploadModal uploadFunction={uploadImage} setIsActive={setIsUploadModalActive} isHidden={isUploadModalActive ? false : true}/>
        <div className='flex px-16 justify-center items-center bg-gray-800 h-20'>
            <div className='basis-[40%]'>
              <img src={Logo} className="w-12 h-12" />
            </div>
            {/* h */}
            <div className='basis-[60%] justify-start '>
              {text.map(item => <TextField key={1} collection={"footerText"} placeHolderText={item.text} id={item.id} updateText={updateText} defaultStyle={"text-xl text-white rounded-md hover:bg-gray-900 p-3"} editStyle={"text-xl outline-none text-white bg-gray-800 italic"} />)}
            </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='flex px-16 justify-center items-center bg-gray-800 h-20'>
          <div className='basis-[40%]'>
            <img src={Logo} onClick={handleUploadClick} className="w-12 h-12" />
          </div>
          {/* h */}
          <div className='basis-[60%] justify-start '>
            {text.map(item => <TextField key={1} collection={"footerText"} placeHolderText={item.text} id={item.id} updateText={updateText} defaultStyle={"text-xl text-white rounded-md hover:bg-gray-900 p-3"} editStyle={"text-xl outline-none text-white bg-gray-800 italic"} />)}
          </div>
      </div>
    )
  }

}

export default Footer