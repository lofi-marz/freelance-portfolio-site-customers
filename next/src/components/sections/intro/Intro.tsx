import {
    AnimatePresence,
    motion,
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
import { FaCompactDisc } from 'react-icons/fa';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { SlideInText } from '@/components/SlideInText';
import { useRef, useState } from 'react';
import React from 'react';
import { DarkModeToggle } from '@/components/DarkModeToggle';

const ContainerVariants: Variants = {
    hidden: { opacity: 0, height: '100vh' },
    visible: {
        opacity: 1,
        height: '100vh',
        transition: {
            ease: 'circOut',
            delayChildren: 0.5,
            staggerChildren: 1,
        },
    },
    exit: { opacity: 0 },
};

const IntroTextVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
};

function SideSpacer({ children }: Partial<WithChildrenProps>) {
    return (
        <div className="flex h-full w-16 items-center justify-center overflow-clip truncate text-xs font-bold uppercase">
            {children}
        </div>
    );
}

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
                    className="hidden max-w-sm text-primary md:block"
                    variants={IntroTextVariants}>
                    web developer + student
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

export function Intro() {
    const target = useRef(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ['start start', 'end end'],
    });
    const currentlyPlaying = useCurrentlyPlayingContext();
    const width = useTransform(scrollYProgress, [0, 0.75], ['100%', '0%']); //TODO:Figure this out
    useMotionValueEvent(width, 'change', (v) => {
        console.log('Progress:', v);
    });
    return (
        <section
            className={clsx(
                'themed-bg sticky flex h-[200vh] w-full flex-col items-center justify-start overflow-clip',
                title.className
            )}
            ref={target}>
            <motion.div
                className="themed-bg sticky top-0 flex h-screen w-full items-center justify-center overflow-clip py-16"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={ContainerVariants}>
                <SideSpacer>
                    {currentlyPlaying && <CurrentlyPlaying />}
                </SideSpacer>
                <div className="flex h-full w-full flex-col items-start justify-start overflow-clip">
                    <motion.div
                        className="flex h-screen w-full flex-row items-start justify-center shadow"
                        layout>
                        <motion.div
                            className="relative flex h-full w-[100%] items-center justify-end bg-primary text-dark-50"
                            style={{ width }}>
                            <SocialsDesktop />
                        </motion.div>
                        <IntroText />
                    </motion.div>
                </div>
                <SideSpacer>
                    <DarkModeToggle />
                </SideSpacer>
            </motion.div>
        </section>
    );
}
