import React from 'react'
import * as All from "../layout/sections/SectionExports"


const ComponentImport = ({componentName, anchorData}) => {
    switch(componentName)
    {
        case "Text1": return <All.Text1 />
        case "Text2": return <All.Text2 />
        case "Header1": return <All.Header1 />
        case "Services1": return <All.Services1 />
        case "Basic1": return <All.Basic1 />
        case "Navbar1": return <All.Navbar1 anchorData={anchorData}/>
        case "Subscribe1": return <All.Subscribe1 />
        case "Contact1": return <All.Contact1 />
        case "Bg0": return <All.Bg0 />
        case "Bg1": return <All.Bg1 />
        case "Bg2": return <All.Bg2 />
        case "Bg3": return <All.Bg3 />
        case "Bg4": return <All.Bg4 />
    }    

}

export default ComponentImport