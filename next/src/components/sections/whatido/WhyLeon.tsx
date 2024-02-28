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
import {
    FaCalendar,
    FaPhone,
    FaServer,
    FaFlask,
    FaMobile,
    FaMobileAlt,
} from 'react-icons/fa';
import { SlideInText } from '@/components/SlideInText';

export function WhyLeon() {
    const desktop = useMediaQuery('md');

    return (
        <section className="relative z-10 flex w-full flex-col items-center justify-start gap-24 bg-theme p-6 py-48 font-title text-theme-invert md:px-36">
            <motion.h3
                className="text-5xl font-bold lg:text-7xl"
                initial="hide"
                whileInView="show">
                Why Leon<span className="text-primary-400">?</span>
            </motion.h3>
            <div className="grid grid-rows-3 items-start gap-12 md:grid-rows-1 lg:grid-cols-3">
                <Card Icon={FaServer} title="Reliable Hosting">
                    I can host your website for you. No matter how big or small
                    your website, my hosting is fast, reliable, and we sort out
                    problems quickly.
                </Card>
                <Card Icon={FaMobileAlt} title="Responsive Design">
                    I build sites from a mobile-first perspective, to create
                    website layouts that look great & adapt to small or large
                    screens.
                </Card>
                <Card Icon={FaFlask} title="SEO Optimisation">
                    Your website is built with SEO in mind, using advanced
                    pre-rendering techniques to improve your website's ranking
                    potential.
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
        <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-theme p-6 text-center">
            <Icon className="mb-6 text-5xl text-primary-400" />

            <header className="text-4xl font-bold">{title}</header>
            <p className="max-w-xs">{children}</p>
        </div>
    );
}
