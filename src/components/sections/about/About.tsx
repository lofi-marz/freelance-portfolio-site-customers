import clsx from 'clsx';
import { title } from 'fonts';
import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import { CallToAction } from '@/components/sections/intro/CallToAction';

export default function About() {
    return (
        <section
            id="about"
            className={clsx(
                'themed-text themed-bg relative flex h-screen w-full flex-col items-center justify-center gap-8',
                title.className
            )}>
            <p className="p-6 text-center text-3xl font-bold leading-[1.25em] md:text-6xl md:leading-[1.2em] lg:w-2/3">
                Hi, I&apos;m Omari. I&apos;m a Web Developer from England,
                currently studying in Nottingham. I like making fun, creative
                things with code.
            </p>
            <CallToAction />
        </section>
    );
}
