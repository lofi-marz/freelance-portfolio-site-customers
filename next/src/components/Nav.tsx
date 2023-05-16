import { DarkModeToggle } from '@/components/DarkModeToggle';
import clsx from 'clsx';
import { title } from 'fonts';
import { WithChildrenProps } from '../types';
import { FaBars, FaHamburger, FaMousePointer } from 'react-icons/fa';
import React, { useState } from 'react';
import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';

export function NavLink({ children }: WithChildrenProps) {}

export function Nav() {
    const heights = ['h-24', 'h-12'];
    const { scrollY } = useScroll();
    const [atPageStart, setAtPageStart] = useState(true);
    useMotionValueEvent(scrollY, 'change', (v) => {
        setAtPageStart(v < 10);
    });

    return (
        <motion.nav
            className="themed-text fixed top-0 z-50 flex w-full flex-row items-center justify-between px-6 font-title text-2xl  md:px-24 md:text-xl"
            style={{ height: atPageStart ? '9rem' : '6rem' }}
            layout>
            <motion.div
                className="flex flex-row items-center justify-center gap-1 lowercase tracking-wide"
                layout>
                <FaMousePointer className="text-primary" />{' '}
                <span className="md:hidden">Ln</span>
                <span className="hidden md:inline">leon web design</span>
            </motion.div>
            <motion.div
                className="hidden h-full grow items-center justify-end gap-16 font-normal md:flex"
                layout>
                {['what I do', 'work', 'who am I'].map((w) => (
                    <motion.div key={w} layout>
                        {w}
                    </motion.div>
                ))}
                <motion.div
                    className="hover:themed-bg-invert hover:themed-text-invert rounded-full border-2 border-black px-8 py-3 transition-all"
                    layout>
                    let's chat
                </motion.div>
            </motion.div>
            <button className="md:hidden">
                <FaBars />
            </button>
        </motion.nav>
    );
}

export function NavSpacer() {
    return <div className="h-24 md:h-36"></div>;
}
