import React from 'react'
import TextField from '../TextField'
import Logo from "../../assets/images/addIcon.png"

const AddComment = ({onClick}) => {
  return (
    <div onClick={onClick} className='flex cursor-pointer transition ease-in-out duration-300 hover:brightness-90 basis-[25%] justify-center bg-white rounded-2xl h-max p-3'>
      <img src={Logo} className="w-20 h-20"/> 
    </div>
  )
}

export default AddComment
