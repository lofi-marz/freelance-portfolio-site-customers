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

function BespokePoint({
    Icon,
    title,
    children,
}: { Icon: IconType; title: string } & WithChildrenProps) {
    return (
        <li className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-start">
            <Icon className="h-fit text-6xl text-primary-400" />
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
            <div className=" flex h-6 w-full gap-2 bg-primary-400 p-1 px-2">
                {['bg-red-400', 'bg-amber-400', 'bg-green-400'].map((c) => (
                    <div
                        key={c}
                        className={clsx('aspect-square h-full rounded-full', c)}
                    />
                ))}
            </div>
            <div className="flex grow items-center justify-center">
                <FaCode className="text-9xl text-primary-400" />
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
        <section className="relative z-0 flex min-h-screen w-full flex-col items-center justify-start gap-6 bg-theme-invert px-6 py-36 font-title text-theme md:flex-row md:px-36">
            <div className="z-20 flex h-full w-full flex-col items-start justify-start gap-12 md:justify-center lg:w-1/2">
                <h2 className="text-center text-5xl font-bold lg:whitespace-nowrap lg:text-start">
                    Bespoke Web Development
                </h2>
                <p className="text-center text-2xl lg:text-start">
                    Based in Nottingham, I specialise in bespoke sites, built
                    from scratch for your needs.
                </p>
                <div className="w-full px-6 text-center text-xl leading-normal md:px-0 md:text-start lg:max-w-[50vw]">
                    <ul className="flex flex-col items-center justify-start gap-20 lg:items-start lg:gap-12">
                        <BespokePoint
                            Icon={FaTachometerAlt}
                            title="Blazingly Fast">
                            Building a site from scratch skips all of the
                            outdated, bloated features of template servies like
                            Wix.
                        </BespokePoint>
                        <BespokePoint Icon={FaLock} title="Secure By Design">
                            Built with top-notch security measures, your website
                            is fortified against potential threats.
                        </BespokePoint>
                        <BespokePoint
                            Icon={FaPalette}
                            title="Completely Custom">
                            No templates - Our websites are crafted from
                            scratch, ensuring you stand out from the competition
                        </BespokePoint>
                    </ul>
                </div>
            </div>
            <div className="hidden grow items-center justify-center p-12 lg:flex">
                <CodeWindow yOffset={yOffset} />
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
