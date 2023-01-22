import React, {useEffect, useContext} from 'react'
import { UserContext } from './App'
import { useNavigate } from 'react-router-dom'

const Loading = () => {

  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
      if (user === [] || user === null) navigate("/signUp")
      else navigate ("/dashboard")

  }, [user]);


  return (
    <div className='flex flex-col gap-8 justify-center items-center bg-background min-h-screen'>
        <div className='w-44 h-44 border-[24px] border-t-primary rounded-[50%] animate-spin border-black-500'></div>
        <p className='text-3xl text-gray-500 tracking-wide'>Authenticating...</p>
    </div>
  )
}

export default Loading