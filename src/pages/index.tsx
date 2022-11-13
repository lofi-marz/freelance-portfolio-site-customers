import Head from 'next/head';
import { Inter, Poppins, Rubik, Merriweather } from '@next/font/google';

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
//const title = Poppins({ weight: ['600', '700', '800', '900'] });
const title = Rubik();
const text = Inter();

function Title() {
    return (
        <div>
            <h1
                className={clsx(
                    'text-5xl font-extrabold md:text-center',
                    title.className
                )}>
                Omari <br /> Thompson
            </h1>
            <div className="h-2 w-3/5 bg-red-400 md:mx-auto"></div>
        </div>
    );
}

function Socials() {
    return (
        <div className="flex w-full items-center justify-center gap-2">
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
        <div className="h-full w-full">
            <video
                className="w-full object-cover brightness-[.8] saturate-50 md:h-full"
                autoPlay
                loop
                muted>
                <source src="/loop.mp4" type="video/mp4" />
            </video>
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
                    'flex h-full max-w-2xl flex-col items-start justify-start gap-10 p-10 text-[#505462] md:w-1/2 md:items-center md:justify-center',
                    text.className
                )}>
                <Title />
                <p className="mx-auto text-center opacity-90 lg:w-2/3">
                    Nottingham-based freelance web design and development. I
                    specialise in bespoke sites, from small-scale landing pages,
                    to larger web apps.
                </p>
                <button className="mx-auto rounded bg-red-400 px-10 py-3 text-center text-white">
                    Get in touch
                </button>
                <div className="mx-auto w-2/3 ">
                    <Socials />
                </div>
            </main>
        </div>
    );
}
