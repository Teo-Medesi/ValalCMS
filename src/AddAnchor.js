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
    if (element != null) {

      let seen = [];

      // encoding element to JSON
      const elementJSON = JSON.stringify(element, (key, val) => {  
        
        // removing cyclic object values
        if (val != null && typeof val == "object") {
          
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        
        // when stringifying react components, 2 values get lost in translation, "$$typeof" symbol and "type" function
        // preventing $$typeof from being removed
        if (typeof val === "symbol") {
          return `$$Symbol:${Symbol.keyFor(val)}`
        }
        else {
          // for some reason JSON throws an error if the value is "div"
          if (val !== "div") {
            return val;
          };
        }

      })

      // parsing the JSON object, while converting our symbol back to being a symbol and not a string
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