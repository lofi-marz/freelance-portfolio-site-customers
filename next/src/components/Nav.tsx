import clsx from 'clsx';

import { FaBars, FaMousePointer, FaTimes } from 'react-icons/fa';
import { MouseEventHandler, useReducer, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { motion } from 'framer-motion';

import { useMediaQuery } from '../hooks/useMediaQuery';
import { Dot } from './Dot';
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
            className="last-of-type:card-solid-invert card-primary hover:last-of-type:card-solid-invert hover:card-solid-invert rounded-full px-8 py-4 last-of-type:mt-4 last-of-type:text-center"
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={onClick}>
            {name}
        </a>
    );
}
const links = {
    Linkedin: 'https://www.linkedin.com/in/omari-thompson-edwards-b7307b195',
    Email: 'mailto:othompsonedwards@gmail.com',
    Github: 'https://github.com/lofi-marz',
    UpWork: 'https://www.upwork.com/freelancers/~019c194b11d5dfabbc',
    CV: 'Omari Thompson-Edwards CV.pdf',
};

function NavLogo() {
    return (
        <motion.div
            className="flex flex-row items-center justify-center gap-1 tracking-wide"
            layout>
            <FaMousePointer className="text-primary-500" />{' '}
            <span className="md:hidden">
                Ln
                <Dot />
            </span>
            <span className="heading hidden md:inline">
                leon
                <Dot />
            </span>
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
    height: string | number;
}) {
    return (
        <motion.div className="absolute right-0 top-0 z-50 flex h-screen w-full flex-col text-3xl text-light">
            <motion.div
                className="flex w-full flex-col gap-4 bg-primary-500  p-12 "
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
        setAtPageStart(v < 600);
    });

    const desktopHeight = atPageStart ? '6.5rem' : '6rem';
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
                    className="card-solid-invert hover:card-primary rounded-full border-2 border-dark px-8 py-3 transition-all hover:border-primary-500"
                    layout
                    href="#contact">
                    Let's chat
                    <Dot />
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
    return <div className="h-16 w-full md:h-24"></div>;
}
