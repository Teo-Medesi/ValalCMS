import React from 'react'
import Bg from "../../../../assets/images/backgrounds/bg1.jpg"

const Bg1 = () => {
  return (
    <div style={{backgroundImage: `url(${Bg})`}} className='w-full max-h-screen bg-cover'>
      <img src={Bg} className="invisible" />
    </div>
  )
}

export default Bg1