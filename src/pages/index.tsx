import Head from 'next/head';
import {
    Inter,
    Poppins,
    Rubik,
    Merriweather,
    IBM_Plex_Sans,
} from '@next/font/google';
import Image from 'next/image';
import me from './me.jpg';
import clsx from 'clsx';
import {
    FaAt,
    FaBook,
    FaGithub,
    FaInstagram,
    FaLink,
    FaLinkedin,
} from 'react-icons/fa';
import { AnimatedIconLink, IconLink } from '@/components/IconLink';
import {
    AnimatePresence,
    motion,
    useAnimationControls,
    Variants,
} from 'framer-motion';
import { useDarkMode } from '../hooks/useDarkMode';
import { Fragment, useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import {
    DarkModeContextProvider,
    useDarkModeContext,
} from '@/components/DarkModeContextProvider';
//const title = Poppins({ weight: ['600', '700', '800', '900'] });
const title = IBM_Plex_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});
const text = Inter({
    subsets: ['latin'],
});

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
                    'flex flex-col gap-2 text-8xl font-bold',
                    title.className
                )}>
                <motion.div variants={headingVariants}>Hi,</motion.div>
                <motion.div variants={headingVariants}>
                    I&apos;m Omari.
                </motion.div>
            </h1>
            <div className="h-3 w-3/5">
                <motion.div
                    className="h-full w-full bg-red-400"
                    variants={underlineVariants}></motion.div>
            </div>
        </motion.div>
    );
}

function SocialsDesktop() {
    const [selectedSocial, setSelectedSocial] = useState<number | null>(null);
    const onEnter = (index: number | null) => {
        console.log(index);
        setSelectedSocial(index);
    };

    return (
        <div
            className="flex w-full flex-col items-center justify-center gap-2 rounded bg-white text-stone-800 dark:bg-stone-800 dark:text-white"
            onMouseLeave={() => setSelectedSocial(null)}>
            <AnimatedIconLink
                href="Omari Thompson-Edwards CV.pdf"
                index={selectedSocial}
                onEnter={onEnter}
                social={0}>
                <FaBook />
            </AnimatedIconLink>
            <AnimatedIconLink
                href="https://www.linkedin.com/in/omari-thompson-edwards-b7307b195"
                index={selectedSocial}
                onEnter={onEnter}
                social={1}>
                <FaLinkedin />
            </AnimatedIconLink>
            <AnimatedIconLink
                href="https://github.com/lofi-marz"
                index={selectedSocial}
                onEnter={onEnter}
                social={2}>
                <FaGithub />
            </AnimatedIconLink>
            <AnimatedIconLink
                href="mailto:othompsonedwards@gmail.com?subject=I%20need%20a%20website!"
                index={selectedSocial}
                onEnter={onEnter}
                social={3}>
                <FaAt />
            </AnimatedIconLink>
        </div>
    );
}

function SocialsMobile() {
    return (
        <div className="flex w-full items-center justify-center gap-2 rounded md:flex-col md:bg-red-400 md:text-white">
            <IconLink href="mailto:othompsonedwards@gmail.com">
                <FaBook />
            </IconLink>
            <IconLink href="https://www.linkedin.com/in/omari-thompson-edwards-b7307b195">
                <FaLinkedin />
            </IconLink>
            <IconLink href="https://github.com/lofi-marz">
                <FaGithub />
            </IconLink>
            <IconLink href="mailto:othompsonedwards@gmail.com">
                <FaAt />
            </IconLink>
        </div>
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
            <div className="absolute right-0 top-0 z-10 mr-4 hidden h-full items-center justify-center md:flex">
                <SocialsDesktop />
            </div>
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
            <div className="flex h-full w-full flex-col items-start justify-center gap-10">
                <Title />
                <motion.p
                    className="w-full text-center opacity-90 dark:opacity-100 md:text-start"
                    variants={fadeVariants}>
                    Nottingham-based freelance web design and development. I
                    specialise in bespoke sites, from small-scale landing pages,
                    to larger web apps.
                </motion.p>
                <CallToAction />
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
                'relative flex h-screen w-full flex-col items-center justify-center md:flex-row',
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
