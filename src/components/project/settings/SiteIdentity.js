import React from 'react'
import Logo from "../../../assets/images/siteIdentity.png"

const SiteIdentity = () => {
  return (
    <div className="">
      <div className='flex bg-gray-800 justify-between items-center p-3 text-white text-xl border-y-2 border-gray-900 font-semibold uppercase'>
        <p>Site Identity</p>
        <img src={Logo} className="w-10 h-10"/>
      </div>

      <div className='flex flex-col gap-2 p-3 text-gray-800'>
          <p className='text-xl font-semibold '>Site Title</p>
          <input type="text" className='py-1 px-3 min-w-full outline-none border border-gray-400 rounded-md' />
      </div>

      <div className='flex flex-col gap-2  text-gray-800 p-3'>
          <p className='text-xl font-semibold'>Tagline</p>
          <input type="text" className='py-1 px-3 min-w-full outline-none border border-gray-400 rounded-md' />
          <p>A website tagline is a short line of text that aims to communicate the site's main focus. It appears alongside the website's title in browser search results.</p>
      </div>

      <div className='flex flex-col gap-2 p-3 text-gray-800'>
          <p className='text-xl font-semibold'>Site Icon</p>
          <button className='p-3 min-w-full flex items-center justify-center hover:bg-white text-gray-700 font-semibold border border-gray-400 rounded-md'>Select Site Icon</button>
          <p>Site icons are the little icons you see in browser tabs and bookmarks.</p>
      </div>
    </div>
  )
}

export default SiteIdentity