import React, { useState, useEffect, useContext } from 'react'
import { collection, doc } from 'firebase/firestore';
import { db } from './firebase.config'
import { setDoc, addDoc } from 'firebase/firestore'
import PortfolioTemplate from './components/websiteTemplates/PortfolioTemplate';
import Arrow from "./assets/images/arrow.png"
import { useNavigate } from 'react-router-dom';
import { UserContext } from './App';

const TemplatePage = ({selectedCategory}) => {
    const templates = [<PortfolioTemplate />];
    switch(selectedCategory) {
        case "Portfolio":
            return (
                <div className=''>
                    {templates.map((template, index) => <div className='h-0 cursor-pointer w-full scale-50' key={index}>{template}</div>)}
                </div>
            )
    }
}

const ColorScheme = ({colors, theme, setScheme, colorSchemes, index, setIndex, selectedIndex}) => {
    const handleClick = () => {
        setScheme(colorSchemes[index]);
        setIndex(index);
    }

    return (
        <div onClick={handleClick} className={(selectedIndex === index) ? 'flex flex-row items-center gap-4 border-white border-4 cursor-pointer p-2 rounded-md' : 'flex flex-row items-center gap-4 hover:border-white border-4 border-black-100 cursor-pointer p-2 rounded-md'}>
            {Object.values(colors).map((color, index) => <div key={index} style={{background: color}} className="2xl:w-20 2xl:h-20 xl:w-14 xl:h-14 rounded-full"></div>)}
        </div>
    )
}     

const Preview = ({selectedColorScheme, selectedIndex}) => {

    let colors = {};
    switch(selectedIndex) {
        case 0: 
            colors = {
                BG: selectedColorScheme.colors.primary,
                navbarBG: selectedColorScheme.colors.quinary,
                navbarText: "#ffffff",
                loginBG: selectedColorScheme.colors.secondary,
                loginText: "#ffffff",
                headerOneBG: selectedColorScheme.colors.quaternary,
                headerOneText: selectedColorScheme.colors.primary,
                headerTwoText: selectedColorScheme.colors.quaternary,
                sectionBG: selectedColorScheme.colors.tertiary,
                sectionText: selectedColorScheme.colors.primary,
                articleCardBG: selectedColorScheme.colors.quinary
            }
            break;
        case 1:
            colors = {
                BG: selectedColorScheme.colors.tertiary,
                navbarBG: selectedColorScheme.colors.tertiary,
                navbarText: selectedColorScheme.colors.quaternary,
                loginBG: selectedColorScheme.colors.primary,
                loginText: selectedColorScheme.colors.quaternary,
                headerOneBG: selectedColorScheme.colors.tertiary,
                headerOneText: selectedColorScheme.colors.quaternary,
                headerTwoText: selectedColorScheme.colors.quaternary,
                sectionBG: "#111316",
                sectionText: selectedColorScheme.colors.quaternary,
                articleCardBG: "#111316"
            }
            break;
        case 2:
            colors = {
                BG: selectedColorScheme.colors.secondary,
                navbarBG: selectedColorScheme.colors.quaternary,
                navbarText: selectedColorScheme.colors.quinary,
                loginBG: selectedColorScheme.colors.quinary,
                loginText: selectedColorScheme.colors.quaternary,
                headerOneBG: selectedColorScheme.colors.primary,
                headerOneText: selectedColorScheme.colors.quaternary,
                headerTwoText: selectedColorScheme.colors.primary,
                sectionBG: selectedColorScheme.colors.quinary,
                sectionText: selectedColorScheme.colors.quaternary,
                articleCardBG: selectedColorScheme.colors.primary
            }
            break;
        case 3:
            colors = {
                BG: selectedColorScheme.colors.primary,
                navbarBG: selectedColorScheme.colors.tertiary,
                navbarText: "#ffffff",
                loginBG: selectedColorScheme.colors.quaternary,
                loginText: "#ffffff",
                headerOneBG: selectedColorScheme.colors.quaternary,
                headerOneText: selectedColorScheme.colors.primary,
                headerTwoText: selectedColorScheme.colors.quaternary,
                sectionBG: selectedColorScheme.colors.secondary,
                sectionText: selectedColorScheme.colors.quinary,
                articleCardBG: selectedColorScheme.colors.quinary
            }
            break;
        case 4:
            colors = {
                BG: selectedColorScheme.colors.tertiary,
                navbarBG: selectedColorScheme.colors.primary,
                navbarText: selectedColorScheme.colors.secondary,
                loginBG: selectedColorScheme.colors.secondary,
                loginText: selectedColorScheme.colors.primary,
                headerOneBG: selectedColorScheme.colors.secondary,
                headerOneText: selectedColorScheme.colors.primary,
                headerTwoText: selectedColorScheme.colors.quaternary,
                sectionBG: selectedColorScheme.colors.primary,
                sectionText: selectedColorScheme.colors.quaternary,
                articleCardBG: selectedColorScheme.colors.secondary
            }
            break;
    }


    return (
        <div className="h-full">
            <div style={{background: colors.BG}} className='flex flex-col border-black w-full h-full rounded-md shadow-md shadow-black-500'>

                <div style={{background: colors.navbarBG}} className="basis-[10%] font-medium px-4  justify-between items-center flex flex-row">
                    <ul style={{color: colors.navbarText}} className='flex uppercase flex-row gap-4'>
                        <li>Home</li>
                        <li>Über uns</li>
                        <li>Kontakt</li>
                    </ul>

                    <div style={{background: colors.loginBG, color: colors.loginText}} className='uppercase text-white p-1 rounded'>Login</div>
                </div>

                <div className='basis-[45%] flex flex-row'>
                    <div style={{background: colors.headerOneBG}} className='basis-1/2 flex flex-col justify-between p-12'>
                        <h1 style={{color: colors.headerOneText}} className='text-white text-3xl'>Wir machen den Unterschied</h1>
                        <p  style={{color: colors.headerOneText}} className='text-white'>Nachbarin ehrenhalben zuteilte, ein Stich durchs Herz ging. Beim dritten englischen Tanz waren wir da angelangt, als Lotte beschäftigt war</p>
                    </div>
                    <div className='basis-1/2 p-12 flex flex-col gap-4'>
                        <h1 style={{color: colors.headerTwoText}} className='text-3xl'>Begleiten Sie uns</h1>
                        <p style={{color: colors.headerTwoText}}>Ich sage dir, Wilhelm, ich habe dir, denk' ich, übertrieben finden; es ist wieder in der tiefen Nacht, wenn der hohe Vollmond über mir steht.</p>
                    </div>
                </div>

                <div style={{background: colors.sectionBG, color: colors.sectionText}} className='basis-[20%] text-white flex items-center text-sm p-6 px-20'>
                    <p>Glase Wasser sehr beschäftigt zu sein schienen, alle die unergründlichen Kräfte; und nun nach und sah Lottens Kopfputz sich zum Schlage herauslehnen. Das Wort hasse ich auf die Wiese hinaus zu den Arbeitern, und der Mensch ist </p>
                </div>

                <div className='basis-[25%] flex flex-row justify-between p-12 pb-0 h-full w-full'>
                    <div style={{background: colors.articleCardBG}} className='w-[30%] h-full rounded-md shadow-md'></div>
                    <div style={{background: colors.articleCardBG}} className='w-[30%] h-full rounded-md shadow-md'></div>
                    <div style={{background: colors.articleCardBG}} className='w-[30%] h-full rounded-md shadow-md'></div>
                </div>

            </div>
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
            theme: "Minimalist Black",
            colors: {
                quinary: "#ffffff",
                quaternary: "#eb7c99",
                tertiary: "#bf08c1",
                secondary:"#111316",
                primary: "#000000" 
            }
        },
        {
            theme: "trustworthy, reliable",
            colors: {
                quinary: "#52ab98",
                quaternary: "#f2f2f2",
                tertiary: "#ffffff",
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

    const pageCategories = ["E-commerce", "Business", "Blog", "Portfolio", "Event", "Personal Website", "Tribute", "Nonprofit"]

    const [user] = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [siteName, setSiteName] = useState("");
    const [pageNumber, setPageNumber] = useState(1);    
    const [selectedColorScheme, setSelectedColorScheme] = useState(colorSchemes[0]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("Minimalist Black")
    const [selectedTemplate, setSelectedTemplate] = useState("");

    const navigate = useNavigate();


    const handleKeyDown = event => {
        if (event.key === "Enter")
        {
            if (siteName !== "")
            {
                setPageNumber(current => current + 1)
            }
        }
    }

    const createProject = () => {
        setIsLoading(true);

        setDoc(doc(db, `users/${user.uid}/projects/${siteName}`), {name: siteName, theme: selectedTheme, color_scheme: {primary: selectedColorScheme.colors.primary, secondary: selectedColorScheme.colors.secondary, tertiary: selectedColorScheme.colors.tertiary, quaternary: selectedColorScheme.colors.quaternary, quinary: selectedColorScheme.colors.quinary}, category: selectedCategory, template: selectedTemplate, font: "Inter"}).then(async () => {
            console.log("created project")
            await setDoc(doc(db, `users/${user.uid}/projects/${siteName}/pages/home`),{backgroundColor: "#000000", font: "Inter", textBlack: false});
            setIsLoading(false);

            navigate(`/${siteName}`);
        }).catch(error => {
            console.log(error);
        })



        /*
            users > user > projects

            here we will make a new project
                users > user > projects > project_title 

            project_title will have fields of id, name, theme, color_scheme, category 

            inside of it we will make a pages collection
                users > user > projects > project_title > pages 

            inside of pages we'll make it so the default is just a home page document
                users > user > projects > project_title > pages > home 

            each component and it's properties will be stored inside of components        
                users > user > projects > project_title > pages > home > components 
            
                after we made the project we will redirect the user to that project

        */
    }

    switch (pageNumber) {
        case 1:
            return (
                <div onKeyDown={handleKeyDown} className='w-full px-48 py-24 h-full items-center flex flex-row'>
                    <div className="basis-2/3 p-12">
                        <h1 className='text-4xl text-black-900'>Let's give your website a name.</h1>
                    </div>
                    <div className='basis-1/3 flex justify-center items-center'>
                        <input onChange={event => setSiteName(event.target.value)} value={siteName} type="text" className='w-full border-b-2 border-b-black-700 bg-black-100 text-center outline-none text-black-900 text-4xl placeholder:text-black-700'/>
                    </div>
                </div>
            );

        case 2: 
            return (
                <div className='w-full h-full items-center p-24 flex flex-row justify-between'>
                    <div className="basis-2/3 p-12">
                        <h1 className='text-4xl text-black-900'>What will your website be for?</h1>
                    </div>
                    <div className='basis-1/3 flex flex-col h-full justify-between'>
                        {pageCategories.map((category, index) => <div key={index} onClick={() => setSelectedCategory(category)} className={(selectedCategory === category) ? "p-4 border-2 border-primary rounded cursor-pointer text-primary text-2xl" : "p-4 border-2 border-black-100 rounded cursor-pointer text-black-900 hover:border-black-900 text-2xl"}>{category}</div>)}
                        <div onClick={() => setPageNumber(current => current + 1)} className={(selectedCategory !== "") ? 'text-2xl w-full text-black-100 text-center bg-primary rounded-md p-4 cursor-pointer' : 'hidden'}>Next</div>
                    </div>
                </div>     
            );
    
        case 3: 
            return (

                <div className='w-full h-full flex flex-col items-center p-24 text-black-900'>
                    <div className="flex flex-row justify-between items-center h-full w-full">
                        <h1 className='text-4xl text-black-900'>Do you want to use a pre-made template?</h1>
                        <h1 onClick={() => setSelectedTemplate("")} className={'text-4xl rounded cursor-pointer p-4 hover:border-primary border-2 border-transparent text-black-900 ' + ((selectedTemplate === "") ? "border-primary" : "")}>Yes</h1>
                        <h1 onClick={() => setSelectedTemplate("none")} className={'text-4xl cursor-pointer p-4 rounded hover:border-primary border-2 border-transparent text-black-900 '  + ((selectedTemplate === "none") ? "border-primary" : "")}>No, I'll start from scratch</h1>
                    </div>
                    <div onClick={() => setPageNumber(current => current + 1)} className='text-3xl w-1/3 text-black-100 text-center bg-primary rounded-md p-4 cursor-pointer'>Next</div>

                </div>
            )
        case 4: 
            return (
                <div>
                    <div className='w-full h-screen items-center p-24 flex flex-row justify-between'>
                        <div className='h-full flex px-4 flex-col items-center gap-6 basis-1/2'>
                            <Preview selectedColorScheme={selectedColorScheme} selectedIndex={selectedIndex} />
                        </div>
                        <div className='basis-1/2 flex h-full w-full justify-end'>
                            <div className='flex flex-col gap-2 justify-between'>
                                {colorSchemes.map((colorScheme, index) => (index < 5) ? <ColorScheme key={index} selectedIndex={selectedIndex} index={index} setIndex={setSelectedIndex} colorSchemes={colorSchemes} setScheme={setSelectedColorScheme} theme={colorScheme.theme} colors={colorScheme.colors}/> : <></>)}
                                <button onClick={() => setPageNumber(current => current + 1)} className={(selectedCategory !== "") ? 'text-3xl w-full text-black-100 text-center bg-primary rounded-md p-4 cursor-pointer' : 'hidden'}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 5: 

            return (
                <div className="flex flex-col gap-6 h-full w-full justify-center  items-center">
                    <div className={isLoading ? "flex flex-col gap-6 items-center" : "hidden"}>
                        <div className='w-44 h-44 border-[24px] border-t-secondary rounded-[50%] animate-spin border-black-500'></div>
                        <p className='text-3xl text-gray-500 tracking-wide'>Creating project...</p>
                    </div>

                    <button onClick={createProject} className={isLoading ? "hidden" : 'text-3xl w-1/2 text-black-100 text-center bg-primary rounded-md p-4 cursor-pointer'}>Create Project</button>
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

    // website name, color scheme, fonts, languages supported, website category 
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