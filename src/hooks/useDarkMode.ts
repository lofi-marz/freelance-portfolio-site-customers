import { useEffect, useState } from 'react';

export function useDarkMode() {
    const [darkMode, setDarkMode] = useState('');
    const [storedMode, setStoredMode] = useState<string | null>('');
    useEffect(() => {
        const stored = localStorage.getItem('theme');
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
        if (storedMode) {
            setDarkMode(storedMode);
            localStorage.setItem('theme', storedMode);
        } else {
            localStorage.removeItem('theme');
        }
    }, [storedMode]);

    useEffect(() => {
        console.log(darkMode);
    }, [darkMode]);
    return [darkMode, setStoredMode] as const;
}
