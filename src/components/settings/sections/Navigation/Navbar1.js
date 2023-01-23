import React from 'react'
import Anchor from '../../../../Anchor'
import TextBox from '../../../TextBox'

const Navbar1 = () => {

  return (
    <>
        <nav className='basis-[5%] text-white items-center p-6 flex flex-row justify-between'>
            <TextBox>Template</TextBox>        
            <div>
              <ul className='flex text-base text-gray-300 flex-row gap-4'>
                <TextBox>About me</TextBox>
                <TextBox>Services</TextBox>
                <TextBox>Projects</TextBox>
                <TextBox>Blogs</TextBox>
                <TextBox>Gallery</TextBox>
              </ul>
            </div>
            <TextBox className='p-3 bg-black-900 rounded-3xl'>Contact us</TextBox>
        </nav>
    </>

  )
}

export default Navbar1