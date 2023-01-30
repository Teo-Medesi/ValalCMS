import React, {useContext, useEffect} from 'react'
import { HomeContext } from '../../../features/project/Project'
import TextBox from '../../../features/editing/TextBox'

const Navbar1 = ({anchorData}) => {
  const [home, fetchHome] = useContext(HomeContext)

  useEffect(() => console.log(anchorData.properties), [])

  /* 
    so we have all these textboxes here which we want to connect to our database, the problem is that we don't want all of our functionality
    being handled on each and every component individually

    we can create an object for every textbox including it's properties and save it to the properties object in our anchor document
    
    in order to do this, every component should receive anchorData as a prop so we can get our properties

    we'd need our textboxes array from firebase and update the properties on textbox change then fetch anchors

    it would be best if we could handle textbox changes in our text settings, we'd need to pass in the path of the anchor and the textbox id
    in text settings, we will make a copy of our array and locally change it's values, everytime we change a value we will set the textbox array to be our new array
  
  */


  return (
    <>
        <nav className={'h-[10vh] bg-transparent w-full items-center p-6 flex flex-row justify-between ' + (home.textBlack ? "text-[#000000]" : "text-[#ffffff]")}>
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