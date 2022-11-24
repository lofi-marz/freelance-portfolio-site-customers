import Head from 'next/head';
import Image from 'next/image';
import me from './me.jpg';
import clsx from 'clsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { useDarkModeContext } from '@/components/DarkModeContextProvider';
import { SlideInText } from '@/components/SlideInText';
import { text, title } from '../fonts';
import { SocialsDesktop } from '@/components/Socials';
//const title = Poppins({ weight: ['600', '700', '800', '900'] });

const headingVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

const underlineVariants: Variants = {
    hidden: { width: '0%' },
    visible: { width: '100%', transition: { duration: 1, ease: 'easeInOut' } },
};

function Title() {
    return (
        <motion.div
            transition={{ staggerChildren: 0.2 }}
            variants={contentVariants}>
            <h1
                className={clsx(
                    'flex flex-col gap-2  text-8xl font-bold',
                    title.className
                )}>
                <SlideInText>
                    Hi, <br />
                    I&apos;m
                    <br />
                    Omari.
                </SlideInText>
            </h1>
            <div className="h-3 w-3/5">
                <motion.div
                    className="h-full w-full bg-red-400"
                    variants={underlineVariants}></motion.div>
            </div>
        </motion.div>
    );
}

function VideoBackground() {
    return (
        <div className="relative h-56 w-full overflow-clip md:h-full">
            <video
                className="h-full w-full object-cover brightness-[.8] saturate-[.8]"
                autoPlay
                loop
                muted>
                <source src="/loop.mp4" type="video/mp4" />
            </video>
        </div>
    );
}

function CallToAction() {
    return (
        <motion.a
            className={clsx(
                'mx-auto rounded bg-red-400 px-10 py-3 text-center font-bold text-white md:mx-0',
                title.className
            )}
            href="https://www.linkedin.com/in/omari-thompson-edwards-b7307b195"
            target="_blank"
            variants={fadeVariants}>
            Get in touch.
        </motion.a>
    );
}

const contentVariants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.3 } },
};

const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
};

function Content() {
    return (
        <motion.main
            className={clsx(
                'flex h-full w-full flex-col items-center justify-center gap-10 px-10 text-stone-700 dark:bg-stone-900 dark:text-white md:w-1/2 md:max-w-2xl md:p-10',
                text.className
            )}
            layoutId="intro-section"
            layout
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}>
            <div className="relative flex h-full w-full flex-col items-start justify-evenly">
                <Title />
                <motion.p
                    className="w-full text-center text-2xl text-stone-100 md:text-start"
                    variants={fadeVariants}>
                    Nottingham-based freelance web design and development.
                </motion.p>
                <CallToAction />
                <SocialsDesktop />
            </div>
        </motion.main>
    );
}

export default function Home() {
    const [loading, setLoading] = useState(true);
    useEffect(() => console.log('Loading:', loading), [loading]);
    const darkMode = useDarkModeContext();
    const theme = darkMode === 'dark' ? darkMode : '';

    return (
        <motion.div
            className={clsx(
                'relative flex h-screen w-full flex-col flex-col items-center justify-center md:flex-row-reverse',
                theme
            )}>
            <Head>
                <title>Omari</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="fixed top-2 right-2 z-20 w-16">
                <DarkModeToggle />
            </div>
            <VideoBackground />
            {loading ? (
                <LoadingScreen onEnd={() => setLoading(false)} />
            ) : (
                <AnimatePresence mode="wait">
                    <Fragment key={darkMode}>
                        <Content />
                    </Fragment>
                </AnimatePresence>
            )}
        </motion.div>
    );
}

function Me() {
    return (
        <div className="mx-auto aspect-[2/1] w-1/2 overflow-visible">
            <Image
                className="mx-auto w-full rounded drop-shadow-lg"
                src={me}
                alt="me"
            />
        </div>
    );
}
