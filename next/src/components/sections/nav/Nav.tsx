import clsx from 'clsx';

import { FaBars } from 'react-icons/fa';
import { MouseEventHandler, useReducer, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { motion } from 'framer-motion';

import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { Dot } from '../../Dot';
import { NavMobileMenu } from './NavMobileMenu';
import { NavLogo } from './NavLogo';
export const CircleFillVariants = {
    show: ([x, y]: [number, number]) => ({
        clipPath: `circle(2000px at ${x}px ${y}px)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    hide: ([x, y]: [number, number]) => ({
        clipPath: `circle(30px at ${x}px ${y}px)`,
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    }),
    exit: ([x, y]: [number, number]) => ({
        clipPath: `circle(30px at ${x}px ${y}px)`,
        opacity: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
            delay: 0,
        },
    }),
};

export const links = {
    Linkedin: 'https://www.linkedin.com/in/omari-thompson-edwards-b7307b195',

    Github: 'https://github.com/lofi-marz',
    UpWork: 'https://www.upwork.com/freelancers/~019c194b11d5dfabbc',
};

function MenuIcon({ onClick }: { onClick: MouseEventHandler }) {
    return (
        <button className="md:hidden" onClick={onClick}>
            <FaBars />
        </button>
    );
}

export function Nav() {
    const [pos, setPos] = useState<[number, number]>([0, 0]);
    const [atPageStart, setAtPageStart] = useState(true);
    const [menuIsOpen, toggleMenuIsOpen] = useReducer((state) => !state, false);
    const { scrollY } = useScroll();
    const desktop = useMediaQuery('md');
    useMotionValueEvent(scrollY, 'change', (v) => {
        setAtPageStart(v < 600);
    });

    const desktopHeight = atPageStart ? '6.5rem' : '4rem';
    const mobileHeight = '4rem';
    const height = desktop ? desktopHeight : mobileHeight;
    return (
        <motion.nav
            className={clsx(
                'fixed top-0 z-40 flex w-full flex-row items-center justify-between px-6 font-title text-2xl transition-all duration-500 md:px-24 md:text-xl',
                atPageStart
                    ? 'bg-theme text-theme-invert'
                    : 'bg-theme-invert text-theme shadow'
            )}
            style={{ height }}
            layout>
            <NavLogo />
            <motion.div
                className="hidden h-full grow items-center justify-end gap-20 font-normal md:flex"
                layout>
                <motion.a
                    className="card-solid-invert hover:card-primary rounded-full border-2 border-dark px-8 py-3 transition-all hover:border-primary-400"
                    layout
                    href="#contact">
                    Let's chat
                    <Dot />
                </motion.a>
            </motion.div>
        </motion.nav>
    );
}

export function NavSpacer() {
    return <div className="h-16 w-full md:h-24"></div>;
}
