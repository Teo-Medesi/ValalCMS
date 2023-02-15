import React from 'react'
import * as All from "../layout/elements/ElementsExport"


const ElementImport = ({elementName, anchorData}) => {
    switch(elementName)
    {
        case "Paragraph1": return <All.Paragraph1 />
        case "Paragraph1Bold": return <All.Paragraph1Bold />
        case "ImageElement": return <All.ImageElement />
    }    

}

export default ElementImport