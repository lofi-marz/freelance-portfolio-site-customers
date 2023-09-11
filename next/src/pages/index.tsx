import Head from 'next/head';
import Image from 'next/image';
import me from '../me.png';
import clsx from 'clsx';
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import { createContext, Fragment, useEffect, useRef, useState } from 'react';
import { LoadingScreen } from '@/components/sections/LoadingScreen';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { useDarkModeContext } from '@/components/DarkModeContextProvider';
import { SlideInText } from '@/components/SlideInText';
import { body, title } from '../fonts';
import { SocialsDesktop } from '@/components/sections/intro/Socials';
import { IoMdLeaf } from 'react-icons/io';
import { FaArrowDown, FaInstagram } from 'react-icons/fa';
import { FaAt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { About } from '@/components/sections/about/About';
import { CallToAction } from '@/components/sections/intro/CallToAction';
import { Intro } from '@/components/sections/intro';
import {
    CurrentlyPlayingContextProvider,
    Nav,
    NavSpacer,
} from '@/components/index';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import {
    GetCurrentlyPlayingResponse,
    getCurrentlyPlayingTrack,
    getSpotifyProps,
} from '../utils/spotify';
import {
    AboutContent,
    getStrapiContent,
    GlobalContent,
    ProjectContent,
    TestimonialContent,
} from '../utils/strapi';
import { StrapiContentContextProvider } from '@/components/StrapiContextProvider';
import { Projects } from '@/components/sections/projects';
import qs from 'qs';
import { Contact } from '@/components/sections/contact';
import theme from '../../tailwind.config';
import { WhatIDo } from '@/components/sections/whatido';
import { Bespoke } from '@/components/sections/bespoke';
import { Ticker } from '@/components/Ticker';
import { Testimonials } from '@/components/sections/testimonials/Testimonials';
//const title = Poppins({ weight: ['600', '700', '800', '900'] });

const headingVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

const underlineVariants: Variants = {
    hidden: { width: '0%' },
    visible: { width: '100%', transition: { duration: 1, ease: 'easeInOut' } },
};

const dark = theme.theme.extend.colors.black as string;
const light = theme.theme.extend.colors.light as string;

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
                    className="h-full w-full bg-primary"
                    variants={underlineVariants}></motion.div>
            </div>
        </motion.div>
    );
}

function VideoBackground() {
    return (
        <div className="relative flex h-56 w-full items-center justify-center overflow-clip md:h-full">
            <video
                className="h-full w-full object-cover brightness-[.6] saturate-[.6]"
                autoPlay
                loop
                muted>
                <source src="/video.mp4" type="video/mp4" />
            </video>
            <SocialsDesktop />
        </div>
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
                'themed-bg themed-text flex h-full w-full flex-col items-center justify-center gap-10 bg-light px-10 md:w-1/2 md:max-w-2xl md:p-10',
                title.className
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
                    className="w-full text-center text-2xl text-black dark:text-light md:text-start"
                    variants={fadeVariants}>
                    Nottingham-based freelance web design and development.
                </motion.p>
                <CallToAction />
            </div>
        </motion.main>
    );
}

type HomeProps = {
    spotify: { currentlyPlaying: GetCurrentlyPlayingResponse };
    content: GlobalContent;
};

export default function Home({ content }: HomeProps) {
    const ref = useRef(null);

    const [loading, setLoading] = useState(true);
    useEffect(() => console.log('Loading:', loading), [loading]);
    const darkMode = useDarkModeContext();
    const theme = darkMode === 'dark' ? darkMode : 'light';

    if (content === undefined) return <div>Hi! Somethings gone wrong</div>;

    //TODO: Better error handling here
    return (
        <StrapiContentContextProvider strapiContent={content}>
            <motion.div
                className={clsx(
                    'relative flex min-h-screen w-full flex-col items-center justify-center',
                    theme,
                    title.variable,
                    body.variable
                )}
                id="home">
                <LoadingScreen onEnd={() => setLoading(false)} />

                <motion.div
                    key={theme + 'content'}
                    className="themed-bg themed-text relative w-full snap-y snap-mandatory">
                    <Nav />
                    <Intro />
                    <About />
                    <Ticker />
                    <WhatIDo />

                    <Bespoke />
                    <Projects />
                    <Testimonials />
                    <Contact />
                </motion.div>
            </motion.div>
        </StrapiContentContextProvider>
    );
}

export const getStaticProps: GetServerSideProps = async () => {
    const query = qs.stringify(
        {
            populate: '*',
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    //TODO: How do I scale this up for more data

    const [about = {}, projects = [], testimonials = []] = await Promise.all([
        //getSpotifyProps(),
        getStrapiContent<AboutContent>('about'),
        getStrapiContent<ProjectContent[]>('projects?' + query),
        getStrapiContent<TestimonialContent[]>('testimonials'),
    ]);

    return {
        props: { content: { about, projects, testimonials } },
    };
};
