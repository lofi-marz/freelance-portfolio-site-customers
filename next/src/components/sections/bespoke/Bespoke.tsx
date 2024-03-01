import {
    AnimatePresence,
    MotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTime,
    useTransform,
    Variants,
} from 'framer-motion';
import React, { useRef, useState } from 'react';
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
    FaTachometerAlt,
    FaCode,
    FaLock,
    FaPalette,
} from 'react-icons/fa';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import Image from 'next/image';
import { useParallax } from '../../../hooks/useParallax';
import { CTA } from '@/components/Button';
import { Dot } from '@/components/Dot';

function BespokePoint({
    Icon,
    title,
    children,
}: { Icon: IconType; title: string } & WithChildrenProps) {
    return (
        <li className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-start">
            <div className="flex flex-col gap-2">
                <div className="text-center font-title text-2xl font-bold lg:text-start">
                    {title}
                </div>
                <div className="text-md max-w-md font-light">{children}</div>
            </div>
        </li>
    );
}

function CodeWindow({ yOffset }: { yOffset: MotionValue<number> }) {
    return (
        <motion.div
            className="flex aspect-video w-full flex-col overflow-clip rounded-xl bg-theme"
            style={{ y: yOffset }}>
            <div className=" flex h-6 w-full gap-2 bg-primary p-1 px-2">
                {['bg-red-400', 'bg-amber-400', 'bg-green-400'].map((c) => (
                    <div
                        key={c}
                        className={clsx('aspect-square h-full rounded-full', c)}
                    />
                ))}
            </div>
            <div className="flex grow items-center justify-center">
                <FaCode className="text-9xl text-primary" />
            </div>
        </motion.div>
    );
}

export function Bespoke() {
    const desktop = useMediaQuery('md');
    const { projects } = useStrapiContentContext()!;
    const project = projects[4];
    const src =
        'https://marileon.me/cms' +
        (desktop
            ? project.attributes.desktopPreview.data.attributes.url
            : project.attributes.mobilePreview.data.attributes.url);
    const containerRef = useRef(null);

    const yOffset: MotionValue<number> = useParallax(
        containerRef,
        [500, -500],
        ['start end', 'end start']
    );

    return (
        <section className="relative z-0 flex min-h-screen w-full flex-col items-start justify-start gap-6 bg-theme px-6 py-36 font-title text-theme-invert md:gap-16 md:px-40">
            <h2 className="text-5xl md:w-1/2 md:text-6xl">
                Bespoke Web Design
            </h2>
            <div className="flex grid-cols-2 flex-col gap-6 md:gap-12 lg:grid">
                <h3 className="text-2xl md:text-3xl lg:text-start">
                    Based in Nottingham, I specialise in bespoke sites, built
                    from scratch for your needs
                    <Dot />
                </h3>
                <div className="flex w-full flex-col gap-12 text-base font-semibold  leading-normal md:text-start md:text-lg">
                    I don't use page builders - I meticulously write the code
                    line by line. This gives much more control over the design,
                    and the website performs lightning fast because there's no
                    bloated or messy code that slows it down. Websites built by
                    hand will out-perform most WordPress sites and drag and drop
                    page builders which could cost thousands of pounds. <br />
                    When it comes to the web, the faster websites win.
                    <CTA variant="default" />
                </div>
            </div>
        </section>
    );
}

function Preview({ src }: { src: string }) {
    return (
        <div className="z-50 flex w-full flex-col overflow-clip rounded-xl drop-shadow-md">
            <div className="z-50 flex h-7 w-full items-center justify-start gap-1 bg-theme p-2">
                <span className="aspect-square h-full rounded-full bg-red-400" />
                <span className="aspect-square h-full rounded-full bg-amber-400" />
                <span className="aspect-square h-full rounded-full bg-green-400" />
            </div>
            <div className="relative aspect-[9/16] w-full md:aspect-[16/9]">
                <Image
                    src={src}
                    alt=""
                    fill
                    className="z-10 bg-theme object-cover object-top"
                />
            </div>
        </div>
    );
}
