import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useEffect } from 'react'

const TextField = ({onDelete, id, defaultStyle, buttonStyle, editStyle, placeHolderText, wordLimit, isParagraph, updateText, collection}) => {

  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState("Click to add text");
  const [isWordLimitReached, setIsWordLimitReached] = useState(false);

  const changeEditMode = () => {
    setIsEditMode(current => !current);
  }

  // repeat only once on first render
  useEffect(() => {
    if(placeHolderText !== "")
    {
      setText(placeHolderText);
    }
  },[])

  useEffect(() => {
    if(wordLimit !== 0 && text.length >= wordLimit)
    {
      setIsWordLimitReached(true);
      console.log(text.length);
    }
  }, [text])
  

  // change text value
  const handleChange = event => {
    if (isWordLimitReached === false)
    {
      setText(event.target.value);
    }
  }

  const handleKeyPress = event => {
    if (event.key === "Enter")
    {
      // delete if empty
      if (onDelete !== null && event.target.value === "")
      {
        onDelete(id);
      }
      else if (event.target.value === "")
      {
        setText("Click me");
      }
      else {
        updateText(id, text, collection)
        console.log(id);
      }


      setIsEditMode(false);
    }
    else if (event.key === "Backspace")
    {
      setIsWordLimitReached(false);
    }
  }

  let showWordLimit = wordLimit === 0 ? false : true;
  let remainingWords = wordLimit - text.length;

  if (isEditMode === true) 
  {
    if (isParagraph === true)
    {
      return (
        <button onKeyDown={handleKeyPress} className={buttonStyle}>
          <textarea autoFocus value={text} onChange={handleChange} name="navInput" id="navInput" className={editStyle} type="text"/>
          {showWordLimit ? <p className='text-center'>{remainingWords}</p> : showWordLimit}
        </button>
      )
    }
    else 
    {
      return (
        <button onKeyDown={handleKeyPress} className={buttonStyle}>
          <input autoFocus value={text} onChange={handleChange} name="navInput" id="navInput" className={editStyle} type="text"/>
          {showWordLimit ? <p className='text-center'>{remainingWords}</p> : showWordLimit}
        </button>
      )
      
    }
    
  }
  else {
    return (
      <button onClick={changeEditMode} className={defaultStyle}>{text}</button>
    )
  }
}

TextField.propTypes = {
  onDelete: PropTypes.func,
  id: PropTypes.number,
  defaultStyle: PropTypes.string,
  buttonStyle: PropTypes.string,
  editStyle: PropTypes.string,
  placeHolderText: PropTypes.string,
  wordLimit: PropTypes.number
}

TextField.defaultProps = {
    defaultStyle: "text-xl",
    buttonStyle: 'bg-gray-700',
    editStyle: "p-1 text-xl italic outline-none",
    placeHolderText: "",
    wordLimit: 0,
    onDelete: null,
    isParagraph: false
}

export default TextField