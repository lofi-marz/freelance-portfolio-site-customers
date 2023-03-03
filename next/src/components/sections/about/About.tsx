import clsx from 'clsx';
import { title } from 'fonts';
import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import { CallToAction } from '@/components/sections/intro/CallToAction';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';

export default function About() {
    const { about } = useStrapiContentContext()!;
    return (
        <section
            id="about"
            className={clsx(
                'themed-text themed-bg relative flex h-screen w-full flex-col items-center justify-center gap-8',
                title.className
            )}>
            <p className="p-6 text-center text-3xl font-medium leading-[1.25em] md:text-4xl md:leading-[1.2em] lg:w-4/5">
                {about.attributes.aboutText}
            </p>
            <CallToAction />
        </section>
    );
}
