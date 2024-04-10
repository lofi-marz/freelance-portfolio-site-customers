import { Dot } from '@/components/Dot';
import { ReactNode } from 'react';

export type AboutProps = {
    content?: ReactNode;
};

const defaultAbout =
    'I specialize in small business web design and development for clients anywhere in the UK. Every line of code is written by hand to ensure the best performance, which helps bring in more customers to your site and bring more revenue to your business';
export function About({ content = defaultAbout }: AboutProps) {
    return (
        <section
            className="px-6 py-12 pr-12 text-3xl font-semibold leading-snug tracking-tight md:h-screen md:px-40 md:pr-40 lg:text-6xl"
            id="about">
            {content}
            <Dot />
        </section>
    );
}
