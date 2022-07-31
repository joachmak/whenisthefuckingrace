import { useState, useEffect } from "react";

function getWindowDimensions() {
    const { innerWidth: width } = window;
    return width;
}

export default function useWindowDimensions() {
    const [screenSize, setScreenSize] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setScreenSize(getWindowDimensions());
        }
        window.addEventListener("resize", handleResize); // update value on resize
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return screenSize;
}
