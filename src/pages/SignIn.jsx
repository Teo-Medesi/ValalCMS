import React, {useState, useEffect, useContext} from 'react'
import ElonTweet from "../assets/images/tweet.png"
import TopgTweet from "../assets/images/gtweet.png"
import Logo from "../assets/images/Valal1.png"
import {useNavigate} from "react-router-dom"
import GithubLogo from "../assets/images/github.png"
import FacebookLogo from "../assets/images/facebook.png"
import GoogleLogo from "../assets/images/google.png"
import BillTweet from "../assets/images/bill.png"
import { auth, provider } from '../firebase.config'
import { UserContext } from '../App'
import Error from "../assets/images/error.png"
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

const SignIn = () => {

  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  const [isSwitch, setIsSwitch] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) navigate("/dashboard")
  }, [user])

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then(userCredential => {
      // signed in 
      setUser(userCredential.user);
      navigate("/dashboard");
    }).catch(error => {
      console.log(error);
    })
  }

  const handleClick = () => {
    signInWithEmailAndPassword(auth, email, password).then(userCredential => {
      // user signed in
      // passing user to state and navigating to user dashboard
      setUser(userCredential.user);
      navigate("/dashboard");
    }).catch(error => {
      console.error(error);
      setErrorMessage("Invalid email or password, please check for typos.")
    })
  }

  const handleKeyDown = event => {
    if (event.key === "Enter")
    {
      handleClick();
    }
  }

  return (
    <div onKeyDown={handleKeyDown} className='flex justify-start min-h-screen'>
      <div className={isSwitch ? "animate-switchRight translate-x-full lg:flex h-screen items-center flex-col p-8 justify-between basis-[50%] text-3xl text-white bg-gradient-to-tr from-secondary to-primary" : "lg:flex h-screen hidden items-center flex-col p-8 justify-between basis-[50%] text-3xl text-white bg-gradient-to-tr from-secondary to-primary"}>
        <img src={BillTweet} className="h-[30%]"/>
        <img src={ElonTweet} className="h-[30%]"/>
        <img src={TopgTweet} className="h-[30%]"/>
      </div>
      <div onAnimationEnd={() => navigate("/signUp")} className={isSwitch ? 'animate-switchLeft -translate-x-full flex basis-full justify-center lg:basis-1/2 bg-background flex-col' : 'flex justify-center basis-full lg:basis-1/2 bg-background flex-col'}>
          <div className='flex-col gap-10 px-4 sm:px-28   lg:px-16 text-gray-800'>
            <div className='flex justify-center w-full'><img src={Logo}  className="scale-75"/></div>
            
            <div className='flex flex-col gap-7'>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-semibold '>Email</p>
                <input onChange={event => setEmail(event.target.value)} placeholder='example@domain.com' type="email" className='placeholder:italic hover:shadow-md py-1 px-3 min-w-full outline-none border-b border-gray-300 rounded' />
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-xl font-semibold '>Password</p>

                <div className='flex flex-row'>
                  <input onChange={event => setPassword(event.target.value)} placeholder='Password123' type="password" className='placeholder:italic hover:shadow-md py-1 px-3 min-w-full outline-none border-b border-gray-300 rounded' />
                  {/* <img src={Eye} className="w-8 h-8 absolute"/> */}
                </div>

                <div className="flex flex-row justify-start items-center w-full">
                  <img src={Error} className={(errorMessage !== "") ? "w-5 h-5" : "w-5 h-5 hidden"} />
                  <p className='text-error px-2 font-semibold'>{(errorMessage !== "") ? errorMessage : ""}</p>
                </div>

              </div>
            </div>
            
            <div className='w-full flex mt-12 justify-center'><button onClick={handleClick} className='bg-primary w-full md:w-1/2 hover:shadow-xl uppercase font-semibold texl-xl rounded text-background p-3'>Sign in</button></div>

            <div className='w-full px-3 border-b-2 mt-16 border-black-600'></div>

            <div className='w-full flex justify-center flex-row gap-8 mt-16'>
              <img onClick={handleGoogleSignIn} src={GoogleLogo} alt=""  className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2'/>
              <img src={FacebookLogo} alt="" className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2' />
              <img src={GithubLogo} alt="" className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2'/>
            </div>

          <button className='w-full text-center' onClick={() => setIsSwitch(true)}><p className='text-2xl mt-16'>Haven't created an account yet?<span className='text-primary font-bold'> Sign Up</span></p></button>
          </div>

      </div>
    </div>
  )
}

export default SignIn