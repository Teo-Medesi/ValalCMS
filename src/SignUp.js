import React from 'react'
import Background from "./assets/images/bluegrad.jpg"
import ElonTweet from "./assets/images/tweet.png"
import TopgTweet from "./assets/images/gtweet.png"
import Logo from "./assets/images/valal.png"
import Exit from "./assets/images/arrow.png"
import {Link} from "react-router-dom"
import GithubLogo from "./assets/images/github.png"
import FacebookLogo from "./assets/images/facebook.png"
import GoogleLogo from "./assets/images/google.png"


const SignUp = () => {
  return (
    <div className='flex justify-start min-h-screen'>
      <div className='flex basis-[40%] bg-gray-100 flex-col'>
          <div className='w-full basis-[10%] bg-gray-800 justify-between px-6 flex items-center'>
            <p className='text-3xl uppercase text-gray-200'>Create account</p>
            <Link to="/"><img src={Exit} className="transition ease-in-out duration-300 cursor-pointer hover:-translate-x-8" /></Link>
          </div>
          <div className='flex-col basis[90%] gap-10 px-16 text-gray-800'>
            <div className='flex justify-center w-full'><img src={Logo}  className="w-60 h-40"/></div>
            
            <div className='flex flex-col gap-7'>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-semibold '>Email</p>
                <input placeholder='example@domain.com' type="text" className='placeholder:italic hover:shadow-xl py-1 px-3 min-w-full outline-none border-b border-gray-400' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-semibold '>Password</p>
                <input placeholder='example@domain.com' type="text" className='placeholder:italic hover:shadow-xl py-1 px-3 min-w-full outline-none border-b border-gray-400 rounded-md' />
              </div>
            </div>
            
            <div className='w-full flex mt-12 justify-center'><button className='bg-gray-800 w-[50%] hover:shadow-xl uppercase font-semibold texl-xl rounded text-gray-200 p-3'>Sign Up</button></div>

          <div className='w-full px-3 border-b-2 mt-8 border-gray-500'></div>

          <div className='w-full flex justify-center flex-row gap-8 mt-12'>
            <img src={GoogleLogo} alt=""  className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2'/>
            <img src={FacebookLogo} alt="" className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2' />
            <img src={GithubLogo} alt="" className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2'/>
          </div>

          </div>

      </div>
      <div className="flex items-center flex-col gap-12 p-16 basis-[60%] text-3xl text-white bg-cover" style={{backgroundImage: `url(${Background})`}}>
        <img src={ElonTweet} className="w-[70%]" />
        <img src={TopgTweet} className="w-[70%]" />
      </div>
    </div>
  )
}

export default SignUp