import React, { useContext, useEffect, useRef, useState } from 'react'
import * as All from "../settings/sections/SectionExports"
import TextBox from '../TextBox'
import Kanye from "./images/kanye2.jpg"
import Upload from "./images/upload2.png"
import TextSettings from '../../TextSettings'
import Anchor from '../../Anchor'
import { ProjectContext } from '../../Project'

const PortfolioTemplateEditable = () => {

  const [textBoxes, setTextBoxes] = useState([{name: "TextBox0", value:"", properties: {}},{name: "TextBox1", value:"", properties: {}},{name: "TextBox2", value:"", properties: {}},{name: "TextBox3", value:"", properties: {}},{name: "TextBox4", value:"", properties: {}},{name: "TextBox5", value:"", properties: {}},{name: "TextBox6", value:"Contact Me", properties: {font: "Inter", fontSize: "16px", color: "#ffffff"}},{name: "TextBox7", value:"", properties: {font: "", fontSize: "", color:""}},{name: "TextBox8", value:"", properties: {}},{name: "TextBox9", value:"", properties: {}},{name: "TextBox10", value:"", properties: {}},{name: "TextBox11", value:"", properties: {}},{name: "TextBox12", value:"", properties: {}},{name: "TextBox13", value:"", properties: {}},{name: "TextBox14", value:"", properties: {}},{name: "TextBox15", value:"", properties: {}},{name: "TextBox16", value:"", properties: {}},{name: "TextBox17", value:"", properties: {}}]);
  const [isTextSettingsActive, setIsTextSettingsActive] = useState(false);
  const [selectedTextBox, setSelectedTextBox] = useState("none");
  const [_ignore, [isAnchorActive, setIsAnchorActive]] = useContext(ProjectContext);

  const updateTextBoxValue = (text, name) => {
    setIsTextSettingsActive(false); 
    console.log(`new text: ${text}, name: ${name}`);
    setTextBoxes(current => current.map(textBox => textBox.name === name ? {...textBox, value: text} : textBox));
  }

  const updateFont = (name, font) => {
    console.log(`font ${font}`);
    setTextBoxes(current => current.map(textBox => textBox.name === name ? {...textBox, properties: {...textBox.properties, font: font}} : textBox));
  }

  const updateFontSize = (name, fontSize) => {
    console.log(`fontSize ${fontSize}`);
    setTextBoxes(current => current.map(textBox => textBox.name === name ? {...textBox, properties: {...textBox.properties, fontSize: fontSize}} : textBox));
  }

  const updateColor = (name, color) => {
    console.log(`color ${color}`);
    setTextBoxes(current => current.map(textBox => textBox.name === name ? {...textBox, properties: {...textBox.properties, color: color}} : textBox));
  }

  const handleEdit = (textBox) => {
    setIsTextSettingsActive(true);
    setSelectedTextBox(textBox)
  }
  
  return (
    <>
      <div className='text-white z-0 relative flex flex-col bg-[#000000] min-h-screen h-full'>
      
      <div>
        
        <TextSettings updateColor={updateColor} updateFont={updateFont} updateFontSize={updateFontSize} setIsActive={setIsTextSettingsActive} selectedTextBox={selectedTextBox} className={isTextSettingsActive ? "absolute z-[2] top-80 left-64" : "hidden"}/>
        
          <nav className='basis-[5%] items-center p-6 flex flex-row justify-between'>
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
            <button className='p-3 bg-black-900 rounded-3xl'><TextBox onDoubleClick={() => handleEdit(textBoxes[6])} properties={textBoxes[6].properties} customSetFunction={updateTextBoxValue} placeholder={textBoxes[6].value} customParameter="TextBox6">{textBoxes[6].value}</TextBox></button>
          </nav>
        
          <div className='flex flex-col basis-[95%] bg-[#000000] min-h-screen'>
              <header className='p-24 flex flex-row gap-6 basis-[100%] h-full'>
                
                <div className='basis-1/2 h-full px-6 py-20 flex gap-6 flex-col'>
                  <TextBox onDoubleClick={() => handleEdit(textBoxes[7])} customParameter="TextBox7" properties={textBoxes[7].properties} customSetFunction={updateTextBoxValue} placeholder="Digital Designer crafting product shit that people love don't need" className="text-6xl"><span className="bg-gradient-to-r text-transparent bg-clip-text font-bold from-[#bf08c1] to-[#eb7c99]">Digital Designer</span> crafting <span className='line-through text-gray-600'>product</span> shit that people <span className='line-through text-gray-600'>love</span> don't need</TextBox>
                  <p className='text-sm text-black-700 w-fit'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <button className="p-3 px-6 rounded-3xl bg-gradient-to-r from-[#bf08c1] to-[#eb7c99] w-fit">Book a FREE call</button>
                </div>
        
                <div className='basis-1/2'>
                  <div className='relative w-full h-full after:content-[""] z-[0] after:absolute after:z-[-1] after:-inset-2 after:blur-xl after:bg-gradient-to-br after:from-[#bf08c1] after:to-[#ffffff]'><img src={Kanye} className='w-full h-full object-cover bg-gray-700' /></div>
                </div>

              </header>

            </div>
          </div>

          <div className='min-h-screen w-full flex flex-col h-full'>
              <Anchor isActive={isAnchorActive}/>
              <section className='py-12 flex flex-col gap-12 h-full'>
            
                <div className='w-full px-24 flex justify-center flex-col gap-3 items-center'>
                  <h1 className='text-4xl'>Services <span>I believe in</span></h1>
                  <p className='text-gray-500 text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className='flex flex-row md:justify-between xl:justify-center xl:gap-12'>
                  <div className='bg-black-900 p-6 px-12 h-96 relative after:absolute after:bg-gradient-to-r after:from-[] flex flex-col gap-6 rounded-md md:basis-[30%] xl:basis-[25%]'>
                    <img src={Upload} className="w-20 h-20"/>
                    <h3 className='text-2xl font-bold'>Website Design</h3>
                    <p className='text-sm text-black-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  
                  <div className='bg-black-900 p-6 px-12 h-96 relative after:absolute after:bg-gradient-to-r after:content-[""] after:from-[#bf08c1] after:to-[#eb7c99] flex flex-col gap-6 rounded-md md:basis-[30%] xl:basis-[25%]'>
                    <img src={Upload} className="w-20 h-20"/>
                    <h3 className='text-2xl font-bold'>SEO Marketing</h3>
                    <p className='text-sm text-black-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  
                  <div className='bg-black-900 p-6 px-12 h-96 relative after:bottom-10 after:left-10 after:absolute after:bg-gradient-to-r after:z-[-1] after:w-full after:content-[""] after:top after:h-1 flex flex-col gap-6 rounded-md md:basis-[30%] xl:basis-[25%]'>
                    <img src={Upload} className="w-20 h-20"/>
                    <h3 className='text-2xl font-bold'>WF Development</h3>
                    <p className='text-sm text-black-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  
                </div>
              </section>
              <Anchor />
            </div>
          </div>
    </>
  )
}

export default PortfolioTemplateEditable