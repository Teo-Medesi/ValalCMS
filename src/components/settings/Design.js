import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../Settings";
import CloseIcon from "../../assets/images/svgs/closeIcon.svg"
import { HomeContext } from "../../Home";
import { ProjectContext } from "../../Project";
import { UserContext } from "../../App";
import { db } from "../../firebase.config";
import { getDoc, doc, updateDoc } from "firebase/firestore";


const Design = () => {
    const [setIsToggled, setIsToggledRelative] = useContext(SettingsContext);
    const [homePath, setHomePath] = useState("");

    const [home, setHome] = useState([]);
    const [project, _ignore, fetchProject] = useContext(ProjectContext);
    const [user, setUser] = useContext(UserContext);


    const fetchHome = async () => {
        const homeRef = doc(db, homePath);
        const homeSnap = await getDoc(homeRef);

        setHome(homeSnap.data());
    }

    useEffect(() => {
        if (user != null && user != [] && project.path != null) {
            setHomePath(`${project.path}/pages/home`);
        }

    }, [user, project.path])

    useEffect(() => {
        if (homePath !== "" && homePath != null) {
            fetchHome();
        }
    }, [homePath])

    const handleColorChange = async event => {
        if (event.target.value.length === 7)
        {
            const homeRef = doc(db, homePath);
            await updateDoc(homeRef, {backgroundColor: event.target.value})
            fetchHome();
        }
    }

    const handleTextColorChange = async event => {
        const homeRef = doc(db, homePath);
        await updateDoc(homeRef, {textBlack: event.target.value})
    }


    return (
        <>
            <div className='flex p-3 flex-row items-center justify-between border-b border-black-600'>
                <h1 className='text-xl text-black-900'>Design</h1>
                <img src={CloseIcon} onClick={() => setIsToggledRelative(false)} className="w-12 cursor-pointer h-12" />
            </div>

            <div className="p-6 min-h-screen flex flex-col gap-6 overflow-y-scroll">
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl">Page Background</h1>
                    <div style={{background: home.backgroundColor}} className="border p-3 border-black-600 w-full rounded-md h-72">
                        <input onChange={handleColorChange} defaultValue={home.backgroundColor} className="text-2xl bg-transparent outline-none text-black-600" />
                    </div>
                    <h3 className="text-black-700 italic">Please reload page to see changes</h3>
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="text-xl">Font</h1>
                    <div className="border p-3 border-black-600 w-full rounded-md">
                        <input onChange={handleColorChange} defaultValue={home.font} className="text-xl bg-transparent outline-none text-black-900" />
                    </div>
                    <h3 className="text-black-700 italic">Please reload page to see changes</h3>
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="text-xl">Text Color</h1>
                    <div className="border p-3 flex flex-row justify-between border-black-600 w-full rounded-md items-center">
                        <h1 className="text-xl">Dark</h1>
                        <input type="checkbox" onChange={handleTextColorChange} defaultChecked={home.textBlack} className="w-6 h-6 cursor-pointer"/>
                    </div>
                    <h3 className="text-black-700 italic">Please reload page to see changes</h3>
                </div>
            </div>

        </>
    )
}

export default Design