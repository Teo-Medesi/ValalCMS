import React, {useState} from 'react'
import { ResizableBox } from 'react-resizable'

const Bruh = () => {
  
  const [size, setSize] = useState({width: "100vw", height: 240})

  const onResize = (event, {element, size, handle}) => {
    setSize({width: size.width, height: size.height});
  };

  return (
      <ResizableBox width={size.width} height={size.height} onResize={onResize} handle={<div className='flex justify-center w-screen bg-secondary h-2 relative'><div className='w-8 h-8 absolute -top-3 cursor-pointer rounded-full border-secondary border-2 z-[2] bg-white'></div></div>}>
        <section className="flex text-black-700 px-24 flex-col justify-center gap-3 text-sm text-center py-16 h-full w-screen bg-black-900">
        </section>
      </ResizableBox>
  )
}

export default Bruh