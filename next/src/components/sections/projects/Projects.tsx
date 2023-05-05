import Image from 'next/image';
import clsx from 'clsx';
import { FaGithub, FaLink } from 'react-icons/fa';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import {
    AnimatePresence,
    motion,
    MotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    Variants,
} from 'framer-motion';
import { WithChildrenProps } from 'types';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { NavSpacer } from '../..';
import { Project } from './Project';
import { forwardRef, useEffect, useRef, useState } from 'react';

type RepeatTextProps = {
    n: number;
} & WithChildrenProps;
const toPercent = (n: number) => n * 100 + '%';
function RepeatText({ n, children }: RepeatTextProps) {
    const headerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ['start end', 'end start'],
    });

    const x = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <header className="relative flex w-full items-center justify-center overflow-clip pt-48 text-[24rem] font-bold">
            <motion.div
                className="relative flex flex-row items-center justify-center gap-2"
                ref={headerRef}
                style={{ x }}>
                {[...Array(n)].map((_, i) => (
                    <span
                        className="absolute px-4"
                        key={i}
                        style={{ left: toPercent(i + 1) }}>
                        {children}
                    </span>
                ))}
                <span className="px-4">Projects</span>
                {[...Array(n)].map((_, i) => (
                    <span
                        className="absolute px-4"
                        key={i}
                        style={{ right: toPercent(i + 1) }}>
                        {children}
                    </span>
                ))}
            </motion.div>
        </header>
    );
}

export function Projects() {
    const { projects } = useStrapiContentContext()!;
    const [projectI, setProjectI] = useState(0);
    const onChange = (p: number) => () => setProjectI(p);
    const project = projects[projectI];

    return (
        <section
            className="themed-bg themed-text relative z-10 flex min-h-screen w-full flex-col items-center justify-center py-24 font-title"
            id="projects">
            <NavSpacer />
            <RepeatText n={1}>Projects</RepeatText>
            <div className="flex w-full flex-row items-start justify-start px-24">
                <div className="flex w-3/5 flex-col items-center justify-center">
                    {projects.map((p, i) => (
                        <Project
                            key={p.id}
                            {...p.attributes}
                            onView={onChange(i)}
                        />
                    ))}
                </div>
                <div className="sticky top-0 flex h-screen grow items-center justify-center">
                    <AnimatePresence>
                        <motion.div
                            className="absolute flex aspect-square w-full items-center justify-center bg-primary p-12"
                            key={'project-' + project.id}
                            initial="hide"
                            animate="show"
                            exit="hide"
                            variants={{
                                hide: { opacity: 0 },
                                show: { opacity: 1 },
                            }}>
                            <div className="relative aspect-[5/4] w-full">
                                <Image
                                    src={
                                        'https://marimari.tech/cms' +
                                        project.attributes.desktopPreview.data
                                            .attributes.url
                                    }
                                    alt=""
                                    fill
                                    className="rounded object-cover object-top"
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
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
        <div className="f lex  z-10 flex-row text-xl font-bold">
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
