import React from 'react'
import Bg from "../../../assets/images/backgrounds/bg2.jpg"

const Bg2 = () => {
  return (
    <div style={{backgroundImage: `url(${Bg})`}} className='w-full max-h-screen bg-cover'>
      <img src={Bg} className="invisible" />
    </div>
  )
}

export default Bg2