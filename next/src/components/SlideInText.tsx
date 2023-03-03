import { motion, Variants } from 'framer-motion';
import { WithChildrenProps } from '../types';
import clsx from 'clsx';
import { title } from '../fonts';

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
};

function SlideInChar({ char }: { char: string }) {
    return <motion.div variants={charVariants}>{char}</motion.div>;
}

function SlideInWord({ word }: { word: string }) {
    return (
        <motion.div
            className="themed-bg-invert flex flex-row whitespace-pre"
            variants={lineVariants}
            transition={{ staggerChildren: 1 }}>
            {[...word].map((c, i) => (
                <SlideInChar key={c + i} char={c} />
            ))}
        </motion.div>
    );
}

//TODO: Add some sort of reusability to this
export function SlideInText({
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
                    <SlideInWord key={w + i} word={w + ' '} />
                ))}
            </motion.div>
        );
    }

    return null;
}
