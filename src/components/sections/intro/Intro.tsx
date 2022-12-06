import { motion, useScroll, useTransform } from 'framer-motion';
import clsx from 'clsx';
import { title } from '../../../fonts';
import { SocialsDesktop } from '@/components/sections/intro/Socials';
import { WithChildrenProps } from '../../../types';
import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';

function SideSpacer({ children }: Partial<WithChildrenProps>) {
    return (
        <div className="flex h-full w-16 items-center justify-center overflow-clip text-sm font-bold uppercase">
            {children}
        </div>
    );
}

function IntroText() {
    return (
        <motion.div className="themed-bg-invert themed-text-invert relative flex h-full w-full flex-grow items-center justify-start py-12">
            <motion.div className="flex w-full flex-col items-start justify-center p-10 text-5xl font-bold">
                <h1>hi, I&apos;m omari</h1>
                <h2 className="text-5xl text-primary">
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
                            className="rotate-180"
                            style={{ writingMode: 'vertical-rl' }}>
                            Currently Listening - {currentlyPlaying.item.name} -{' '}
                            {currentlyPlaying.item.artists[0].name}
                        </div>
                    )}
                </SideSpacer>
                <div className="flex h-full w-full flex-col items-start justify-start overflow-clip">
                    <motion.div
                        className="flex h-screen w-full flex-row items-start justify-center shadow"
                        layout>
                        <div className="relative h-full w-[90%] bg-primary text-dark-50">
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
