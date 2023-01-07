import React, { useState } from 'react'
import { db } from './firebase.config'
import { setDoc, addDoc } from 'firebase/firestore'


const ColorScheme = ({colors, theme, setScheme, colorSchemes, index}) => {
    return (
        <div onClick={() => setScheme(colorSchemes[index])} className='flex flex-row items-center gap-4 hover:border-white border-4 border-black-100 cursor-pointer p-2 rounded-md'>
            {Object.values(colors).map((color, index) => <div key={index} style={{background: color}} className="w-24 h-24 rounded-full"></div>)}
        </div>
    )
}     

const Page = () => {
    const colorSchemes = [
        {
            theme: "clever, eco-friendly",
            colors: {
                quinary: "#a9c25d",
                quaternary: "#73a24e",
                tertiary: "#39395f",
                secondary:"#416a59",
                primary: "#f5eec2" 
            }
        },
        {
            theme: "bright, health-conscious",
            colors: {
                quinary: "#e1eedd",
                quaternary: "#183a1d",
                tertiary: "#f0a04b",
                secondary:"#fefbe9",
                primary: "#f6c453" 
            }
        },
        {
            theme: "trustworthy, reliable",
            colors: {
                tertiary: "#52ab98",
                quaternary: "#f2f2f2",
                quinary: "#ffffff",
                secondary:"#c8d8e4",
                primary: "#2b6777" 
            }
        },
        {
            theme: "calming, well-being",
            colors: {
                quinary: "#141850",
                quaternary: "#303179",
                tertiary: "#ed7966",
                secondary:"#f5cac2",
                primary: "#fae5df" 
            }
        },
        {
            theme: "cheerful, charitable",
            colors: {
                quaternary: "#ffffff",
                tertiary: "#6db784",
                secondary: "#f9e45b",
                primary:"#1b4d89",
            }
        },
        {
            theme: "strong, emotive",
            colors: {
                quinary: "#e99f4c",
                quaternary: "#264143",
                tertiary: "#de5499",
                secondary:"#f2ebe9",
                primary: "#eddcd9" 
            }
        },
        {
            theme: "fun, youthful",
            colors: {
                quinary: "#9b45b2",
                quaternary: "#eb6b40",
                tertiary: "#70be51",
                secondary:"#f0a3bc",
                primary: "#397754" 
            }
        },
        {
            theme: "creative, bold",
            colors: {
                tertiary: "#030e12",
                secondary: "#fcde67",
                primary: "#5bccf6",
            }
        },
        {
            theme: "stylish, soft",
            colors: {
                quinary: "#282612",
                quaternary: "#2d2d2d",
                tertiary: "#fffbf0",
                secondary:"#943d24",
                primary: "#e4ddf4" 
            }
        },

    ]

    const [siteName, setSiteName] = useState("");
    const [pageNumber, setPageNumber] = useState(1);    
    const [selectedColorScheme, setSelectedColorScheme] = useState(colorSchemes[0]);
    
    const handleKeyDown = event => {
        if (event.key === "Enter")
        {
            setPageNumber(current => current + 1)
        }
    }

    switch (pageNumber) {
        case 1:
            return (
                <div onKeyDown={handleKeyDown} className='w-full px-48 py-24 h-full items-center flex flex-row'>
                    <div className="basis-2/3 p-12">
                        <h1 className='text-5xl text-black-900'>Let's give your website a name.</h1>
                    </div>
                    <div className='basis-1/3 flex justify-center items-center'>
                        <input onChange={event => setSiteName(event.target.value)} value={siteName} type="text" className='w-full border-b-2 border-b-black-700 bg-black-100 text-center outline-none text-black-900 text-5xl placeholder:text-black-700'/>
                    </div>
                </div>
            );

        case 2: 
            return (
                <div className='w-full h-full items-center p-24 flex flex-row justify-between'>
                    <div className="basis-1/2 h-full">
                        <div className='bg-white flex flex-col border-black w-full h-full rounded-md shadow-md shadow-black-500'>

                            <div style={{background: selectedColorScheme.colors.primary}} className="basis-[10%] font-medium px-6  justify-between items-center flex flex-row">
                                <ul style={{color: selectedColorScheme.colors.secondary}} className='flex uppercase flex-row gap-6'>
                                    <li>Home</li>
                                    <li>Über uns</li>
                                    <li>Kontakt</li>
                                </ul>

                                <div style={{background: selectedColorScheme.colors.secondary, color: selectedColorScheme.colors.quaternary}} className='uppercase text-white p-2 rounded'>Login</div>
                            </div>

                            <div className='basis-[45%] flex flex-row'>
                                <div style={{background: selectedColorScheme.colors.quaternary}} className='basis-1/2 flex flex-col justify-between p-12'>
                                    <h1 className='text-white text-3xl'>Wir machen den Unterschied</h1>
                                    <p className='text-white'>Nachbarin ehrenhalben zuteilte, ein Stich durchs Herz ging. Beim dritten englischen Tanz waren wir da angelangt, als Lotte beschäftigt war</p>
                                </div>
                                <div className='basis-1/2 p-12 flex flex-col gap-4'>
                                    <h1 style={{color: selectedColorScheme.colors.quaternary}} className='text-3xl'>Begleiten Sie uns</h1>
                                    <p style={{color: selectedColorScheme.colors.quaternary}}>Ich sage dir, Wilhelm, ich habe dir, denk' ich, übertrieben finden; es ist wieder in der tiefen Nacht, wenn der hohe Vollmond über mir steht.</p>
                                </div>
                            </div>

                            <div style={{background: selectedColorScheme.colors.tertiary}} className='basis-[20%] text-white flex items-center text-sm p-6 px-20'>
                                <p>Glase Wasser sehr beschäftigt zu sein schienen, alle die unergründlichen Kräfte; und nun nach und sah Lottens Kopfputz sich zum Schlage herauslehnen. Das Wort hasse ich auf die Wiese hinaus zu den Arbeitern, und der Mensch ist </p>
                            </div>

                            <div className='basis-[25%] flex flex-row justify-between p-12 pb-0 h-full w-full'>
                                <div style={{background: selectedColorScheme.colors.quinary, boxShadow: selectedColorScheme.colors.quaternary}} className='w-[30%] h-full rounded-md shadow-md'></div>
                                <div style={{background: selectedColorScheme.colors.quinary, boxShadow: selectedColorScheme.colors.quaternary}} className='w-[30%] h-full rounded-md shadow-md'></div>
                                <div style={{background: selectedColorScheme.colors.quinary, boxShadow: selectedColorScheme.colors.quaternary}} className='w-[30%] h-full rounded-md shadow-md'></div>
                            </div>

                        </div>
                    </div>
                    <div className='basis-1/2 flex flex-col h-full justify-between items-end'>
                        {colorSchemes.map((colorScheme, index) => (index < 5) ? <ColorScheme index={index} colorSchemes={colorSchemes} setScheme={setSelectedColorScheme} key={index} theme={colorScheme.theme} colors={colorScheme.colors}/> : <></>)}
                    </div>
                </div>
            );
    
        case 3: 
            return (
                <div>
                    3
                </div>
            )
        case 4: 
            return (
                <div>
                    4
                </div>
            )
        case 5: 
            return (
                <div>
                    5      
                </div>
            )
    }

}

const ProjectCreation = () => {


/*    const createProject = () => {

        setDoc(doc(db, `users/${user.uid}/Projects/Project${projects.length + 1}`), {project_id: projects.length + 1, project_name: "untitled_project"}).then(async () => {
          // creating user collections in firestore
          await setDoc(doc(db, `users/${user.uid}/Projects/Project${projects.length + 1}/footer/text`), {text: "Click to add text"});
          await addDoc(collection(db, `users/${user.uid}/Projects/Project${projects.length + 1}/navbar/navLinks/navLinks`), {text: "Home", link: "#", key: 1});
          await setDoc(doc(db, `users/${user.uid}/Projects/Project${projects.length + 1}/navbar/title`), {text: "Title"});
          // we do not need to create storage folders here because we can't create empty folders or empty collections
          // once the user wishes to upload a file to storage, the directories for that file will be created as we reference them in our path
         }).catch(error => {
          console.log(error);
         })
    }

            
*/

    // first up we need to ask to for the website name, color pallette, fonts, languages supported, website category 
    return (
    <div>
        <div className='bg-black-100 w-screen h-screen relative'>
            <Page />  
        </div>

            <div className='absolute bottom-0 left-0 rotate-180 w-screen overflow-hidden leading-none'>
                <svg className='relative block h-[62px] w-full ' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className='fill-secondary'></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" className='fill-primary-700'></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className='fill-tertiary'></path>
                </svg>
            </div>
            
            <div className='absolute top-0 left-0 w-full overflow-hidden leading-none'>
                <svg className='relative block h-[82px] w-full ' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className='fill-secondary'></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className='fill-secondary'></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className='fill-primary-700'></path>
                </svg>
            </div>
    </div>
  )
}

export default ProjectCreation