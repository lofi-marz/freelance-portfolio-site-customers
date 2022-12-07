import { useEffect, useState } from 'react';
import { Theme } from '../types';

export function useDarkMode() {
    const [darkMode, setDarkMode] = useState<Theme | null>(null);
    const [storedMode, setStoredMode] = useState<Theme | null>(null);
    useEffect(() => {
        const stored = localStorage.getItem('theme') as Theme; //TODO: Fix this to use JSON
        if (stored) {
            setDarkMode(stored);
        } else {
            setDarkMode(
                window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light'
            );
        }
    }, []);

    useEffect(() => {
        console.log('Setting stored mode');
        if (storedMode) {
            setDarkMode(storedMode);
            localStorage.setItem('theme', storedMode);
        } else {
            //localStorage.removeItem('theme');
        }
    }, [storedMode]);

    useEffect(() => {
        console.log(darkMode);
    }, [darkMode]);
    return [darkMode, setStoredMode] as const;
}
