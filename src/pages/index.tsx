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
import { IconLink } from '@/components/IconLink';
import { motion, Variants } from 'framer-motion';
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
    hidden: { width: '10%' },
    visible: { width: '100%' },
};

function Title() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}>
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
                    className="h-full w-full bg-red-400 md:mx-auto"
                    variants={underlineVariants}></motion.div>
            </div>
        </motion.div>
    );
}

function Socials() {
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
        <div className="relative h-full w-full">
            <video
                className="w-full object-cover brightness-[.8] saturate-[.8] md:h-full"
                autoPlay
                loop
                muted>
                <source src="/loop.mp4" type="video/mp4" />
            </video>
            <div className="absolute right-0 top-0 z-10 mr-4 flex h-full items-center justify-center md:hidden">
                <Socials />
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <div className="dark flex h-screen w-full flex-col items-center justify-center md:flex-row">
            <Head>
                <title>Hello World!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-1/2 w-full grow overflow-clip md:h-screen md:w-1/2">
                <VideoBackground />
            </div>
            <main
                className={clsx(
                    'flex h-full max-w-2xl flex-col items-center justify-center gap-10 p-10 text-stone-700 dark:bg-stone-900 dark:text-white md:w-1/2',
                    text.className
                )}>
                <div className="flex h-full w-full flex-col items-start justify-center gap-10">
                    <Title />
                    <p className="w-full text-center opacity-90 dark:opacity-100 md:text-start">
                        Nottingham-based freelance web design and development. I
                        specialise in bespoke sites, from small-scale landing
                        pages, to larger web apps.
                    </p>
                    <button
                        className={clsx(
                            'mx-auto rounded bg-red-400 px-10 py-3 text-center font-bold text-white md:mx-0',
                            title.className
                        )}>
                        Get in touch.
                    </button>
                </div>
            </main>
        </div>
    );
}

function LoadingScreen() {}

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
