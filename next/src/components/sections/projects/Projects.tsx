import Image from 'next/image';
import clsx from 'clsx';
import { text, title } from '../../../fonts';
import { FaGithub, FaLink } from 'react-icons/fa';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import { motion, Variants } from 'framer-motion';
import { WithChildrenProps } from 'types';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { NavSpacer } from '../..';
import { Project } from './Project';

export function Projects() {
    const { projects } = useStrapiContentContext()!;
    return (
        <section
            className={clsx(
                'themed-bg themed-text relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-24',
                title.className
            )}
            id="projects">
            <NavSpacer />

            <ul className="flex w-full flex-col p-6 lg:p-16">
                {projects.map((p, i) => (
                    <Project
                        key={p.id}
                        {...p.attributes}
                        odd={i % 2 === 1}
                        first={i === 0}
                    />
                ))}
            </ul>
        </section>
    );
}

const underlineVariants: Variants = {
    hidden: { width: '0%' },
    show: { width: '100%' },
};

function ProjectBrief({ children }: WithChildrenProps) {}

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
