import React, { useContext, useState } from 'react'
import { serialize, deserialize } from 'react-serialize/lib';
import { useDrop } from 'react-dnd';
import { ProjectContext } from './Project';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase.config';
import { AnchorContext } from './Home';


const AddAnchor = () => {
  const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext);
  const [anchors, anchorsPath, fetchAnchors] = useContext(AnchorContext);

  const addAnchor = (component) => {
    if (component != null && component.componentName !== "") {
      console.log(component.componentName)
      const collectionRef = collection(db, anchorsPath);
      addDoc(collectionRef, {component: component.componentName}).then(() => fetchAnchors());
    }

  }

  const [{ isOver }, dropRef] = useDrop({
    accept: "section",
    drop: (item) => { addAnchor(item) },
    collect: (monitor) => ({ isOver: monitor.isOver() })
  })


  return (
    <div ref={dropRef} className={'w-full flex justify-center items-center hover:brightness-75  p-6 text-2xl text-black-700 min-h-[150px] bg-black-100 ' + (isAnchorActive ? " " : "hidden ") + (isOver ? "brightness-75" : "")}>
      <div className='flex items-center justify-center w-full h-full'>
        <h1>Drag and drop section</h1>
      </div>
    </div>
  )
}

export default AddAnchor