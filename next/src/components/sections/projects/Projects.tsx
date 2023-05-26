import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import {
    AnimatePresence,
    motion,
    MotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import { WithChildrenProps } from 'types';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { Project } from './Project';
import { useRef, useState } from 'react';
import styles from './Projects.module.css';
import { ProjectPreview } from '@/components/sections/projects/ProjectPreview';
import clsx from 'clsx';
import Image from 'next/image';
import mockup from './omni-mockup.webp';
import { FaLink } from 'react-icons/fa';
type RepeatTextProps = {
    n: number;
} & WithChildrenProps;
const toPercent = (n: number) => n * 100 + '%';

const sidebar = {
    show: ([x, y]: [number, number]) => {
        console.log('Pos:', x, y);
        return {
            clipPath: `circle(1000px at ${x}px ${y}px)`,
            transition: {
                type: 'spring',
                stiffness: 20,
                restDelta: 2,
            },
        };
    },
    hide: ([x, y]: [number, number]) => ({
        clipPath: `circle(30px at ${x}px ${y}px)`,
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    }),
    exit: ([x, y]: [number, number]) => ({
        clipPath: `circle(30px at ${x}px ${y}px)`,
        opacity: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
            delay: 0.5,
        },
    }),
};

function RepeatText({ n, children }: RepeatTextProps) {
    const headerRef = useRef(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ['start end', 'end start'],
    });
    const spring = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    const x = useTransform(spring, [0, 1], ['0%', '100%']);

    /*useMotionValueEvent(x, 'change', (v) => {
        console.log(scrollYProgress.get(), spring.get(), v);
    });*/

    return (
        <motion.header className="relative flex w-full flex-col items-center justify-center overflow-clip py-36 text-8xl font-bold md:text-[18rem]">
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
        </motion.header>
    );
}

export function Projects() {
    const { projects } = useStrapiContentContext()!;
    const [projectI, setProjectI] = useState<number | null>(0);
    const [mousePos, setMousePos] = useState([0, 0]);
    const featured = projects.filter((p) => p.attributes.mockup.data);
    const onChange = (p: number) => () => setProjectI(p);
    const project = projectI ? projects[projectI] : null;
    const md = useMediaQuery('md');

    return (
        <motion.section
            className="themed-bg themed-text relative z-10 flex min-h-screen flex-col gap-12 px-6 py-24 font-title md:px-24"
            id="projects">
            <h2 className="text-5xl font-bold">my work</h2>
            <div className="grid w-full grid-cols-1 flex-col gap-6 md:aspect-[3/2] md:grid-cols-3 md:grid-rows-2">
                {featured.map((p, i) => (
                    <motion.div
                        onHoverStart={(e, info) => {
                            const { x: tx, y: ty } = (
                                e.target as HTMLDivElement
                            ).getBoundingClientRect();
                            console.log(e.clientX - tx, e.clientY - ty);
                            setMousePos(
                                [e.clientX - tx, e.clientY - ty].map(Math.round)
                            );
                            setProjectI(i);
                        }}
                        onHoverEnd={() => setProjectI(null)}
                        key={p.id}
                        className={clsx(
                            'relative aspect-[16/10] overflow-clip rounded-lg text-light  md:aspect-auto',
                            md && styles.project
                        )}>
                        <Image
                            src={
                                'https://marimari.tech/cms' +
                                p.attributes.mockup.data.attributes.url
                            }
                            alt=""
                            fill
                            className="object-cover brightness-50"
                        />
                        <div className="absolute flex h-full w-full flex-col justify-between p-6 text-xl font-bold text-light">
                            <div className="flex justify-end transition-all hover:text-primary">
                                <a href={p.attributes.liveLink}>
                                    <FaLink />
                                </a>
                            </div>
                            <div className="z-10">{p.attributes.title}</div>
                        </div>
                        <AnimatePresence>
                            {projectI === i && (
                                <motion.div
                                    key={'project-cover-' + i}
                                    variants={sidebar}
                                    initial="hide"
                                    animate="show"
                                    exit="exit"
                                    custom={mousePos}
                                    className="absolute flex h-full w-full flex-col justify-between bg-primary p-6">
                                    <p>{p.attributes.brief}</p>
                                    <div className="flex justify-end transition-all hover:text-primary">
                                        <a href={p.attributes.liveLink}>
                                            <FaLink />
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.section>
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
