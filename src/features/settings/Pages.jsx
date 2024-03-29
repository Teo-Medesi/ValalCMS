import React, {useContext} from "react";
import { SettingsContext } from "./Settings";
import CloseIcon from "../../assets/svgs/closeIcon.svg"

const Pages = () => {
const [[isToggled, setIsToggled], _ignore] = useContext(SettingsContext);
    
    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-xl text-black-900'>Pages</h1>
                <img src={CloseIcon} onClick={() => setIsToggled(false)} className="w-12 cursor-pointer h-12" />
            </div>
        </>
    )
}

export default Pages