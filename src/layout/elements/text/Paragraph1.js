import React from 'react'
import TextBox from '../../../features/editing/TextBox'

const Paragraph1 = () => {
  return (
    <div style={{fontSize: "inherit"}} className='bg-transparent w-max p-1'>
        <TextBox>Double click to edit me!</TextBox>
    </div>
  )
}

export default Paragraph1