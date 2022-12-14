import test from '../../../../content/projects/restaurant-landing-page/desktop.png';
import Image from 'next/image';
import path from 'path';
import clsx from 'clsx';
import { text, title } from '../../../fonts';
import { FaGithub, FaLink } from 'react-icons/fa';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import { ProjectContent } from 'utils/strapi';

type ProjectProps = ProjectContent['attributes'] & { odd?: boolean };

export function Projects() {
    const {projects} = useStrapiContentContext()!;
    console.log('Projects:', projects);
    return (
        <section
            className={clsx(
                'themed-bg themed-text absolute flex min-h-screen w-full flex-col items-center justify-center gap-4',
                title.className
            )}
            id="projects">
            <h2 className="text-7xl font-bold">
                projects <div className="-mt-1 h-4 w-2/3 bg-primary"></div>
            </h2>
            <ul className="flex w-full flex-col gap-32 p-16">
                {projects.map((p) => <Project key={p.id} {...p.attributes} />)}
            </ul>
        </section>
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
    console.log('Desktop:', desktopPreview);
    return (
        <li
            className={clsx(
                'flex items-start justify-center gap-16 h-96',
                odd && 'flex-row-reverse'
            )}>
            <div className="mt-16 flex w-2/3 flex-col gap-8">
                <div className="text-5xl font-bold">
                    {title}
                    <div className="-mt-3 h-4 w-1/2 bg-primary"></div>
                </div>
                <div className={clsx('text-xl', text.className)}>
                    {description}
                </div>
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
            <div className="w-full h-full relative">
                <Image src={'https://marimari.tech/cms'+desktopPreview.data.attributes.url} alt="" fill className="object-contain"></Image>
            </div>
        </li>
    );
}
