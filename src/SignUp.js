import React, {useState, useEffect, useContext} from 'react'
import Background from "./assets/images/bluegrad.jpg"
import ElonTweet from "./assets/images/tweet.png"
import TopgTweet from "./assets/images/gtweet.png"
import Logo from "./assets/images/Valal1.png"
import {useNavigate} from "react-router-dom"
import GithubLogo from "./assets/images/github.png"
import FacebookLogo from "./assets/images/facebook.png"
import GoogleLogo from "./assets/images/google.png"
import BillTweet from "./assets/images/bill.png"
import Eye from "./assets/images/eye.png"
import Error from "./assets/images/error.png"
import { auth, db, provider } from './firebase.config'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { UserContext } from './App'
import { addDoc, doc, setDoc, collection } from 'firebase/firestore'

const SignUp = () => {

  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSwitch, setIsSwitch] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const isEmailValid = email => {
    const validExp =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    return validExp.test(email);
  }

  const isPasswordValid = password => {
    const validExp =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ ;
    return validExp.test(password);
  }

  useEffect(() => {
    if (user) navigate("/dashboard")
  }, [])

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then(userCredential => {
      // signed in 
      setUser(userCredential.user);
      setDoc(doc(db, `users/${userCredential.user.uid}`), {email: userCredential.user.email, displayName: userCredential.user.displayName}).then(() => {
        setDoc(doc(db, `users/${userCredential.user.uid}/Projects/Project1`), {project_id: 1, project_name: "untitled_project"}).then(async () => {
          // creating user collections in firestore
          await setDoc(doc(db, `users/${userCredential.user.uid}/Projects/Project1/footer/text`), {text: "Click to add text"});
          await addDoc(collection(db, `users/${userCredential.user.uid}/Projects/Project1/navbar/navLinks/navLinks`), {text: "Home", link: "#", key: 1});
          await setDoc(doc(db, `users/${userCredential.user.uid}/Projects/Project1/navbar/title`), {text: "Title"});
          // we do not need to create storage folders here because we can't create empty folders or empty collections
          // once the user wishes to upload a file to storage, the directories for that file will be created as we reference them in our path
  
          navigate("/dashboard");
         })
      })

    }).catch(error => {
      console.log(error);
    })
  }

  const handleClick = () => {
    // create new user when sign up button clicked
    if (isEmailValid(email) && isPasswordValid(password)) {
      createUserWithEmailAndPassword(auth, email, password).then(async userCredential => {
         // signed in 
         setUser(userCredential.user);
         setDoc(doc(db, `users/${userCredential.user.uid}`), {email: userCredential.user.email, displayName: userCredential.user.displayName}).then(() => {
           setDoc(doc(db, `users/${userCredential.user.uid}/Projects/Project1`), {project_id: 1, project_name: "untitled_project"}).then(async () => {
             // creating user collections in firestore
             await setDoc(doc(db, `users/${userCredential.user.uid}/Projects/Project1/footer/text`), {text: "Click to add text"});
             await addDoc(collection(db, `users/${userCredential.user.uid}/Projects/Project1/navbar/navLinks/navLinks`), {text: "Home", link: "#", key: 1});
             await setDoc(doc(db, `users/${userCredential.user.uid}/Projects/Project1/navbar/title`), {text: "Title"});
             // we do not need to create storage folders here because we can't create empty folders or empty collections
             // once the user wishes to upload a file to storage, the directories for that file will be created as we reference them in our path
     
             navigate("/dashboard");
            })
         })
   
       }).catch(error => {
         console.log(error);
       })
      }
    }
  
  const handleEmailInput = event => {
    // if the user corrected their mistake we want to reset the error message
    isEmailValid(event.target.value) ? setEmailErrorMessage("") : setEmailErrorMessage("Invalid Email!");
    setEmail(event.target.value);
  }

  const handlePasswordInput = event => {
    // if the user corrected their mistake we want to reset the error message
    isPasswordValid(event.target.value) ? setPasswordErrorMessage("") : setPasswordErrorMessage("Password must contain atleast 8 characters, one capital letter, one number and one special character!")
    setPassword(event.target.value);
  }


  return (
    <div className='flex justify-start min-h-screen'>
      <div onAnimationEnd={() => navigate("/signIn")} className={isSwitch ? 'animate-switchRight translate-x-full justify-center flex basis-full lg:basis-1/2 bg-background flex-col' : 'flex justify-center basis-full lg:basis-1/2 bg-background flex-col'}>
          <div className=' flex-col gap-10 px-4 sm:px-28 lg:px-16 text-gray-800'>
            <div className='flex justify-center w-full'><img src={Logo}  className="scale-75"/></div>
            
            <div className='flex flex-col gap-7'>
              <div className='flex flex-col gap-2'>

                <p className='text-xl font-semibold '>Email</p>
                <input onChange={handleEmailInput} placeholder='example@domain.com' type="email" className='placeholder:italic hover:shadow-md py-1 px-3 min-w-full outline-none border-b border-gray-300 rounded' />

                <div className="flex flex-row justify-start items-center w-full">
                  <img src={Error} className={(emailErrorMessage !== "") ? "w-5 h-5" : "w-5 h-5 hidden"} />
                  <p className='text-error px-2 font-semibold'>{(emailErrorMessage !== "") ? emailErrorMessage : ""}</p>
                </div>
                
              </div>

              <div className='flex flex-col gap-2'>
                
                <p className='text-xl font-semibold '>Password</p>

                  <div className='flex flex-row'>                 
                    <input onChange={handlePasswordInput} placeholder='Password123' type="password" className='placeholder:italic hover:shadow-md py-1 px-3 min-w-full outline-none border-b border-gray-300 rounded' />
                    {/* <img src={Eye} className="w-8 h-8 absolute"/> */}  
                  </div>

                  <div className="flex flex-row justify-start items-center w-full">
                    <img src={Error} className={(passwordErrorMessage !== "") ? "w-5 h-5" : "w-5 h-5 hidden"} />
                    <p className='text-error px-2 font-semibold'>{(passwordErrorMessage !== "") ? passwordErrorMessage : ""}</p>
                  </div>
                  
              </div>

            </div>
            
            <div className='w-full flex mt-12 justify-center'><button onClick={handleClick} className='bg-primary w-full md:w-1/2 hover:shadow-xl uppercase font-semibold texl-xl rounded text-background p-3'>Sign Up</button></div>

            <div className='w-full px-3 border-b-2 mt-16 border-black-600'></div>

            <div className='w-full flex justify-center flex-row gap-8 mt-16'>
              <img onClick={handleGoogleSignIn}  src={GoogleLogo} alt=""  className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2'/>
              <img src={FacebookLogo} alt="" className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2' />
              <img src={GithubLogo} alt="" className='transition ease-in-out duration-200 cursor-pointer hover:translate-x-2'/>
            </div>

          <button className='w-full text-center' onClick={() => setIsSwitch(true)}><p className='text-2xl mt-16'>Already a member? <span className='text-primary font-bold'>Sign In</span></p></button>
          </div>

      </div>
      <div className={isSwitch ? "animate-switchLeft -translate-x-full lg:flex h-screen items-center flex-col p-8 justify-between basis-[50%] text-3xl text-white bg-gradient-to-tr from-secondary to-primary" : "lg:flex h-screen hidden items-center flex-col p-8 justify-between basis-[50%] text-3xl text-white bg-gradient-to-tr from-secondary to-primary"}>
        <img src={BillTweet} className="h-[30%]"/>
        <img src={ElonTweet} className="h-[30%]"/>
        <img src={TopgTweet} className="h-[30%]"/>
      </div>
    </div>
  )
}

export default SignUp