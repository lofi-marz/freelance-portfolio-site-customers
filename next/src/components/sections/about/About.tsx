import clsx from 'clsx';
import { title } from 'fonts';
import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import { CallToAction } from '@/components/sections/intro/CallToAction';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import { WithChildrenProps } from '../../../types';
import {
    motion,
    MotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import theme from '../../../../tailwind.config';
import { forwardRef, MutableRefObject, useRef } from 'react';

const primary = theme.theme.extend.colors.primary;

export function About() {
    return (
        <motion.section
            id="about"
            className={clsx(
                'themed-bg-invert themed-text-invert relative flex h-screen w-full flex-col items-center justify-center gap-8',
                title.className
            )}>
            <div className="whitespace-pre-line p-6 text-center text-3xl font-medium sm:text-4xl md:text-4xl lg:p-12 lg:text-5xl">
                <HighlightText>
                    Hi, I&apos;m Omari! I&apos;m a Web Developer from England,
                    currently studying in Nottingham. I like making fun,
                    creative things with code. Creating new experiences,
                    implementing eye pleasing designs, and bringing them to life
                    with eye-catching animations is what I do best.
                </HighlightText>
            </div>
            <CallToAction />
        </motion.section>
    );
}

const lineVariants: Variants = {
    hide: {
        transition: { duration: 0.1 },
    },
    show: {
        transition: {
            staggerChildren: 0.1,
            ease: 'easeOut',
            bounce: 0,
            duration: 5,
        },
    },
};
const charVariants = {
    hide: { y: '120%', opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            ease: 'easeOut',
            bounce: 1,
            duration: 1,
        },
    },
    hover: {
        color: primary,
        transition: { duration: 0.1 },
    },
    noHover: {
        color: '#00000000',
        transition: { ease: 'easeOut', delay: 1, duration: 3 },
    },
};

function HighlightChar({ char }: { char: string }) {
    return (
        <motion.div>
            <motion.div
                className="absolute"
                variants={charVariants}
                initial="noHover"
                animate="noHover"
                whileHover="hover">
                {char}
            </motion.div>
            <div className="select-none">{char}</div>
        </motion.div>
    );
}

function HighlightWord({ word }: { word: string }) {
    return (
        <motion.div
            className="flex flex-row whitespace-pre"
            variants={lineVariants}
            transition={{ staggerChildren: 1 }}>
            {[...word].map((c, i) => (
                <HighlightChar key={c + i} char={c} />
            ))}
        </motion.div>
    );
}

//TODO: Add some sort of reusability to this
export function HighlightText({
    children,
}: WithChildrenProps): JSX.Element | null {
    if (typeof children === 'string') {
        const words = children.split(' ');
        return (
            <motion.div
                className="flex flex-row flex-wrap items-center justify-center whitespace-pre"
                variants={{ hide: {}, show: {} }}
                transition={{ staggerChildren: 0.1 }}>
                {words.map((w, i) => (
                    <HighlightWord key={w + i} word={w + ' '} />
                ))}
            </motion.div>
        );
    }

    return null;
}
