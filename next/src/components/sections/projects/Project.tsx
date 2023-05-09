import { ProjectContent } from '../../../utils/strapi';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import clsx from 'clsx';
import Image from 'next/image';
import { WithChildrenProps } from '../../../types';
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import { FaGithub, FaLink } from 'react-icons/fa';
import {
    projectTitleVariants,
    underlineVariants,
    verticalUnderlineVariants,
} from '@/components/sections/projects/variants';
import { useEffect, useRef, useState } from 'react';
import { NavSpacer } from '@/components/Nav';

const NoHoverTitleVariants: Variants = {
    initial: { bottom: 0, top: 'auto' },
    hover: { top: '100%' },
};

const HoverTitleVariants: Variants = {
    initial: { top: '100%', bottom: 'auto', transition: { delayChildren: 1 } },
    hover: { bottom: 0, top: 'auto' },
};

const ScrollingTextVariants: Variants = {
    initial: { x: '0%', transition: { ease: 'easeOut', duration: 10 } },
    hover: {
        x: '100%',
        transition: {
            repeat: Infinity,
            ease: 'linear',
            duration: 5,
        },
    },
};

const ProjectPreviewVariants = {
    initial: {
        x: '-100%',
        transition: {
            ease: 'easeOut',
            duration: 2,
            bounce: 0,
        },
    },
    hover: {
        x: 0,
        transition: { ease: 'easeOut', duration: 1.5, bounce: 0 },
    },
};

export type ProjectProps = ProjectContent['attributes'] & {
    onView: () => void;
};

function ProjectsHeading() {
    //TODO: why does the z index mess up
    return (
        <motion.div
            className="text-4xl font-bold lg:text-7xl"
            initial="hide"
            whileInView="show">
            <h2>stuff I&apos;ve made</h2>
            <div className="-mt-4 h-4 w-2/3 ">
                <motion.div
                    variants={underlineVariants}
                    className="h-full w-full bg-primary"
                    style={{ originX: 0 }}
                />
            </div>
        </motion.div>
    );
}

function ProjectLink({ href, children }: { href: string } & WithChildrenProps) {
    return (
        <a
            className="themed-bg-invert themed-text-invert flex flex-row items-center justify-center gap-2 rounded p-2 px-4 transition-all hover:bg-primary hover:text-white"
            href={href}>
            {children}
        </a>
    );
}

export function Project({
    title,
    description,
    repoLink,
    liveLink,
    brief,
    desktopPreview,
    mobilePreview,
    onView,
}: ProjectProps) {
    const [colourIndex, setColourIndex] = useState(0);
    useEffect(() => {
        setColourIndex(Math.floor(Math.random() * 3));
    }, []);
    const colour = ['bg-primary', 'bg-secondary', 'themed-bg-invert'][
        colourIndex
    ];

    return (
        <motion.div
            className={clsx(
                'relative flex h-[100vh] w-full snap-start flex-col items-center justify-start pb-12 md:h-screen md:snap-center md:justify-center md:pb-6'
            )}
            initial="initial"
            whileHover="hover"
            onViewportEnter={() => onView()}
            viewport={{ margin: '-50%' }}
            transition={{ staggerChildren: 0.1 }}>
            <NavSpacer />
            <div className="mb-6 aspect-square w-full md:hidden"></div>
            <div className="justify-baseline flex w-full flex-col items-start gap-6 md:gap-6">
                <h3 className="w-full text-5xl font-bold md:w-4/5 md:text-7xl lg:text-8xl">
                    {title}
                </h3>
                <p className="w-full font-body md:w-1/2">{brief}</p>
                <div className="mt-6 flex flex-row items-center justify-center gap-3 rounded text-xl">
                    {liveLink && (
                        <ProjectLink href={liveLink}>
                            <FaLink /> Link
                        </ProjectLink>
                    )}
                    {repoLink && (
                        <ProjectLink href={repoLink}>
                            <FaGithub /> Code
                        </ProjectLink>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function MobileProject({
    title,
    description,
    repoLink,
    liveLink,
    brief,
    desktopPreview,
    mobilePreview,
}: ProjectProps) {
    return (
        <li
            className={clsx(
                'relative flex flex-col items-center justify-center gap-4'
            )}>
            <h3 className="w-full text-3xl font-bold">
                {title}
                <div className="-mt-3 h-4 w-full bg-primary"></div>
            </h3>
            <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-visible rounded shadow">
                <Image
                    src={
                        'https://marimari.tech/cms' +
                        desktopPreview.data.attributes.url
                    }
                    alt=""
                    fill
                    className="object-contain"
                />
            </div>
            <div className={clsx('flex h-full  w-full flex-col gap-8')}>
                <p className={clsx('whitespace-pre-line text-xl shadow')}>
                    {brief}
                </p>
                <div className="flex flex-row text-xl font-bold">
                    <a
                        className="themed-bg-invert themed-text-invert p-4 transition-all hover:text-primary"
                        href={repoLink}>
                        <FaGithub />
                    </a>
                    {liveLink && (
                        <a
                            className="themed-text bg-primary p-4 transition-all hover:text-primary"
                            href={liveLink}>
                            <FaLink />
                        </a>
                    )}
                </div>
            </div>
        </li>
    );
}

function ProjectHeader({
    children,
    odd,
}: { odd: boolean } & WithChildrenProps) {
    return (
        <motion.header
            className={clsx(
                'w-18 flex flex-col content-end items-start justify-center text-5xl font-bold lowercase',
                !odd && 'rotate-180'
            )}
            style={{ writingMode: 'vertical-rl' }}
            initial="hide"
            whileInView="show"
            exit="hide">
            <motion.h3 variants={projectTitleVariants} className="z-10">
                {children}
            </motion.h3>
            <div className="-z-5 -mr-3 h-2/3 w-4">
                <motion.div
                    className="h-full w-full bg-primary"
                    style={{ originY: 0 }}
                    variants={verticalUnderlineVariants}
                />
            </div>
        </motion.header>
    );
}
