import React from 'react'
import * as All from "./components/settings/sections/SectionExports"

const ComponentImport = ({componentName}) => {
    switch(componentName)
    {
        case "Text1": return <All.Text1 />
        case "Text2": return <All.Text2 />
        case "Header1": return <All.Header1 />
        case "Services1": return <All.Services1 />
        case "Basic1": return <All.Basic1 />
        case "Navbar1": return <All.Navbar1 />
        case "Subscribe1": return <All.Subscribe1 />
        case "Contact1": return <All.Contact1 />
    }    

}

export default ComponentImport