import { motion, useScroll, useTransform } from 'framer-motion';
import clsx from 'clsx';
import { title } from '../../../fonts';
import { SocialsDesktop } from '@/components/sections/intro/Socials';
import { WithChildrenProps } from '../../../types';
import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import { FaCompactDisc } from 'react-icons/fa';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

function SideSpacer({ children }: Partial<WithChildrenProps>) {
    return (
        <div className="flex h-full w-16 items-center justify-center overflow-clip text-sm font-bold uppercase">
            {children}
        </div>
    );
}

function IntroText() {
    const sm = useMediaQuery('sm');
    return (
        <motion.div className="themed-bg-invert themed-text-invert relative flex h-full w-full flex-grow items-center justify-start py-12">
            <motion.div className="flex w-full flex-col items-start justify-center p-4 text-3xl font-bold sm:p-10 sm:text-5xl">
                <h1 style={{ writingMode: sm ? 'inherit' : 'vertical-rl' }}>
                    hi, I&apos;m omari
                </h1>
                <h2 className="hidden text-primary md:block">
                    web developer + student
                </h2>
            </motion.div>
        </motion.div>
    );
}

export function Intro() {
    const { scrollYProgress } = useScroll();
    const currentlyPlaying = useCurrentlyPlayingContext();
    const height = useTransform(scrollYProgress, [0, 1], ['100vh', '30vh']);

    return (
        <section
            className={clsx(
                'themed-bg sticky top-0 flex h-[150vh] w-full flex-col items-center justify-start overflow-clip',
                title.className
            )}>
            <motion.div
                className="themed-bg relative sticky top-0 flex h-screen w-full items-center justify-center overflow-clip py-16"
                style={{ height }}>
                <SideSpacer>
                    {currentlyPlaying && (
                        <div
                            className="flex rotate-180 flex-row items-center justify-center gap-4"
                            style={{ writingMode: 'vertical-rl' }}>
                            <motion.div
                                animate={{
                                    rotate: [0, 60, 120, 180, 240, 300, 360],
                                    opacity: [0.9, 1, 0.9, 1, 0.9, 0.9],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    ease: 'linear',
                                    duration: 5,
                                }}>
                                <FaCompactDisc />
                            </motion.div>
                            Currently Listening
                            <a
                                href={
                                    currentlyPlaying.item.external_urls.spotify
                                }
                                target="_blank"
                                className="transition-all hover:underline"
                                rel="noreferrer">
                                {currentlyPlaying.item.name}
                            </a>
                            {currentlyPlaying.item.artists[0].name}
                        </div>
                    )}
                </SideSpacer>
                <div className="flex h-full w-full flex-col items-start justify-start overflow-clip">
                    <motion.div
                        className="flex h-screen w-full flex-row items-start justify-center shadow"
                        layout>
                        <div className="relative flex h-full w-[100%] items-center justify-end bg-primary text-dark-50 md:w-[100%]">
                            <SocialsDesktop />
                        </div>
                        <IntroText />
                    </motion.div>
                </div>
                <SideSpacer>
                    <div style={{ writingMode: 'vertical-rl' }}>
                        othompsonedwards@gmail.com
                    </div>
                </SideSpacer>
            </motion.div>
        </section>
    );
}
