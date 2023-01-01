import React, {useState} from 'react'
import Background from "./assets/images/bluegrad.jpg"
import ElonTweet from "./assets/images/tweet.png"
import TopgTweet from "./assets/images/gtweet.png"
import Logo from "./assets/images/valal.png"
import Exit from "./assets/images/arrow.png"
import {Link} from "react-router-dom"
import GithubLogo from "./assets/images/github.png"
import FacebookLogo from "./assets/images/facebook.png"
import GoogleLogo from "./assets/images/google.png"
import BillTweet from "./assets/images/bill.png"
import Eye from "./assets/images/eye.png"

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = email => {
    const validExp =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    return validExp.test(email);
  }

  const isPasswordValid = password => {
    const validExp =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ ;
    return validExp.test(password);
  }


  const handleClick = () => {
    if (isEmailValid(email))
    {
      console.log("valid email")
    }
    else {
      console.log("invalid email")
    }

    if (isPasswordValid(password))
    {
      console.log("valid password")
    }
    else {
      console.log("invalid password")
    }
  }

  return (
    <div className='flex justify-start min-h-screen'>
      <div className='flex basis-full lg:basis-1/2 bg-gray-100 flex-col'>

          <div className='w-full basis-[10%] bg-gray-800 justify-between px-6 flex items-center'>
            <p className='text-2xl md:text-3xl uppercase text-gray-200'>Sign Up</p>
            <Link to="/"><img src={Exit} className="transition p-4 ease-in-out duration-300 cursor-pointer hover:-translate-x-8" /></Link>
          </div>

          <div className='flex-col gap-10 px-4 sm:px-28   lg:px-16 text-gray-800'>
            <div className='flex justify-center w-full'><img src={Logo}  className="w-60 h-40"/></div>
            
            <div className='flex flex-col gap-7'>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-semibold '>Email</p>
                <input onChange={event => setEmail(event.target.value)} placeholder='example@domain.com' type="email" className='placeholder:italic hover:shadow-xl py-1 px-3 min-w-full outline-none border-b border-gray-300 rounded' />
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-xl font-semibold '>Password</p>
                <div className='flex flex-row'>
                  <input onChange={event => setPassword(event.target.value)} placeholder='Password123' type="password" className='placeholder:italic hover:shadow-xl py-1 px-3 min-w-full outline-none border-b border-gray-300 rounded' />
                  <img src={Eye} className="w-8 h-8 absolute"/>
                </div>
              </div>
            </div>
            
            <div className='w-full flex mt-12 justify-center'><button onClick={handleClick} className='bg-gray-800 w-full md:w-1/2 hover:shadow-xl uppercase font-semibold texl-xl rounded text-gray-200 p-3'>Sign Up</button></div>

            <div className='w-full px-3 border-b-2 mt-16 border-gray-500'></div>

            <div className='w-full flex justify-center flex-row gap-8 mt-16'>
              <img src={GoogleLogo} alt=""  className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2'/>
              <img src={FacebookLogo} alt="" className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2' />
              <img src={GithubLogo} alt="" className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2'/>
            </div>

          <Link to="/sign-in"><p className='text-2xl text-center mt-16'>Already a member? <span className='text-gray-800 font-bold'>Sign In</span></p></Link>
          </div>

      </div>
      <div className="lg:flex hidden items-center flex-col p-8 justify-between basis-[50%] text-3xl text-white bg-cover" style={{backgroundImage: `url(${Background})`}}>
        <img src={BillTweet} className="h-[30%]"/>
        <img src={ElonTweet} className="h-[30%]"/>
        <img src={TopgTweet} className="h-[30%]"/>
      </div>
    </div>
  )
}

export default SignUp