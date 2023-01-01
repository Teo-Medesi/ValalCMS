import React from 'react'

const Loading = () => {




  return (
    <div className='flex flex-col gap-8 justify-center items-center min-h-screen'>
        <div className='w-44 h-44 border-[20px] border-t-gray-800 rounded-[50%] animate-spin border-gray-300'></div>
        <p className='text-3xl text-gray-500'>Authenticating...</p>
    </div>
  )
}

export default Loading