import test from '../../../../content/projects/restaurant-landing-page/desktop.png';
import Image from 'next/image';
import clsx from 'clsx';
import { text, title } from '../../../fonts';
import { FaGithub, FaLink } from 'react-icons/fa';

type ProjectInfo = {
    title: string;
    description: string;
    deploymentUrl?: string;
    githubUrl: string;
};

type ProjectProps = ProjectInfo & { odd?: boolean };

export function Projects() {
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
                <Project
                    title="Restaurant Landing Page"
                    description="This was mainly for design purposes; I wanted a smaller-scale, few-day project without much logic.
I might implement more of these one day. Making up imaginary businesses is quite fun."
                    githubUrl="https://google.com"
                    deploymentUrl="https://google.com"
                />
                <Project
                    title="Restaurant Landing Page"
                    description="This was mainly for design purposes; I wanted a smaller-scale, few-day project without much logic.
I might implement more of these one day. Making up imaginary businesses is quite fun."
                    githubUrl="https://google.com"
                    deploymentUrl="https://google.com"
                    odd
                />
            </ul>
        </section>
    );
}

function Project({
    title,
    description,
    githubUrl,
    deploymentUrl,
    odd = false,
}: ProjectProps) {
    return (
        <li
            className={clsx(
                'flex items-start justify-center gap-16',
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
                        href={githubUrl}>
                        github
                    </a>
                    {deploymentUrl && (
                        <a
                            className="themed-text bg-primary p-2 px-4"
                            href={deploymentUrl}>
                            link
                        </a>
                    )}
                </div>
            </div>
            <div className="w-full">
                <Image src={test} alt="alt" className="" />
            </div>
        </li>
    );
}
