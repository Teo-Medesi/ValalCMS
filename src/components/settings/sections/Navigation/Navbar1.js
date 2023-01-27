import React, {useContext} from 'react'
import { useEffect } from 'react'
import Anchor from '../../../../Anchor'
import { HomeContext } from '../../../../Project'
import TextBox from '../../../TextBox'

const Navbar1 = () => {
  const [home, fetchHome] = useContext(HomeContext)

  return (
    <>
        <nav className={'h-[10vh] bg-transparent w-full items-center p-6 flex flex-row justify-between ' + (home.textBlack ? "text-[#000000]" : "text-[#ffffff]")}>
            <TextBox>Template</TextBox>        
            <div>
              <ul className='flex text-base flex-row gap-4'>
                <TextBox>About me</TextBox>
                <TextBox>Services</TextBox>
                <TextBox>Projects</TextBox>
                <TextBox>Blogs</TextBox>
                <TextBox>Gallery</TextBox>
              </ul>
            </div>
            <TextBox className={'p-3 bg-black-900 rounded-3xl text-white'}>Contact us</TextBox>
        </nav>
    </>

  )
}

export default Navbar1