import React, { useContext, useState } from 'react'
import { serialize, deserialize } from 'react-serialize/lib';
import { useDrop } from 'react-dnd';
import { ProjectContext } from './Project';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase.config';


const AddAnchor = ({ anchorsPath }) => {
  const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext);
  const [newElement, setNewElement] = useState([]);

  const addAnchor = async (element) => {
    console.log(`element before being stringified:`)
    console.log(element)

    if (element != null) {
      // const elementJSON = JSON.stringify(elementToAdd); 
      let seen = [];
      const elementJSON = JSON.stringify(element, (key, val) => {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        if (typeof val === "symbol") {
          return `$$Symbol:${Symbol.keyFor(val)}`
        }
        else {
          if (val !== "div") {
            return val;
          };
        }

      })
      /*       console.log(element.type)
            console.log(element.props)
            console.log(element._owner.child)
       */
      console.log(`element json:`);
      console.log(elementJSON);
      console.log(typeof element.type)

      // const elementParsed = JSON.parse(elementJSON);
      const elementParsed = JSON.parse(elementJSON, (key, val) => {
        const matches = val && val.match && String(val).match(/^\$\$Symbol:(.*)$/);

        if (matches) {
          return Symbol.for(matches[1])
        }
        else {
          return val;
        }

      });


      setNewElement(React.createElement(element.type, elementParsed.props, elementParsed._owner.child));
      console.log(elementParsed)
      console.log(elementParsed.type)
      console.log(elementParsed.type)
      console.log(elementParsed.type)

      console.log(`elementJSON after being parsed:`);
      console.log(elementParsed);
    }

    // const collectionRef = collection(db, anchorsPath);
    // await addDoc(collection(db, "users/uvtNPr5W2GSGmRzvujKtllVJdrj1/projects/Blank/pages/home/anchors/"), {element: {element: element}});
  }



  const [{ isOver }, dropRef] = useDrop({
    accept: "section",
    drop: (item) => { addAnchor(item) },
    collect: (monitor) => ({ isOver: monitor.isOver() })
  })


  if (newElement == null || newElement.length === 0) {
    return (
      <div ref={dropRef} className={'w-full flex justify-center items-center hover:brightness-75  p-6 text-2xl text-black-700 min-h-[150px] bg-black-100 ' + (isAnchorActive ? " " : "hidden ") + (isOver ? "brightness-75" : "")}>
        <div className='flex items-center justify-center w-full h-full'>
          <p>Drag and drop an element.</p>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        {newElement}
      </div>
    )
  }
}

export default AddAnchor