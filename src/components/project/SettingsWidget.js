import React, { useContext } from 'react'
import { SettingsContext } from '../../Settings'

const SettingsWidget = ({text, logo, element}) => {
  const setComponent = useContext(SettingsContext);
 
  return (
    <div onClick={() => setComponent(element)} className='flex bg-gray-800 justify-between cursor-pointer hover:border-l-4 border-l-white hover:shadow-xl items-center p-2 text-white text-xl border-y border-gray-900 font-semibold uppercase'> 
        <p>{text}</p>
        <img className="w-10 h-10" src={logo}/>
    </div>
  )
}

export default SettingsWidget