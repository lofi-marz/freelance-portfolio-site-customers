import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import {
    useDarkModeContext,
    useSetStoredModeContext,
} from '@/components/DarkModeContextProvider';
import { Theme } from '../types';

function toggleTheme(theme: Theme): Theme {
    if (theme === 'dark') return 'light';
    return 'dark';
}

export function DarkModeSpacer() {
    return <div className="aspect-[2/1] h-16 w-full"></div>;
}

export function DarkModeToggle({ className }: { className?: string }) {
    const darkMode = useDarkModeContext();
    const setStoredMode = useSetStoredModeContext();

    return (
        <motion.button
            layout
            className={clsx(
                'flex aspect-[2/1] w-full rounded-full bg-dark-50 p-1',
                className,
                darkMode === 'dark' ? 'justify-end' : 'justify-start'
            )}
            onClick={() => {
                setStoredMode(toggleTheme(darkMode));
            }}>
            <DarkModeIcon dark={darkMode === 'dark'} />
        </motion.button>
    );
}

function DarkModeIcon({ dark }: { dark: boolean }) {
    return (
        <motion.div
            className="flex aspect-square h-full flex-row items-center justify-center overflow-clip rounded-full bg-dark-50 p-1 text-dark-800"
            layout>
            <AnimatePresence mode="wait">
                <motion.div
                    key={dark ? 'dark' : 'light'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    {dark ? <FaMoon /> : <FaSun />}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
