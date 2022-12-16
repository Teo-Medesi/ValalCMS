import React, { useEffect } from 'react'
import Logo from "./images/addIcon.png"
import PropTypes from "prop-types"

const NavLinkBtn = ({addFunction, isActive, checkIfActive}) => {

  // run on every render
  useEffect(() => {
    checkIfActive();
  })

  return (
    <button onClick={addFunction}className={isActive ? 'flex justify-center md:ml-3 hover:bg-gray-700 md:hover:bg-gray-800 py-3 md:py-4 px-4 w-full' : 'ml-3 hover:bg-gray-800 py-3 px-4 hidden'}>
      <img className="w-11 h-11" src={Logo}></img>
    </button>
  )
}

NavLinkBtn.propTypes = {
  addFunction: PropTypes.func,
  isActive: PropTypes.bool,
  checkIfActive: PropTypes.func
} 

export default NavLinkBtn