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

type ProjectProps = ProjectContent['attributes'] & { odd?: boolean };

export function Projects() {
    const { projects } = useStrapiContentContext()!;
    const desktop = useMediaQuery('lg');
    return (
        <section
            className={clsx(
                'themed-bg themed-text relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-24',
                title.className
            )}
            id="projects">
            <NavSpacer />
            <h2 className="text-4xl font-bold lg:text-7xl">
                stuff I&apos;ve made
                <div className="-mt-4 h-4 w-2/3 bg-primary"></div>
            </h2>
            <ul className="flex w-full flex-col gap-32 p-6 lg:p-16">
                {projects.map((p, i) => (
                    <Project key={p.id} {...p.attributes} odd={i % 2 == 1} />
                ))}
            </ul>
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
                'w-18 flex flex-col content-end items-start justify-center text-5xl font-bold lowercase',
                !odd && 'rotate-180'
            )}
            style={{ writingMode: 'vertical-rl' }}>
            <h3 className="z-10">{children}</h3>
            <div className="-z-5 -mr-3 h-2/3 w-4 bg-primary">
                <motion.div
                    className="h-full w-full bg-primary"
                    variants={verticalUnderlineVariants}
                    initial="hidden"
                    whileInView="show"
                    exit="hidden"
                />
            </div>
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
    console.log(mobilePreview.data.attributes.url);
    const desktop = useMediaQuery('md');
    return (
        <li
            className={clsx(
                'flex h-96 w-full items-start justify-between gap-16 ',
                odd ? 'flex-row' : 'flex-row-reverse'
            )}>
            <div className="relative flex aspect-[9/19] h-full items-center justify-center overflow-clip rounded md:aspect-[16/9]">
                <Image
                    src={
                        'https://marimari.tech/cms' +
                        (desktop
                            ? desktopPreview.data.attributes.url
                            : mobilePreview.data.attributes.url)
                    }
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>

            <ProjectHeader odd={odd}>{title}</ProjectHeader>
        </li>
    );
}
