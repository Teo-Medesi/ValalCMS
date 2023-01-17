import React from 'react'

const Text1Preview = ({className}) => {
  return (
        <section className={"flex text-black-700 px-8 flex-col justify-center gap-1 cursor-pointer text-[6px] text-center py-4 rounded w-full bg-black-900 " + className}>
            <h1 className='text-base font-semibold text-black-600 tracking-tighter'>Write your title here.</h1>
            <p className='font-extralight'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </section>
  )
}

export default Text1Preview