import React from 'react'
import Image from  "./images/uploadImage.png"
import TextField from '../TextField.js'

const defaultText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "

const ArticleCard = () => {

  return (
    <div className="article w-96 bg-white border-2 border-gray-200 rounded-xl">
        <a href="#"><img src={Image} className="p-10 transition duration-300 ease-in-out hover:brightness-50"  alt="" /></a>
        <div className="flex flex-col px-5 py-5">
            <a href="#">
                <h3 className="text-sm text-gray-500">28. LISTOPADA 2022</h3>
                <TextField wordLimit={100} defaultStyle={"text-2xl bold mt-2"} editStyle={"text-2xl bold outline-none italic mt-2"}/>
            </a>

            <TextField isParagraph={true} wordLimit={1000} placeHolderText={defaultText} defaultStyle={"my-5 text-start"} buttonStyle={""} editStyle={"my-5 outline-none italic w-80"}/><br />
            <a href="#" className="transition-all ease-in-out delay-150 text-gray-500 decoration-slice cursor-pointer hover:text-xl hover:text-blue-900 duration-400">Čitaj dalje ...</a>
        </div>
    </div>
  )

}

export default ArticleCard