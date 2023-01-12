import React, { useEffect, useRef, useState } from 'react'
import TextBox from '../TextBox'
import Kanye from "./images/kanye2.jpg"
import Upload from "./images/upload2.png"

const PortfolioTemplateEditable = () => {

  const [textBoxes, setTextBoxes] = useState([{name: "TextBox0", value:""},{name: "TextBox1", value:""},{name: "TextBox2", value:""},{name: "TextBox3", value:""},{name: "TextBox4", value:""},{name: "TextBox5", value:""},{name: "TextBox6", value:"Contact Me"},{name: "TextBox7", value:""},{name: "TextBox8", value:""},{name: "TextBox9", value:""},{name: "TextBox10", value:""},{name: "TextBox11", value:""},{name: "TextBox12", value:""},{name: "TextBox13", value:""},{name: "TextBox14", value:""},{name: "TextBox15", value:""},{name: "TextBox16", value:""},{name: "TextBox17", value:""}]);

  const updateTextBoxValue = (text, name) => {
    console.log(`new text: ${text}, name: ${name}`)
    setTextBoxes(current => current.map(textBox => textBox.name === name ? {...textBox, value: text} : textBox))
  }
  
  return (
    <div className='text-white z-0 relative flex flex-col bg-[#000000] min-h-screen'>
      <nav className='basis-[10%] text-xl items-center p-6 flex flex-row justify-between'>
        <h1>Portfolio</h1>
        <div>
          <ul className='flex text-base text-gray-300 flex-row gap-4'>
            <li>About me</li>
            <li>Services</li>
            <li>Projects</li>
            <li>Blogs</li>
            <li>Gallery</li>
          </ul>
        </div>
        <button className='p-3 bg-black-900 rounded-3xl'><TextBox customSetFunction={updateTextBoxValue} placeholder={textBoxes[6].value} customParameter="TextBox6">{textBoxes[6].value}</TextBox></button>
      </nav>
      
      <div className='flex flex-col px-24'>
          <header className='py-24 flex flex-row gap-6 basis-[40%] h-full'>
            <div className='basis-1/2 px-6 py-20 flex gap-6 flex-col'>
              <TextBox customParameter="TextBox7" customSetFunction={updateTextBoxValue} placeholder="Digital Designer crafting product shit that people love don't need" className="text-7xl h-full"><span className="bg-gradient-to-r text-transparent bg-clip-text font-bold from-[#bf08c1] to-[#eb7c99]">Digital Designer</span> crafting <span className='line-through text-gray-600'>product</span> shit that people <span className='line-through text-gray-600'>love</span> don't need</TextBox>
              <p className='text-sm text-black-700 w-fit'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <button className="p-3 px-6 rounded-3xl bg-gradient-to-r from-[#bf08c1] to-[#eb7c99] w-fit">Book a FREE call</button>
            </div>
      
            <div className='basis-1/2'>
              <div className='relative w-full h-full after:content-[""] after:absolute after:z-[-1] after:-inset-1 after:blur-xl after:bg-gradient-to-br after:from-[#bf08c1] after:to-[#ffffff]'><img src={Kanye} className='w-full h-full object-cover bg-gray-700' /></div>
            </div>

          </header>

          <section className='py-12 flex flex-col gap-12'>
            <div className='w-full flex justify-center flex-col items-center'>
              <h1 className='text-5xl'>Services <span>I believe in</span></h1>
              <p className='text-gray-500 text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>

            <div className='flex flex-row md:justify-between xl:justify-center xl:gap-12'>

            <div className='bg-black-900 p-6 px-12 relative after:absolute after:bg-gradient-to-r after:from-[] flex flex-col gap-6 rounded-md md:basis-[30%] xl:basis-[25%]'>
                <img src={Upload} className="w-20 h-20"/>
                <h3 className='text-2xl font-bold'>Website Design</h3>
                <p className='text-sm text-black-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div className='bg-black-900 p-6 px-12 relative after:absolute after:bg-gradient-to-r after:content-[""] after:from-[#bf08c1] after:to-[#eb7c99] flex flex-col gap-6 rounded-md md:basis-[30%] xl:basis-[25%]'>
                <img src={Upload} className="w-20 h-20"/>
                <h3 className='text-2xl font-bold'>SEO Marketing</h3>
                <p className='text-sm text-black-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div className='bg-black-900 p-6 px-12 relative after:bottom-10 after:left-10 after:absolute after:bg-gradient-to-r after:z-[-1] after:w-full after:content-[""] after:top after:h-1 flex flex-col gap-6 rounded-md md:basis-[30%] xl:basis-[25%]'>
                <img src={Upload} className="w-20 h-20"/>
                <h3 className='text-2xl font-bold'>WF Development</h3>
                <p className='text-sm text-black-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

            </div>

          </section>
      </div>
    </div>
  )
}

export default PortfolioTemplateEditable