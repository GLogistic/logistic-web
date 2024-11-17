'use client'

import { IWindowSize } from "@/interfaces/window-size.interface";
import { useEffect, useRef, useState } from "react";

export interface IResizeWindowResult {
    width: number;
    height: number;
    isMobile: boolean;
}

const initWindowSize: IWindowSize = {
    width: 0,
    height: 0,  
}

const initResizeWindowResultState: IResizeWindowResult = {
    width: initWindowSize.width,
    height: initWindowSize.height,
    isMobile: false,
}

export const useResizeWindow = (): IResizeWindowResult => {
    if (typeof window == 'undefined')
        return initResizeWindowResultState;

    const [windowSize, setWindowSize] = useState<IWindowSize>(initWindowSize);

    const setWindowSizeRef = useRef<(size: IWindowSize) => void>(setWindowSize);

    useEffect(() => {
        const resizeWindow = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setWindowSizeRef.current({ width, height });
        };

        window.addEventListener('resize', resizeWindow);

        resizeWindow();

        return () => {
            window.removeEventListener('resize', resizeWindow);
        }
    }, []);
    
    return {
        ...windowSize,
        isMobile: windowSize.width <= 768,
    }
};