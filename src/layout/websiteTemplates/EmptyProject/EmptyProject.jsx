import React, {useContext} from 'react'
import AddAnchor from '../../../features/anchors/AddAnchor'
import Anchor from '../../../features/anchors/Anchor'
import ComponentImport from "../../../components/ComponentImport"
import { AnchorContext } from '../../../pages/Home'
import { HomeContext } from '../../../features/project/Project'

const EmptyProject = () => {

    // so we want to get all anchors from our anchors collection
    // for that we need need a ref to our anchors path, a fetch function, we'll use getDocs to get a docsSnapshot , then we'll populate state with it
    // now the real question is: Should this be done in our EmptyProject component or in Home? 
    // our home doesn't just have to be blank, it can be a template, with predefined anchors
    // if we fetch the anchors in home, for blank it should be empty at start, but for templates we should add them to firestore upon project creation
    // as it goes for templates, upon creating a project, we'll define some properties based on the chosen category, no problem at all

    const [anchors,  ...rest] = useContext(AnchorContext);
    
    return (
        <div>
            {anchors.map(anchor => <Anchor component={<ComponentImport anchorData={anchor} componentName={anchor.component}/>} anchorData={anchor} key={anchor.id}/>)}
            <AddAnchor/>
        </div>
    )
}

export default EmptyProject