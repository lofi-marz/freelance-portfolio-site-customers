'use client';
import clsx from 'clsx';

import { FaBars } from 'react-icons/fa';
import {
    MouseEventHandler,
    PropsWithChildren,
    useReducer,
    useState,
} from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { motion } from 'framer-motion';

import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { NavLogo } from './NavLogo';
import { CTA } from '@/components/Button';
import Link from 'next/link';
import { PropsWithClassName } from 'types';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';
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
    Home: '/#home',
    About: '/#about',
    Services: '/#services',
    'Contact Us': '/#contact',
};

function MenuIcon({ onClick }: { onClick: MouseEventHandler }) {
    return (
        <button className="md:hidden" onClick={onClick}>
            <FaBars />
        </button>
    );
}

const navVariants = cva(
    'fixed top-0 z-40 flex w-full flex-row items-center justify-between gap-8 px-6 font-title text-sm font-medium transition-all duration-500 md:px-9',
    {
        variants: {
            colour: {
                default: 'text-theme-invert',
                mono: '',
            },
        },
        defaultVariants: {
            colour: 'default',
        },
    }
);

type NavVariants = VariantProps<typeof navVariants>;
type NavProps = PropsWithChildren & PropsWithClassName & NavVariants;

export function Nav({ className, colour }: NavProps) {
    const [atPageStart, setAtPageStart] = useState(true);

    const { scrollY } = useScroll();
    const desktop = useMediaQuery('md');
    useMotionValueEvent(scrollY, 'change', (v) => {
        setAtPageStart(v < 600);
    });

    const desktopHeight = atPageStart ? '6rem' : '4rem';
    const mobileHeight = '4rem';
    const height = desktop ? desktopHeight : mobileHeight;
    return (
        <motion.nav
            className={cn(navVariants({ className, colour }))}
            style={{ height }}
            layout>
            <NavLogo className="mr-[5%] " />
            <div className="w-full" />
            <ul className="absolute left-0 -z-10 mx-auto hidden w-full  items-center justify-center gap-4 md:flex">
                {Object.entries(links).map(([label, href]) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className="font-semibold tracking-tight underline-offset-0 saturate-0 transition-all ease-out hover:underline hover:underline-offset-4">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
            <DarkModeToggle />
            <CTA
                className="hidden md:flex"
                size={atPageStart ? 'lg' : 'default'}
            />
        </motion.nav>
    );
}

export function NavSpacer() {
    return <div className="h-16 w-full md:h-24"></div>;
}
