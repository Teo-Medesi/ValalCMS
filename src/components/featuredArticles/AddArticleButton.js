import React from 'react'
import Logo from "../../assets/images/addIcon.png"
import PropTypes from "prop-types"

const AddArticleButton = ({onClick, isActive}) => {
  return (
    <button onClick={onClick} className={isActive ? "transition ease-in-out duration-300 flex justify-center items-center w-96 h-[39rem] border-2 bg-gray-100 hover:brightness-75 border-gray-400 rounded-xl" : "transition ease-in-out duration-300 flex justify-center items-center w-96 h-[39rem] border-2 bg-gray-100 hover:brightness-75 border-gray-400 rounded-xl hidden"}>
        <img src={Logo} className=""/>
    </button>
  )

}

AddArticleButton.propTypes = {
  onClick: PropTypes.func
}

export default AddArticleButton