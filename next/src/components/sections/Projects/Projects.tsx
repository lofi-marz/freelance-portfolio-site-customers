'use client';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { useState } from 'react';
import styles from './Projects.module.css';
import clsx from 'clsx';
import Image from 'next/image';
import { FaLink } from 'react-icons/fa';
import { ProjectContent } from 'utils/strapi/types';

const CircleFillVariants = {
    show: ([x, y]: [number, number]) => ({
        clipPath: `circle(1500px at ${x}px ${y}px)`,
        transition: {
            ease: 'easeOut',

            duration: 1,
        },
    }),
    hide: ([x, y]: [number, number]) => ({
        clipPath: `circle(30px at ${x}px ${y}px)`,
        transition: {
            ease: 'easeInOut',
        },
    }),
    exit: ([x, y]: [number, number]) => ({
        clipPath: `circle(0px at ${x}px ${y}px)`,
        opacity: 1,
        transition: {
            ease: 'easeInOut',
        },
    }),
};

type ProjectsProps = {
    projects: ProjectContent[];
};
export function Projects({ projects }: ProjectsProps) {
    const [projectI, setProjectI] = useState<number>(-1);
    const [mousePos, setMousePos] = useState([0, 0]);
    const featured = projects.filter((p) => p.attributes.mockup.data);
    const onChange = (p: number) => () => setProjectI(p);
    const md = useMediaQuery('md');

    return (
        <motion.section
            className="relative z-10 flex min-h-screen flex-col gap-12 bg-theme px-6 py-24 font-title text-theme-invert lg:px-40"
            id="projects">
            <h2 className="text-5xl font-bold">My Work</h2>
            <div className="grid w-full grid-cols-1 flex-col gap-12 md:aspect-[3/2] md:grid-cols-3 md:grid-rows-2">
                {featured.map((p, i) => (
                    <motion.div
                        onHoverStart={(e) => {
                            const { x: tx, y: ty } = (
                                e.target as HTMLDivElement
                            ).getBoundingClientRect();
                            //console.log(e.clientX - tx, e.clientY - ty);
                            setMousePos(
                                [e.clientX - tx, e.clientY - ty].map(Math.round)
                            );
                            setProjectI(i);
                        }}
                        onHoverEnd={() => setProjectI(-1)}
                        key={p.id}
                        className={clsx(
                            'relative aspect-square overflow-clip rounded-lg text-light transition-all duration-500 hover:scale-105 md:aspect-auto',
                            md && styles.project
                        )}>
                        <Image
                            src={
                                'https://marileon.me/cms' +
                                p.attributes.mockup.data.attributes.url
                            }
                            alt=""
                            fill
                            className="aspect-[16/10] object-cover brightness-75 saturate-[.8]"
                        />
                        <div className="absolute flex h-full w-full flex-col justify-between p-6 text-xl font-bold text-light">
                            <div className="z-50 flex justify-end transition-all  ">
                                <a
                                    href={p.attributes.liveLink}
                                    target="_blank"
                                    className="hover:scale-110">
                                    <FaLink />
                                </a>
                            </div>
                            <div className="z-10 w-fit">
                                {p.attributes.title}
                            </div>
                        </div>
                        <AnimatePresence>
                            {projectI === i && (
                                <motion.div
                                    key={'project-cover-' + i}
                                    variants={CircleFillVariants}
                                    initial="hide"
                                    animate="show"
                                    exit="exit"
                                    custom={mousePos}
                                    className="absolute flex h-full w-full flex-col justify-between bg-primary p-6">
                                    <p className="max-w-sm">
                                        {p.attributes.brief}
                                    </p>
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
