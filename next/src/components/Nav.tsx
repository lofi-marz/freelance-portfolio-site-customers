import { DarkModeToggle } from '@/components/DarkModeToggle';
import clsx from 'clsx';
import { title } from 'fonts';
import { WithChildrenProps } from '../types';
import {
    FaBars,
    FaCross,
    FaHamburger,
    FaMousePointer,
    FaTimes,
    FaWindowClose,
} from 'react-icons/fa';
import React, { MouseEventHandler, useReducer, useRef, useState } from 'react';
import {
    AnimatePresence,
    useMotionValueEvent,
    useScroll,
    useTransform,
} from 'framer-motion';
import { motion } from 'framer-motion';
import { Property } from 'csstype';
import { useMediaQuery } from '../hooks/useMediaQuery';
const CircleFillVariants = {
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
export function NavLink({
    name,
    href,
    onClick,
}: {
    name: string;
    href: string;
    onClick: MouseEventHandler;
}) {
    return (
        <a
            className="last-of-type:card-solid-invert last-of-type:mt-4 last-of-type:py-4  last-of-type:text-center"
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={onClick}>
            {name}
        </a>
    );
}
const links = {
    LinkedIn: 'https://www.linkedin.com/in/omari-thompson-edwards-b7307b195',
    Email: 'mailto:othompsonedwards@gmail.com',
    GitHub: 'https://github.com/lofi-marz',
    UpWork: 'https://www.upwork.com/freelancers/~019c194b11d5dfabbc',
    CV: 'Omari Thompson-Edwards CV.pdf',
};

function NavLogo() {
    return (
        <motion.div
            className="flex flex-row items-center justify-center gap-1 lowercase tracking-wide"
            layout>
            <FaMousePointer className="text-primary" />{' '}
            <span className="md:hidden">Ln</span>
            <span className="hidden md:inline">leon web design</span>
        </motion.div>
    );
}

function NavMobileMenu({
    custom,
    onClick,
    height,
}: {
    custom: [number, number];
    onClick: MouseEventHandler;
    height: Property.Height;
}) {
    return (
        <motion.div className="themed-text-invert absolute right-0 top-0 z-50 flex h-screen w-full flex-col text-3xl font-bold">
            <motion.div
                className=" flex w-full flex-col gap-4 bg-primary p-12 "
                variants={CircleFillVariants}
                custom={custom}
                initial="hide"
                animate="show"
                exit="exit">
                {Object.entries(links).map(([name, href]) => (
                    <NavLink
                        key={name}
                        name={name}
                        href={href}
                        onClick={onClick}
                    />
                ))}
                <NavLink
                    name="Get in touch."
                    href="#contact"
                    onClick={onClick}
                />
                <div
                    className="absolute right-0 top-0 flex items-center justify-center px-6"
                    style={{
                        height,
                    }}>
                    <button onClick={onClick}>
                        <FaTimes />
                    </button>
                </div>
            </motion.div>
            <div className="w-full grow" onClick={onClick} />
        </motion.div>
    );
}

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
        setAtPageStart(v < 20);
    });

    const desktopHeight = atPageStart ? '9rem' : '6rem';
    const mobileHeight = '4rem';
    const height = desktop ? desktopHeight : mobileHeight;
    return (
        <motion.nav
            className={clsx(
                'fixed top-0 z-40 flex w-full flex-row items-center justify-between px-6 font-title text-2xl transition-all duration-500 md:px-24 md:text-xl',
                atPageStart
                    ? 'themed-text themed-bg'
                    : 'themed-text-invert themed-bg-invert shadow'
            )}
            style={{ height }}
            layout>
            <NavLogo />
            <motion.div
                className="hidden h-full grow items-center justify-end gap-20 font-normal md:flex"
                layout>
                <motion.a
                    className="hover:card-primary rounded-full  border-2 border-black px-8 py-3 transition-all hover:border-primary"
                    layout
                    href="#contact">
                    let's chat
                </motion.a>
            </motion.div>
            <MenuIcon
                onClick={(e) => {
                    console.log(e.currentTarget.getBoundingClientRect().width);
                    setPos([
                        e.currentTarget.getBoundingClientRect().x,
                        e.currentTarget.getBoundingClientRect().y,
                    ]);
                    toggleMenuIsOpen();
                }}
            />
            <AnimatePresence>
                {menuIsOpen && (
                    <NavMobileMenu
                        custom={pos}
                        onClick={toggleMenuIsOpen}
                        height={height}
                    />
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

export function NavSpacer() {
    return <div className="h-16 w-full md:h-36"></div>;
}
