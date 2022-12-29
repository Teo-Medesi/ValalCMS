import React, { createContext } from 'react'
import navLogo from "./assets/images/directionsWhite.png"
import headerLogo from "./assets/images/imageWhite.png"
import footerLogo from "./assets/images/footerIconWhite.png"
import SettingsWidget from './components/project/SettingsWidget'
import Document from "./assets/images/siteIdentity.png"
import TypographyLogo from "./assets/images/typography.png"
import ThemeLogo from "./assets/images/paint.png"
import SideMenuLogo from "./assets/images/menu.png"
import BlogLogo from "./assets/images/blog.png"
import ForumLogo from "./assets/images/forum.png"
import { useState } from 'react';
import SiteIdentity from './components/project/settings/SiteIdentity'
import Footer from "./components/project/settings/Footer"
import Header from "./components/project/settings/Header"
import Themes from "./components/project/settings/Themes"
import Navbar from "./components/project/settings/Navbar"
import Sidebar from "./components/project/settings/Sidebar"
import Typography from "./components/project/settings/Typography"
import Forum from "./components/project/settings/Forum"
import Blog from "./components/project/settings/Blog"


export const SettingsContext = createContext();

const Settings = ({setSettingsComponent, settingsComponent}) => {
    if (settingsComponent === "") 
    {
        return (
            <SettingsContext.Provider value={setSettingsComponent}>
                <div>
                    <SettingsWidget text="Site Identity" logo={Document} element="SiteIdentity"/>
                    <SettingsWidget text="Typography" logo={TypographyLogo} element="Typography"/>
                    <SettingsWidget text="Themes" logo={ThemeLogo} element="Themes"/>
                    <SettingsWidget text="Navbar" logo={navLogo} element="Navbar"/>
                    <SettingsWidget text="Header" logo={headerLogo} element="Header"/>
                    <SettingsWidget text="Blog" logo={BlogLogo} element="Blog"/>
                    <SettingsWidget text="Sidebar" logo={SideMenuLogo} element="Sidebar"/>
                    <SettingsWidget text="Forum" logo={ForumLogo} element="Forum"/>
                    <SettingsWidget text="Footer" logo={footerLogo} element="Footer"/>
                </div>
            </SettingsContext.Provider>
      )
    }
    else {
        switch (settingsComponent) {
            case "SiteIdentity":
                return <SiteIdentity />
            case "Typography":
                return <Typography />
            case "Themes": 
                return <Themes />
            case "Navbar":
                return <Navbar />
            case "Sidebar":
                return <Sidebar />
            case "Header": 
                return <Header />
            case "Footer":
                return <Footer />
            case "Forum":
                return <Forum />
            case "Blog": 
                return <Blog />
        }
    }
}

export default Settings