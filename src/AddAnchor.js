import React, {useContext} from 'react'
import { useDrop } from 'react-dnd';
import { ProjectContext } from './Project';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase.config';


const AddAnchor = ({ anchorsPath }) => {
  const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext);
  

  const addAnchor = async (element) => {
    const collectionRef = collection(db, anchorsPath);
    console.log(element)
    await addDoc(collection(db, "users/uvtNPr5W2GSGmRzvujKtllVJdrj1/projects/Blank/pages/home/anchors/"), {element: {element: element}});
  }

  
  const [{ isOver }, dropRef] = useDrop({
    accept: "section",
    drop: (item) => { addAnchor(item) },
    collect: (monitor) => ({ isOver: monitor.isOver() })
  })


  return (
    <div ref={dropRef} className={'w-full flex justify-center items-center hover:brightness-75  p-6 text-2xl text-black-700 min-h-[150px] bg-black-100 ' + (isAnchorActive ? " " : "hidden ") + (isOver ? "brightness-75" : "")}>
      <div className='flex items-center justify-center w-full h-full'>
        <p>Drag and drop an element.</p>
      </div>
    </div>
  )
}

export default AddAnchor