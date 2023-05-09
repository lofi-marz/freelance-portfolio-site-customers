import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { WithChildrenProps } from 'types';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { Project } from './Project';
import { useRef, useState } from 'react';
import { ProjectPreview } from '@/components/sections/projects/ProjectPreview';

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
        <header className="relative flex w-full flex-col items-center justify-center overflow-clip py-36 text-8xl font-bold md:text-[18rem]">
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
    const md = useMediaQuery('md');
    return (
        <section
            className="themed-bg themed-text relative z-10 flex min-h-screen w-full flex-col items-center justify-center py-24 pb-[25vh] font-title md:pb-[50vh]"
            id="projects">
            <RepeatText n={2}>Projects</RepeatText>
            <div className="flex w-full flex-col-reverse items-start justify-center px-6 md:flex-row md:items-start md:justify-start md:px-24">
                <div className="-mt-[50vh] flex flex-col items-center justify-center md:z-50 md:mt-auto md:w-3/5">
                    {projects.map((p, i) => (
                        <Project
                            key={p.id}
                            {...p.attributes}
                            onView={onChange(i)}
                        />
                    ))}
                </div>
                <div className="sticky top-0 z-0 flex h-[50vh] w-full grow items-start justify-between md:h-screen md:w-auto md:items-center">
                    <ProjectPreview project={project} />
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
