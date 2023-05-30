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

export function WhatIDo() {
    const desktop = useMediaQuery('md');

    return (
        <section className="themed-bg themed-text relative z-10 flex w-full flex-col items-center justify-start gap-24 p-6 py-24 font-title md:px-36">
            <motion.h3
                className="text-5xl font-bold"
                initial="hide"
                whileInView="show">
                <SlideInText>
                    why leon<span className="text-primary">?</span>
                </SlideInText>
            </motion.h3>
            <div className="grid grid-rows-3 items-start gap-6 md:grid-rows-1 lg:grid-cols-3">
                <Card Icon={FaServer} title="Reliable Hosting">
                    We can host your website for you. No matter how big or small
                    your website, our hosting is fast, reliable, and we sort out
                    problems quickly.
                </Card>
                <Card Icon={FaMobileAlt} title="Responsive Design">
                    We build sites from a mobile-first perspective, to create
                    website layouts that look great & adapt to small or large
                    screens.
                </Card>
                <Card Icon={FaFlask} title="SEO Optimisation">
                    Your website is built with SEO in mind, using advanced
                    design and pre-rendering techniques to improve your
                    website's ranking potential.
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
        <div className="themed-bg themed-text flex flex-col items-center justify-center gap-4 rounded-md p-6 text-center">
            <Icon className="mb-6 text-5xl text-primary" />

            <header className="text-4xl font-bold">{title}</header>
            <p className="max-w-xs">{children}</p>
        </div>
    );
}
