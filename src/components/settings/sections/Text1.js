import React from 'react'
import Anchor from '../../../Anchor'

const Text1 = () => {
  return (
    <>
      <section className="flex text-black-700 px-24 flex-col justify-center gap-3 text-sm text-center py-16  w-full bg-black-900">
          <h1 className='text-4xl font-semibold text-black-600 tracking-tighter'>Write your title here.</h1>
          <p className='font-extralight'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </section>
      <Anchor/>
    </>
  )
}

export default Text1