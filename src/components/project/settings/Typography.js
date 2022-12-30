import React from 'react'
import Logo from "../../../assets/images/typography.png"
import EditLogo from "../../../assets/images/edit.png"

const Typography = () => {
  return (
    <div className="">
      <div className='flex bg-gray-800 justify-between items-center p-3 text-white text-xl border-y-2 border-gray-900 font-semibold uppercase'>
        <p>Typography</p>
        <img src={Logo} className="w-10 h-10"/>
      </div>

      <div className='flex flex-col gap-2 p-3 text-gray-800'>
          <p className='text-xl font-semibold '>Base Font</p>
          <select className='py-1 px-3 min-w-full outline-none border border-gray-400 rounded-md' >
            <option value="Helvetica">Helvetica</option>
            <option value="Times">Times New Roman</option>
            <option value="OpenSans">Open Sans</option>
            <option value="Gotham">Gotham</option>
            <option value="Arial">Arial</option>
            <option value="Bodoni">Bodoni</option>
            <option value="GillSans">Gill Sans</option>
            <option value="FranklinGothic">Franklin Gothic</option>
            <option value="Georgia">Georgia</option>
            <option value="Garamond">Garamond</option>
            <option value="Sabon">Sabon</option>
            <option value="Myriad">Myriad</option>
            <option value="Verdana">Verdana</option>
          </select>
      </div>

      
      <div className='flex flex-col gap-2 p-3 text-gray-800'>
          <p className='text-xl font-semibold '>Headings Font</p>
          <select className='py-1 px-3 min-w-full outline-none border border-gray-400 rounded-md' >
            <option value="Georgia">Georgia</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times">Times New Roman</option>
            <option value="OpenSans">Open Sans</option>
            <option value="Gotham">Gotham</option>
            <option value="Arial">Arial</option>
            <option value="Bodoni">Bodoni</option>
            <option value="GillSans">Gill Sans</option>
            <option value="FranklinGothic">Franklin Gothic</option>
            <option value="Garamond">Garamond</option>
            <option value="Sabon">Sabon</option>
            <option value="Myriad">Myriad</option>
            <option value="Verdana">Verdana</option>
          </select>
      </div>

      <div className='flex bg-gray-800 justify-between items-center p-3 text-white text-xl border-y-2 border-gray-900 font-semibold uppercase'>
        <p>Editing</p>
        <img src={EditLogo} className="w-9 h-9"/>
      </div>

      <div className='flex flex-col gap-2 p-3 text-gray-800'>
          <p className='text-xl font-semibold '>Font</p>
          <select className='py-1 px-3 min-w-full outline-none border border-gray-400 rounded-md' >
            <option value="Helvetica">Helvetica</option>
            <option value="Georgia">Georgia</option>
            <option value="Times">Times New Roman</option>
            <option value="OpenSans">Open Sans</option>
            <option value="Gotham">Gotham</option>
            <option value="Arial">Arial</option>
            <option value="Bodoni">Bodoni</option>
            <option value="GillSans">Gill Sans</option>
            <option value="FranklinGothic">Franklin Gothic</option>
            <option value="Garamond">Garamond</option>
            <option value="Sabon">Sabon</option>
            <option value="Myriad">Myriad</option>
            <option value="Verdana">Verdana</option>
          </select>
      </div>

      <div className='flex flex-col gap-2 p-3 text-gray-800'>
          <p className='text-xl font-semibold'>Color</p>
          <select className='py-1 px-3 min-w-full outline-none border border-gray-400 rounded-md' >
            <option value="Default">Default</option>
            <option value="White">White</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
            <option value="Tertiary">Tertiary</option>
            <option value="Quaternary">Quaternary</option>
          </select>
      </div>

      <div className='flex flex-col gap-2 p-3 text-gray-800'>
          <p className='text-xl font-semibold'>Size</p>
          <input type="text" list="fontSizes" className='py-1 px-3 min-w-full outline-none border border-gray-400 rounded-md'/>
          <datalist id="fontSizes">
            {[...Array(73).keys()].map(index => <option value={(index + 4) / 2}>{(index + 4)/ 2}</option>)}
          </datalist>
      </div>

    </div>
  )
}

export default Typography