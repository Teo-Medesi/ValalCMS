import React, { useContext, useState } from 'react'
import { ThisElementContext } from '../../features/anchors/elements/Element';

const Embed = () => {
    const elementData = useContext(ThisElementContext)

    if (elementData.properties.url != null)
    {
        return <iframe src={elementData.properties.url} className="w-full h-full" />
    }
    else {
        return (
            <div className='h-64 rounded-md border-black-600 border'></div>
        )
    }
}

export default Embed