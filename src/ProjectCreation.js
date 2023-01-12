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
            {Object.values(colors).map((color, index) => <div key={index} style={{background: color}} className="2xl:w-24 2xl:h-24 xl:w-20 xl:h-20 rounded-full"></div>)}
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
                BG: selectedColorScheme.colors.quinary,
                navbarBG: selectedColorScheme.colors.tertiary,
                navbarText: selectedColorScheme.colors.secondary,
                loginBG: selectedColorScheme.colors.quaternary,
                loginText: selectedColorScheme.colors.secondary,
                headerOneBG: selectedColorScheme.colors.quaternary,
                headerOneText: selectedColorScheme.colors.primary,
                headerTwoText: selectedColorScheme.colors.quaternary,
                sectionBG: selectedColorScheme.colors.secondary,
                sectionText: selectedColorScheme.colors.quaternary,
                articleCardBG: selectedColorScheme.colors.quaternary
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

    /* 
        ok, let me collect my thoughts here before we go on forward
        we want to focus more on functionality and for now just forget a bit about design

        in these 4 days of non-stop work I have organize myself and assign a clear goal and quota that is to be met at the end
        of the day

        Since we are still lacking a lot of functionality I would like to dedicate 3 days to just expanding our app's capabilities

        The goal for day 1 will be setting up our backend for our projects in firebase
            no matter the design, the create project section is complete
            uppon completion of the create project questions, all of the users answers should be stored and used to create a new project collection
            after the project is created, the user should be redirected to the new project and a project link should be added to the dashboard
            for each project a new Route should be created
            reorganize the sidepanel, make it toggleable, if it's not toggled make it show only icons
            pretty much copy the sidepanel of wix, not in design but in content
            
            --TEMPLATE--
            the template we made will be our theme for pretty much every template we make in the future because of it's simplicity
            for now I want to keep the template preview and editable template separate
            that way, once the user is happy with his editable template, he can choose to see it in action, and we will just pass in all the 
            prefferences and content into a new preview template

            let's start with first making the text editable, we may want to update our Textbox component for this or quite possibly rewrite it
            upon clicking on a textbox, the sidemenu will open and navigate to text editing, giving control over font, font size, color, text decoration and the such

            --DATABASE--
            for each page of the project we want to create a collection, in that collection we will have a prefferences document and collections for each component
            for each textbox in the page we want to create a new textbox document, we'll make it self-numerating and in the future the user will have access to 
            a mock-up of the current page collection where he will be able to manipulate the documents and collections in a file explorer kind of way

        the fourth day will be something like a maintenance day, fixing redundancies in code, documenting code, organizing our working directories
        adding naming conventions among many more conventions (remember, 10% means a lot, even a 5% makes a difference in a competition)
        
        the design part of the process would hopefully be done to some extent by Ivano, but I can't yet count on him for sure
        therefore, the fifth day would be atleast half dedicated to making more templates and components

    */
    return (
        <div className="h-full">
            <div style={{background: colors.BG}} className='flex flex-col border-black w-full h-full rounded-md shadow-md shadow-black-500'>

                <div style={{background: colors.navbarBG}} className="basis-[10%] font-medium px-6  justify-between items-center flex flex-row">
                    <ul style={{color: colors.navbarText}} className='flex uppercase flex-row gap-6'>
                        <li>Home</li>
                        <li>Über uns</li>
                        <li>Kontakt</li>
                    </ul>

                    <div style={{background: colors.loginBG, color: colors.loginText}} className='uppercase text-white p-2 rounded'>Login</div>
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

        setDoc(doc(db, `users/${user.uid}/projects/${siteName}`), {name: siteName, theme: selectedTheme, color_scheme: "", category: selectedCategory}).then(async () => {
            console.log("created project")
            await setDoc(doc(db, `users/${user.uid}/projects/${siteName}/pages/home`),{});
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
                    <div className="basis-2/3 p-12">
                        <h1 className='text-5xl text-black-900'>What will your website be for?</h1>
                    </div>
                    <div className='basis-1/3 flex flex-col h-full justify-between'>
                        {pageCategories.map((category, index) => <div key={index} onClick={() => setSelectedCategory(category)} className={(selectedCategory === category) ? "p-4 border-2 border-primary rounded cursor-pointer text-primary text-4xl" : "p-4 border-2 border-black-100 rounded cursor-pointer text-black-900 hover:border-black-900 text-4xl"}>{category}</div>)}
                        <div onClick={() => setPageNumber(current => current + 1)} className={(selectedCategory !== "") ? 'text-4xl w-full text-black-100 text-center bg-primary rounded-md p-4 cursor-pointer' : 'hidden'}>Next</div>
                    </div>
                </div>     
            );
    
        case 3: 
            return (
                <div className='w-full h-full flex flex-col items-center p-24 text-black-900'>
                    <div className="flex flex-row h-full w-full">
                        <div className="flex basis-1/3 h-full items-center w-full justify-start"><img src={Arrow} className="w-24 h-24 rounded-full cursor-pointer bg-primary p-3" /></div>
                        <TemplatePage selectedCategory={selectedCategory}/>
                        <div className="flex basis-1/3 h-full items-center w-full justify-end"><img src={Arrow} className="w-24 h-24 rounded-full cursor-pointer rotate-180 bg-primary p-3"/></div>
                    </div>
                    <div onClick={() => setPageNumber(current => current + 1)} className='text-4xl w-1/3 text-black-100 text-center bg-primary rounded-md p-4 cursor-pointer'>Next</div>

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
                            <div className='flex flex-col justify-between'>
                                {colorSchemes.map((colorScheme, index) => (index < 5) ? <ColorScheme key={index} selectedIndex={selectedIndex} index={index} setIndex={setSelectedIndex} colorSchemes={colorSchemes} setScheme={setSelectedColorScheme} key={index} theme={colorScheme.theme} colors={colorScheme.colors}/> : <></>)}
                                <button onClick={() => setPageNumber(current => current + 1)} className={(selectedCategory !== "") ? 'text-4xl w-full text-black-100 text-center bg-primary rounded-md p-4 cursor-pointer' : 'hidden'}>Next</button>
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

                    <button onClick={createProject} className={isLoading ? "hidden" : 'text-4xl w-1/2 text-black-100 text-center bg-primary rounded-md p-4 cursor-pointer'}>Create Project</button>
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