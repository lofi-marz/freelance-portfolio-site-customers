import clsx from 'clsx';
import { title } from 'fonts';
import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';

export default function About() {
    return (
        <section
            className={clsx(
                'themed-text themed-bg relative flex h-screen w-full items-center justify-center',
                title.className
            )}>
            <p className="w-1/2 text-center text-6xl leading-10">
                Hi, I&apos;m Omari. I&apos;m a Web Developer from England,
                currently studying at the University of Nottingham. I like
                making fun, creative things with code.
            </p>
        </section>
    );
}
