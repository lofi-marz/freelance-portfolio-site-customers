import {
    AnimatePresence,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useTransform,
    Variants,
} from 'framer-motion';
import clsx from 'clsx';
import { title } from '../../../fonts';
import { SocialsDesktop } from '@/components/sections/intro/Socials';
import { WithChildrenProps } from '../../../types';
import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import {
    FaArrowDown,
    FaArrowLeft,
    FaArrowUp,
    FaChevronDown,
    FaCompactDisc,
    FaHandPointer,
    FaMousePointer,
} from 'react-icons/fa';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { SlideInText } from '@/components/SlideInText';
import { useRef, useState } from 'react';
import React from 'react';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { TARGET_AUDIENCE } from '../../../env';
import { setState } from 'jest-circus';
import { NavSpacer } from '@/components/Nav';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import Image from 'next/image';
import me from './me-transparent.png';
const ContainerVariants: Variants = {
    hide: { opacity: 0, height: '100vh' },
    show: {
        opacity: 1,
        height: '100vh',
        transition: {
            ease: 'easeOut',
            delayChildren: 0.5,
            staggerChildren: 1,
        },
    },
    exit: { opacity: 0 },
};

const SubtitleVariants: Variants = {
    hide: {
        opacity: 0,
        y: -10,
    },
    show: { opacity: 1, y: 0, transition: { ease: 'easeOut' } },
};

const IntroTextVariants: Variants = {
    hide: { opacity: 0, transition: { duration: 0.5 } },
    show: { opacity: 1, transition: { duration: 1 } },
};

function SideSpacer({ children }: Partial<WithChildrenProps>) {
    return (
        <div className="flex h-full w-16 items-center justify-center overflow-clip truncate text-xs font-bold uppercase">
            {children}
        </div>
    );
}

const subtitle =
    TARGET_AUDIENCE === 'freelance'
        ? 'freelance developer'
        : 'web developer + student';

function IntroText() {
    const sm = useMediaQuery('sm');

    return (
        <motion.div className="themed-bg-invert themed-text-invert relative flex h-full w-full flex-grow items-center justify-start overflow-clip py-12">
            <motion.div className="flex w-full flex-col items-start justify-center p-4 text-3xl font-bold sm:p-10 sm:text-4xl">
                <motion.div
                    style={{ writingMode: sm ? 'inherit' : 'vertical-rl' }}
                    variants={IntroTextVariants}>
                    hi, I&apos;m omari
                </motion.div>
                <motion.div
                    className="hide max-w-sm text-primary md:block"
                    variants={IntroTextVariants}>
                    {subtitle}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

const trackVariants: Variants = {
    hide: { opacity: 0, height: 0, transition: { delay: 5 } },
    show: { opacity: 1, height: 'auto' },
};
function CurrentlyPlaying() {
    const currentlyPlaying = useCurrentlyPlayingContext()!;
    const [trackShown, setTrackShown] = useState(false);
    const showTrack = () => setTrackShown(true);
    const hideTrack = () => setTrackShown(false);
    const isDesktop = useMediaQuery('md');
    return (
        <motion.div
            className="flex h-full w-full rotate-180 flex-row items-center justify-center gap-2"
            style={{ writingMode: 'vertical-rl' }}
            onHoverEnd={() => hideTrack()}
            onTapStart={() => showTrack()}
            onTap={(e) => hideTrack()}
            layout>
            <motion.div
                animate={{
                    rotate: [0, 60, 120, 180, 240, 300, 360],
                    opacity: [0.9, 1, 0.9, 1, 0.9, 0.9],
                }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 5,
                }}
                onHoverStart={() => showTrack()}
                layout>
                <FaCompactDisc />
            </motion.div>
            <AnimatePresence>
                {trackShown && (
                    <motion.div
                        className="flex w-full flex-row items-center justify-center gap-2"
                        key="currently-playing"
                        variants={trackVariants}
                        initial="hide"
                        animate="show"
                        exit="hide"
                        layout>
                        Currently Listening
                        {isDesktop ? (
                            <a
                                href={
                                    currentlyPlaying.item.external_urls.spotify
                                }
                                target="_blank"
                                className="transition-all hover:text-primary hover:underline"
                                rel="noreferrer">
                                {currentlyPlaying.item.name}
                            </a>
                        ) : (
                            currentlyPlaying.item.name
                        )}
                        ({currentlyPlaying.item.artists[0].name})
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
/* eslint-disable-next-line */
const lines = ["Hi, I'm Omari.", 'I create creative experiences with code.'];

export function Intro() {
    return (
        <motion.section className="themed-bg-invert themed-text sticky top-0 flex h-[100vh] flex-col items-center justify-center gap-12 px-8 pb-0 pb-8 font-title md:min-h-[150vh] md:justify-start md:px-36">
            <div className="themed-bg absolute top-0 h-full w-full overflow-clip rounded-b-[4rem] md:h-screen">
                <div className="absolute bottom-0 aspect-square w-full md:hidden">
                    <Image
                        src={me}
                        alt="Picture of me"
                        className="object-contain opacity-[.4]  brightness-[1.2] grayscale"
                        fill
                    />
                </div>
            </div>
            <NavSpacer />
            <header className="z-10 flex grow flex-col items-center justify-center text-center text-4xl font-semibold leading-tight md:items-start md:justify-start md:text-start md:text-7xl">
                <div>
                    Hi, I'm <span className="text-primary">Omari</span>.
                </div>
                <div>I build bespoke websites for small businesses.</div>
                <div className="py-8 text-xl font-normal leading-tight md:text-4xl md:font-light">
                    No page builders or templates - I create 100% hand-coded
                    websites with personalised results.
                </div>
                <a
                    className="card-solid-invert hover:card-primary w-full py-4 text-2xl font-normal md:w-auto md:px-12 md:py-6"
                    href="#contact">
                    Let's chat
                </a>
                <div className="aspect-square w-full" />
            </header>
        </motion.section>
    );
}
