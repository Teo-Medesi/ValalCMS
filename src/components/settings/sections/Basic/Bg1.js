import React from 'react'
import Bg from "../../../../assets/images/backgrounds/bg1.jpg"

const Bg1 = () => {
  return (
    <div style={{backgroundImage: `url(${Bg})`, minWidth: "100%", height: "inherit", backgroundSize: "100% 100%"}}>
      <img src={Bg} className="invisible" />
    </div>
  )
}

export default Bg1