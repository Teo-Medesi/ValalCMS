import React from 'react'
import TextField from '../TextField'

const defaultText = "This is a text box. Click to write your comment."

const Comment = () => {
  return (
    <div className='flex basis-[25%] bg-white rounded-2xl h-max'>
        <div className='flex flex-col p-5'>
            <TextField placeHolderText={"Comment Title"} defaultStyle={"text-start text-xl font-bold text-gray-800"} editStyle={"text-start text-xl font-bold text-gray-800 outline-none max-w-max"}/>           
            <TextField placeHolderText={defaultText} isParagraph={true} defaultStyle={"text-start mt-3"} editStyle={"w-[350px] text-start italic outline-none border-none"}/>
        </div>
    </div>
  )
}

export default Comment
