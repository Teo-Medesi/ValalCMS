import React, { useContext, useEffect, useRef, useState } from 'react'
import * as All from "../settings/sections/SectionExports" 
import TextSettings from '../../TextSettings'
import Anchor from '../../Anchor'
import { ProjectContext } from '../../Project'
import Services1 from '../settings/sections/Services/Services1'
import Navbar1 from '../settings/sections/Navbar1'
import Header1 from '../settings/sections/Header/Header1'

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
      <TextSettings updateColor={updateColor} updateFont={updateFont} updateFontSize={updateFontSize} setIsActive={setIsTextSettingsActive} selectedTextBox={selectedTextBox} className={isTextSettingsActive ? "absolute z-[2] top-80 left-64" : "hidden"}/>         
      <div className='text-white z-0 relative flex flex-col bg-[#000000] min-h-screen h-full'>
          <Anchor defaultElement={<Navbar1 />}/>
          <Anchor defaultElement={<Header1 />}/>
          <Anchor defaultElement={<Services1 />}/>
       </div>
      
    </>
  )
}

export default PortfolioTemplateEditable