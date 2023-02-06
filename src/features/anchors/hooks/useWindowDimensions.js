import { useState, useEffect } from "react";

const useWindowDimensions = () => {
    const getWindowDimensions = () => {
        const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
        return {
            windowWidth,
            windowHeight
        };
    }
    
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

export default useWindowDimensions