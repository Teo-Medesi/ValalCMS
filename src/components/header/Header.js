import React, { useState, useEffect } from 'react'
import Logo from "./images/addIcon.png"
import { storage } from '../../firebase.config'
import { getDownloadURL, listAll, ref, uploadBytes, deleteObject } from "firebase/storage"
import UploadModal from '../UploadModal'


const Header = (project) => {

  const InitialState = {
    imageURL: "",
    isUploadModalActive: false
  }

  // first off, we need to fetch the image from our storage, we need an imageURL state
  const [imageURL, setImageURL] = useState(InitialState.imageURL);
  const [isUploadModalActive, setIsUploadModalActive] = useState(InitialState.isUploadModalActive);
  const storagePath = `Projects/Project_${project.project}/images/headerImage/`;

  const fetchImage = () => {
    const imagesRef = ref(storage, storagePath);

    listAll(imagesRef).then(list => {
      list.items.map(itemRef => getDownloadURL(itemRef).then(url => {
        setImageURL(url);
      }));
    })
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
    const imageRef = ref(storage, storagePath + file.name);        
    const imagesRef = ref(storage, storagePath)

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
    if (imageURL === InitialState.imageURL) 
    {
      return (
        <div>
          <UploadModal uploadFunction={uploadImage} setIsActive={setIsUploadModalActive} isHidden={isUploadModalActive ? false : true}/>
          <div onClick={handleUploadClick} className={isUploadModalActive ? 'h-[800px] bg-gray-100 py-8 px-16' : 'h-[800px] bg-gray-100 py-8 px-16 transition ease-in-out duration-300 hover:brightness-50 cursor-pointer'}>
              <div className='flex flex-col justify-center items-center border-2 rounded border-gray-300 w-full h-full'>
                  <img src={Logo} className="w-36 h-36"/>
                  <p className='text-2xl uppercase text-gray-500 tracking-wide mt-4'>Click to upload image</p>
              </div>
    
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <UploadModal uploadFunction={uploadImage} setIsActive={setIsUploadModalActive} isHidden={isUploadModalActive ? false : true}/>  
          <div onClick={handleUploadClick} className={isUploadModalActive ? "bg-no-repeat bg-cover h-[800px] max-h-[800px] w-full" : "bg-no-repeat transition ease-in-out duration-300 hover:brightness-50 cursor-pointer bg-cover h-[800px] max-h-[800px] w-full"} style={{backgroundImage: "url(" + imageURL + ")"}}>
          </div>
        </div>
      )
    }
  }
  else {
    if (imageURL === InitialState.imageURL) 
    {
      return (
        <div>
          <div onClick={handleUploadClick} className={isUploadModalActive ? 'h-[800px] bg-gray-100 py-8 px-16' : 'h-[800px] bg-gray-100 py-8 px-16 transition ease-in-out duration-300 hover:brightness-50 cursor-pointer'}>
              <div className='flex flex-col justify-center items-center border-2 rounded border-gray-300 w-full h-full'>
                  <img src={Logo} className="w-36 h-36"/>
                  <p className='text-2xl uppercase text-gray-500 tracking-wide mt-4'>Click to upload image</p>
              </div>
    
          </div>
        </div>
      )
    }
    else {
      return (
        <div onClick={handleUploadClick} className="bg-no-repeat transition ease-in-out duration-300 hover:brightness-50 cursor-pointer bg-cover h-[800px] max-h-[800px] w-full" style={{backgroundImage: "url(" + imageURL + ")"}}>
          
        </div>
      )
    }
  }
}


export default Header
