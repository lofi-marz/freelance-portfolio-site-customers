import clsx from 'clsx';
import { title } from 'fonts';
import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import { CallToAction } from '@/components/sections/intro/CallToAction';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import { WithChildrenProps } from '../../../types';
import { motion, Variants } from 'framer-motion';

export default function About() {
    const { about } = useStrapiContentContext()!;
    return (
        <section
            id="about"
            className={clsx(
                'themed-text themed-bg relative flex h-screen w-full flex-col items-center justify-center gap-8',
                title.className
            )}>
            <p className="whitespace-pre-line p-6 text-center text-3xl font-medium sm:text-4xl md:text-4xl  lg:p-12 lg:text-5xl">
                <HighlightText>{about.attributes.aboutText}</HighlightText>
            </p>
            <CallToAction />
        </section>
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
    hover: { color: '#e76f51', transition: { duration: 0.1 } },
    noHover: {
        color: '#00000000',
        transition: { ease: 'easeOut', delay: 1, duration: 5 },
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
