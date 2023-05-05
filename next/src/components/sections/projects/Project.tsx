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
import { text } from '../../../fonts';
import { FaGithub, FaLink } from 'react-icons/fa';
import {
    projectTitleVariants,
    underlineVariants,
    verticalUnderlineVariants,
} from '@/components/sections/projects/variants';
import { useEffect, useRef, useState } from 'react';

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
    odd?: boolean;
    first?: boolean;
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

export function Project({
    title,
    description,
    repoLink,
    liveLink,
    brief,
    desktopPreview,
    mobilePreview,
    odd = false,
    first = false,
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
                'relative aspect-[16/10] w-auto w-full overflow-clip rounded p-2',
                colour
            )}
            initial="initial"
            whileHover="hover"
            transition={{ staggerChildren: 0.1 }}>
            <motion.div
                className="absolute left-0 top-0 flex h-full w-full items-center justify-center overflow-clip rounded"
                variants={ProjectPreviewVariants}>
                <Image
                    src={
                        'https://marimari.tech/cms' +
                        desktopPreview.data.attributes.url
                    }
                    alt=""
                    fill
                    className="object-cover"
                />
            </motion.div>
            <motion.div
                key="title"
                className={clsx(
                    'absolute left-0 m-5 h-fit text-4xl',
                    colour === 'themed-bg-invert' && 'themed-text-invert'
                )}
                variants={NoHoverTitleVariants}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
                layout>
                {title}
            </motion.div>

            <motion.div
                key="hover-title"
                className="absolute left-0 flex flex-row p-5 text-9xl mix-blend-difference"
                variants={HoverTitleVariants}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
                layout>
                <motion.div
                    className="relative flex flex-row"
                    variants={ScrollingTextVariants}>
                    <span className="absolute right-[100%] whitespace-nowrap px-4">
                        {title}
                    </span>
                    <span className="whitespace-nowrap px-4">{title}</span>
                    <span className="absolute left-[100%] whitespace-nowrap px-4">
                        {title}
                    </span>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export function OldProject({
    title,
    description,
    repoLink,
    liveLink,
    brief,
    desktopPreview,
    mobilePreview,
    odd = false,
    first = false,
}: ProjectProps) {
    const desktop = useMediaQuery('md');
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const previewParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const textParallax = useTransform(scrollYProgress, [0, 1], [450, -450]);
    return (
        <li
            className={clsx(
                'relative flex h-screen w-full flex-col items-center justify-center gap-32'
            )}
            ref={ref}>
            {first && <ProjectsHeading />}
            <div
                className={clsx(
                    'flex h-96 w-full items-center justify-end gap-16',
                    odd ? 'flex-row' : 'flex-row-reverse'
                )}>
                <motion.div
                    className={clsx(
                        'themed-bg-invert themed-text-invert absolute z-50 w-1/2 p-8',
                        odd ? 'left-0' : 'right-0'
                    )}
                    style={{ y: textParallax }}>
                    {brief}
                    <div className="themed-bg my-4 h-[1px] w-full rounded opacity-90" />
                    <div className="flex flex-row gap-4">
                        {repoLink && (
                            <a
                                className="transition-all hover:text-primary"
                                href={repoLink}
                                target="_blank"
                                rel="noreferrer">
                                <FaGithub />
                            </a>
                        )}
                        {liveLink && (
                            <a
                                className="transition-all hover:text-primary"
                                href={liveLink}
                                target="_blank"
                                rel="noreferrer">
                                <FaLink />
                            </a>
                        )}
                    </div>
                </motion.div>
                <motion.div className="relative flex aspect-[9/19] h-full max-w-md items-center justify-center md:aspect-[16/9] md:max-w-none">
                    <Image
                        src={
                            'https://marimari.tech/cms' +
                            (desktop
                                ? desktopPreview.data.attributes.url
                                : mobilePreview.data.attributes.url)
                        }
                        alt=""
                        fill
                        className="z-10 object-cover shadow brightness-75 "
                    />
                    <motion.div
                        className="absolute ml-8 mt-8 h-full w-full bg-primary brightness-75"
                        style={{ y: previewParallax }}
                    />
                </motion.div>
                <ProjectHeader odd={odd}>{title}</ProjectHeader>
            </div>
        </li>
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
    odd = false,
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
                <p
                    className={clsx(
                        'whitespace-pre-line text-xl shadow',
                        text.className
                    )}>
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
