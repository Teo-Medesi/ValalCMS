import React, {useContext, useEffect} from 'react'
import { HomeContext } from '../../../features/project/Project'
import TextBox from '../../../features/editing/TextBox'

const Navbar1 = ({anchorData}) => {
  const [home, fetchHome] = useContext(HomeContext)

  return (
    <>
        <nav className={'min-h-[10vh] h-full p-6 bg-transparent w-full items-center  flex flex-row justify-between ' + (home.textBlack ? "text-[#000000]" : "text-[#ffffff]")}>
            <TextBox anchorData={anchorData} index={0} properties={anchorData.properties.textBoxes[0]}>Template</TextBox>        
            <div>
              <ul className='flex text-base flex-row gap-4'>
                <TextBox anchorData={anchorData} index={1} properties={anchorData.properties.textBoxes[1]}>About me</TextBox>
                <TextBox anchorData={anchorData} index={2} properties={anchorData.properties.textBoxes[2]}>Services</TextBox>
                <TextBox anchorData={anchorData} index={3} properties={anchorData.properties.textBoxes[3]}>Projects</TextBox>
                <TextBox anchorData={anchorData} index={4} properties={anchorData.properties.textBoxes[4]}>Blogs</TextBox>
                <TextBox anchorData={anchorData} index={5} properties={anchorData.properties.textBoxes[5]}>Gallery</TextBox>
              </ul>
            </div>
            <TextBox anchorData={anchorData} index={6} properties={anchorData.properties.textBoxes[6]} className='p-3 bg-black-900 rounded-3xl text-white'>Contact us</TextBox>
        </nav>
    </>

  )
}

export default Navbar1