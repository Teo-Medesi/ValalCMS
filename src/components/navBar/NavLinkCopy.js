import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'

const NavLink = ({onDelete, id}) => {

  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState("template");
  const [link, setLink] = useState("#");

  const changeEditMode = () => {
    setIsEditMode(current => !current);
  }

  // change text value
  const handleChange = event => {
    setText(event.target.value);
  }

  const handleKeyPress = event => {
    if (event.key === "Enter")
    {
      // delete if empty
      if (event.target.value === "")
      {
        onDelete(id);
      }
      setIsEditMode(false);
    }
  }



  if (isEditMode === true) 
  {
    return (
      <button onKeyDown={handleKeyPress} className='p-2 text-xl bg-gray-800 rounded-md md:m-3'>
        <input autoFocus value={text} onChange={handleChange} name="navInput" id="navInput" className="p-1 bg-gray-800 text-gray-300 rounded-md w-24 text-center italic outline-none" type="text"/>
      </button>
    )
    
  }
  else {
    return (
      <button onClick={changeEditMode} className='p-3 text-xl hover:text-white  hover:bg-gray-800 text-gray-300 rounded-md md:m-3'>
        <a href={link}><li>{text}</li></a>
      </button>
    )
  }
}

NavLink.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default NavLink