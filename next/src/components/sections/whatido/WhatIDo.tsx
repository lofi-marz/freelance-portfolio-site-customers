import {
    AnimatePresence,
    useMotionValueEvent,
    useTime,
    useTransform,
    Variants,
} from 'framer-motion';
import { useState } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { WithChildrenProps } from '../../../types';
import { FaCalendar, FaPhone, FaServer, FaFlask } from 'react-icons/fa';

const OptionVariants: Variants = {
    hide: { opacity: 0, y: '1em' },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '-1em' },
};
export function WhatIDo() {
    const colours = ['text-primary', 'text-secondary'];
    const options = [
        'bring their vision to life',
        'showcase their products',
        'establish an online presence',
    ];
    const [optionIndex, setOptionIndex] = useState(0);
    const text = options[optionIndex];
    const colour = colours[optionIndex % colours.length];

    const desktop = useMediaQuery('md');

    const time = useTime();
    const index = useTransform(time, (v) => {
        const seconds = Math.floor((1.35 * v) / 2000);
        return seconds % options.length;
    });

    useMotionValueEvent(index, 'change', (v) => {
        setOptionIndex(v);

        //setOptionIndex(0);
    });
    return (
        <section className="themed-bg-invert themed-text-invert relative z-50 flex min-h-screen w-full flex-col items-center justify-start gap-12 p-36 font-title">
            <div className="flex w-full flex-col items-start justify-center font-title text-4xl font-bold md:text-5xl lg:flex-row lg:items-center lg:justify-start">
                <span className="md:flex md:h-[1em] md:whitespace-pre lg:h-[1.5em] lg:items-center">
                    I help businesses{' '}
                </span>
                <motion.div className="relative flex h-[1.1em] w-full flex-col items-start justify-start overflow-clip md:h-[1em] lg:h-[1.5em] lg:w-auto lg:grow lg:justify-center">
                    <AnimatePresence>
                        <motion.span
                            key={text}
                            className={clsx('absolute', colour)}
                            initial="hide"
                            animate="show"
                            exit="exit"
                            variants={OptionVariants}
                            transition={{ ease: 'easeOut' }}>
                            {text}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>
            </div>
            <div className="-mt-6 self-start text-start text-2xl leading-snug">
                I specialize in bespoke web design and development, to ensure
                the best performance, bring more customers to your site and
                bring more revenue to your business.
            </div>
            <h3 className="text-5xl font-bold">What I can do for you</h3>
            <div className="grid w-full grid-cols-3 grid-rows-2 gap-6">
                <Card Icon={FaServer} title="Reliable Hosting">
                    We can host your website for you. No matter how big or small
                    your website, our hosting is fast, reliable, and we sort out
                    problems quickly.
                </Card>
                <Card Icon={FaPhone} title="Responsive Design">
                    We build sites from a mobile-first perspective, to create
                    website layouts that look great & adapt to small or large
                    screens.
                </Card>
                <Card Icon={FaFlask} title="SEO Optimisation">
                    Design strategies & optimisation tactics to rank higher on
                    Google
                </Card>
            </div>
        </section>
    );
}

function Card({
    Icon,
    title,
    children,
}: { Icon: IconType; title: string } & WithChildrenProps) {
    return (
        <div className="themed-bg themed-text flex flex-col items-center justify-center gap-4 rounded-md p-12 text-center">
            <Icon className="mb-6 text-5xl" />
            <header className="text-4xl font-bold">{title}</header>
            <p>{children}</p>
        </div>
    );
}
