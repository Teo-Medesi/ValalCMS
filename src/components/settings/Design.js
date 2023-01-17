import React, {useContext} from "react";
import { SettingsContext } from "../../Settings";
import CloseIcon from "../../assets/images/svgs/closeIcon.svg"

const Design = () => {
    const [setIsToggled, setIsToggledRelative] = useContext(SettingsContext);
    
    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-xl text-black-900'>Design</h1>
                <img src={CloseIcon} onClick={() => setIsToggledRelative(false)} className="w-12 cursor-pointer h-12" />
            </div>
        
        </>
    )
}

export default Design