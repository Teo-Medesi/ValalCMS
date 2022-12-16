import React, { useEffect, useState } from 'react'
import TextField from '../TextField'
import Logo from "./images/logo.png"
import {db} from "../../firebase.config"
import {doc, addDoc, collection, deleteDoc, getDocs, updateDoc} from "firebase/firestore"

const Footer = () => {
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
  }, [])
  

  return (
    <div className='flex px-16 justify-center items-center bg-gray-800 h-20'>
        <div className='basis-[40%]'>
          <img src={Logo} className="w-12 h-12" />
        </div>
        
        <div className='basis-[60%] justify-start '>
          {text.map(item => <TextField collection={"footerText"} placeHolderText={item.text} id={item.id} updateText={updateText} defaultStyle={"text-xl text-white rounded-md hover:bg-gray-900 p-3"} editStyle={"text-xl outline-none text-white bg-gray-800 italic"} />)}
        </div>
    </div>
  )
}

export default Footer