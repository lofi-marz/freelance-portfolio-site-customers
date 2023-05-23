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
        setAtPageStart(v < 20);
    });

    return (
        <motion.nav
            className={clsx(
                ' fixed top-0 z-50 flex w-full flex-row items-center justify-between px-6 font-title text-2xl transition-all duration-500 md:px-24 md:text-xl',
                atPageStart
                    ? 'themed-text themed-bg'
                    : 'themed-text-invert themed-bg-invert shadow-md'
            )}
            style={{ height: atPageStart ? '9rem' : '4rem' }}
            layout>
            <motion.div
                className="flex flex-row items-center justify-center gap-1 lowercase tracking-wide"
                layout>
                <FaMousePointer className="text-primary" />{' '}
                <span className="md:hidden">Ln</span>
                <span className="hidden md:inline">leon web design</span>
            </motion.div>
            <motion.div
                className="hidden h-full grow items-center justify-end gap-20 font-normal md:flex"
                layout>
                {['services', 'work', 'me'].map((w) => (
                    <motion.div key={w} layout>
                        {w}
                    </motion.div>
                ))}
                <motion.a
                    className="hover:themed-bg-invert hover:themed-text-invert rounded-full border-2 border-black px-8 py-3 transition-all"
                    layout
                    href="#contact">
                    let's chat
                </motion.a>
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
