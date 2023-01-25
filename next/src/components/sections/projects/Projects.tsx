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

type ProjectProps = ProjectContent['attributes'] & { odd?: boolean };

export function Projects() {
    const { projects } = useStrapiContentContext()!;
    console.log('Projects:', projects);
    return (
        <section
            className={clsx(
                'themed-bg themed-text absolute flex min-h-screen w-full flex-col items-center justify-center gap-4',
                title.className
            )}
            id="projects">
            <h2 className="text-7xl font-bold">
                stuff I&apos;ve made<div className="-mt-1 h-4 w-2/3 bg-primary"></div>
            </h2>
            <ul className="flex w-full flex-col gap-32 p-16">
                {projects.map((p, i) => <Project key={p.id} {...p.attributes} odd={i % 2 == 1}/>)}
            </ul>
        </section>
    );
}

const underlineVariants: Variants = {
    hidden: {width: '0%'},
    show: {width: '100%'}
}


const verticalUnderlineVariants: Variants = {
    hidden: {height: '0%'},
    show: {height: '100%', transition: {ease: 'easeOut'}}
}

function ProjectHeader({children, odd}: {odd: boolean} & WithChildrenProps) {
    return (<div className={clsx('text-5xl font-bold w-18 lowercase flex items-start content-end justify-center flex-col', !odd && 'rotate-180')}    style={{ writingMode: 'vertical-rl' }}>
    <h3 className="z-10">{children}</h3>
    <div className="-mr-3 w-4 h-2/3 bg-primary -z-5">
        <motion.div className="w-full h-full bg-primary" variants={verticalUnderlineVariants} initial="hidden" whileInView="show" exit="hidden"/>
    </div>
</div>)
}

function ProjectBrief({children}: WithChildrenProps) {
    
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
                'flex items-start justify-between gap-16 h-96',
                odd && 'flex-row-reverse'
            )}>
            <ProjectHeader odd={odd}>{title}</ProjectHeader>
            <div className={clsx('mt-16 flex w-[36rem]  flex-col gap-8 h-full  z-10', odd ? '-ml-32' : '-mr-32')}>
                <p className={clsx('p-4 bg-primary text-xl whitespace-pre-line', text.className)}>
                    {brief}
                </p>
                <div className="flex flex-row text-xl font-bold">
                    <a
                        className="themed-bg-invert themed-text-invert p-2 px-4"
                        href={repoLink}>
                        github
                    </a>
                    {liveLink && (
                        <a
                            className="themed-text bg-primary p-2 px-4"
                            href={liveLink}>
                            link
                        </a>
                    )}
                </div>
            </div>
            <div className="h-full relative flex items-center justify-center rounded overflow-visible w-[48rem]">
                <Image src={'https://marimari.tech/cms' + desktopPreview.data.attributes.url} alt="" fill className="object-contain" />
            </div>
        </li>
    );
}
