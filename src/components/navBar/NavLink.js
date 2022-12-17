import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import TextField from '../TextField.js'

const NavLink = ({onDelete, id, text, link, updateText}) => {
  return (
    <a href={link}>
      <TextField collection={"navLinks"} updateText={updateText} placeHolderText={text} onDelete={onDelete} id={id} defaultStyle={'p-3 text-xl w-max hover:text-white hover:bg-gray-800 text-gray-300 rounded-md md:m-3 w-full'} buttonStyle={'p-2 text-xl bg-gray-800 rounded-md md:m-3 w-full'} editStyle={"p-1 bg-gray-800 text-gray-300 rounded-md w-24 text-center italic outline-none"} />
    </a>
  )
}

NavLink.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  link: PropTypes.string
}

NavLink.defaultProps = {
  text: "Click me",
  link: "#"
}

export default NavLink