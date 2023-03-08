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
import { useRef } from 'react';

type ProjectProps = ProjectContent['attributes'] & {
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
    console.log(mobilePreview.data.attributes.url);
    const desktop = useMediaQuery('md');
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (latestValue) => {
        console.log(title, latestValue);
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
                        <FaGithub />
                        <FaLink />
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
                        className="absolute mt-8 ml-8 h-full w-full bg-primary brightness-75"
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
                        className="themed-bg-invert themed-text-invert p-4"
                        href={repoLink}>
                        <FaGithub />
                    </a>
                    {liveLink && (
                        <a
                            className="themed-text bg-primary p-4"
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
