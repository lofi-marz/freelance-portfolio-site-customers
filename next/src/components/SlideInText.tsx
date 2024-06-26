import { motion, Variants } from 'framer-motion';

import clsx from 'clsx';

import React, { cloneElement, isValidElement, PropsWithChildren } from 'react';

const lineVariants: Variants = {
    hide: {
        transition: {
            duration: 0.1,
            staggerChildren: 0.05,
            ease: 'easeOut',
            bounce: 0,
        },
    },
    show: {
        transition: {
            staggerChildren: 0.1,
            ease: 'easeOut',
            bounce: 0,
            duration: 4,
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

function SlideInWord({ word, invert }: { word: string; invert: boolean }) {
    return (
        <motion.div
            className={clsx(
                'flex flex-row whitespace-pre',
                invert
                    ? 'bg-theme-invert text-theme'
                    : 'bg-theme text-theme-invert'
            )}
            variants={lineVariants}
            transition={{ staggerChildren: 1 }}>
            {[...word].map((c, i) => (
                <SlideInChar key={c + i} char={c} />
            ))}
        </motion.div>
    );
}

type SlideInTextProps = {
    invert?: boolean;
    className?: string;
} & PropsWithChildren;

//TODO: This is weird code
export function SlideInText({
    invert = false,
    className,
    children,
}: SlideInTextProps) {
    const createWords = (words: string[]) => {
        return words.map((w, i, arr) => (
            <SlideInWord
                key={w + i}
                word={i === arr.length - 1 ? w : w + ' '}
                invert={invert}
            />
        ));
    };
    if (typeof children === 'string') {
        const words = children.split(' ');

        return (
            <SlideInTextWrapper className={className}>
                {createWords(words)}
            </SlideInTextWrapper>
        );
    } else if (Array.isArray(children)) {
        const components = children.map((c) => {
            if (typeof c === 'string') {
                return createWords(c.split(' '));
            } else if (isValidElement(c)) {
                const children: React.ReactNode = (c.props as PropsWithChildren)
                    .children;

                if (!children) return c;
                if (typeof children === 'string') {
                    const newChildren = createWords(children.split(' '));
                    // @ts-ignore //TODO: There is no sane reason for this to be here
                    return cloneElement(c, c.props, newChildren);
                }
            }
        });
        return (
            <SlideInTextWrapper className={className}>
                {components}
            </SlideInTextWrapper>
        );
    }

    return null;
}

function SlideInTextWrapper({
    className,
    children,
}: { className?: string } & PropsWithChildren) {
    return (
        <motion.div
            className={clsx(
                'flex flex-row flex-wrap items-center justify-center whitespace-pre',
                className
            )}
            layout
            variants={{ hide: {}, show: {} }}
            transition={{ staggerChildren: 0.1 }}>
            {children}
        </motion.div>
    );
}
