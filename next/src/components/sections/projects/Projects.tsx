import test from '../../../../content/projects/restaurant-landing-page/desktop.png';
import Image from 'next/image';
import path from 'path';
import clsx from 'clsx';
import { text, title } from '../../../fonts';
import { FaGithub, FaLink } from 'react-icons/fa';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import { ProjectContent } from 'utils/strapi';
import { motion, Variants } from 'framer-motion';
import { WithChildrenProps } from 'types';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { NavSpacer } from '../..';
import { useState } from 'react';

type ProjectProps = ProjectContent['attributes'] & {
    odd?: boolean;
};

export function Projects() {
    const { projects } = useStrapiContentContext()!;
    const [current, setCurrent] = useState<number>(2);
    console.log(projects);
    const desktop = useMediaQuery('md');
    return (
        <section
            className={clsx(
                'themed-bg themed-text relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-16 p-4 pt-0 md:p-16',
                title.className
            )}
            id="projects">
            <NavSpacer />
            <h2 className="text-4xl font-bold lg:text-7xl">
                stuff I&apos;ve made
                <div className="-mt-4 h-4 w-2/3 bg-primary"></div>
            </h2>
            <div className="flex h-full w-full flex-col gap-12">
                {projects.map((p) => (
                    <Project key={p.attributes.title} {...p.attributes} />
                ))}
            </div>
        </section>
    );
}

const underlineVariants: Variants = {
    hidden: { width: '0%' },
    show: { width: '100%' },
};

const verticalUnderlineVariants: Variants = {
    hidden: { height: '0%' },
    show: { height: '100%', transition: { ease: 'easeOut' } },
};

function ProjectHeader({
    children,
    odd,
}: { odd: boolean } & WithChildrenProps) {
    return (
        <div
            className={clsx(
                'flex h-full w-16 flex-col content-end items-center justify-center text-xs font-bold uppercase',
                !odd && 'rotate-180'
            )}
            style={{ writingMode: 'vertical-rl' }}>
            <h3 className="z-10">{children}</h3>
        </div>
    );
}

function ProjectBrief({ children }: WithChildrenProps) {}

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
            <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-visible rounded">
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
                        'whitespace-pre-line text-xl',
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

type ProjectLinksProps = {
    repoLink?: string;
    liveLink?: string;
};
function ProjectLinks({ repoLink, liveLink }: ProjectLinksProps) {
    return (
        <div className="z-10 flex flex-row text-xl font-bold">
            {repoLink && (
                <a
                    className="themed-bg-invert themed-text-invert p-2 px-4"
                    href={repoLink}>
                    github
                </a>
            )}
            {liveLink && (
                <a className="themed-text bg-primary p-2 px-4" href={liveLink}>
                    link
                </a>
            )}
        </div>
    );
}

function Project({
    title,
    description,
    repoLink,
    liveLink,
    brief,
    desktopPreview,
    mobilePreview,
    odd = false,
}: ProjectProps) {
    console.log(description);
    return (
        <li
            className={clsx(
                'relative flex h-auto w-full flex-row items-center justify-between gap-4 text-sm'
            )}>
            <div className="relative aspect-[16/9] w-[90%] md:w-4/5">
                <Image
                    src={
                        'https://marimari.tech/cms' +
                        desktopPreview.data.attributes.url
                    }
                    alt=""
                    fill
                    className="object-cover brightness-90 saturate-0 transition-all hover:brightness-100 hover:saturate-100"
                />
            </div>
            <div className="absolute right-0 bottom-0 flex w-1/2 flex-row items-end justify-end">
                <a className="relative w-full text-end text-3xl font-bold lowercase lg:text-8xl">
                    <p className="text-primary">{title}</p>
                </a>
            </div>
        </li>
    );
}
