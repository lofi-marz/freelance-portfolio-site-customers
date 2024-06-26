import { AnimatePresence, motion, Variants } from 'framer-motion';

import { FaCompactDisc } from 'react-icons/fa';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { PropsWithChildren, useState } from 'react';
import { TARGET_AUDIENCE } from '../../../env';
import Link from 'next/link';

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

function SideSpacer({ children }: Partial<PropsWithChildren>) {
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
        <motion.div className="relative flex h-full w-full flex-grow items-center justify-start overflow-clip bg-theme-invert py-12 text-theme-invert">
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

/* eslint-disable-next-line */
const lines = ["Hi, I'm Omari.", 'I create creative experiences with code.'];

export function Intro() {
    return (
        <motion.section className="sticky top-0 flex h-[100vh] flex-col items-start justify-start gap-12 bg-theme-invert px-8 pb-8 font-title text-theme-invert ">
            <header className="z-10 flex h-screen max-w-screen-lg flex-col items-center justify-center text-center text-2xl font-semibold leading-tight sm:text-4xl md:items-start md:text-start md:text-6xl lg:text-7xl">
                <div>
                    Hi, I'm <span className="text-primary">Omari</span>.
                </div>
                <div>I build bespoke websites for small businesses.</div>
                <div className="w-4/5 py-12 text-xl font-normal leading-tight md:text-4xl md:font-light">
                    No page builders or templates - I create 100% hand-coded
                    websites with personalised results.
                </div>
                <a
                    className="card-solid-invert hover:card-primary w-full py-4 text-2xl font-normal md:w-auto md:px-12 md:py-6"
                    href="#contact">
                    Let's chat
                </a>
            </header>
            <div className="absolute left-0 ">
                <Link href="mailto:hello@leondev.uk">hello@leondev.uk</Link>
            </div>
        </motion.section>
    );
}
