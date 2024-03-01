import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { LoadingScreen } from '@/components/sections/LoadingScreen';

import { SlideInText } from '@/components/SlideInText';
import { title } from '../styles/fonts';
import { SocialsDesktop } from '@/components/sections/intro/Socials';
import { CallToAction } from '@/components/sections/intro/CallToAction';
import { Nav } from '@/components/index';
import { GetServerSideProps, GetStaticPaths } from 'next';
import { GetCurrentlyPlayingResponse } from '../utils/spotify';
import {
    AboutContent,
    getStrapiContent,
    GlobalContent,
    ProjectContent,
    TestimonialContent,
} from '../utils/strapi';
import { StrapiContentContextProvider } from '@/components/StrapiContextProvider';
import { Projects } from '@/components/sections/projects';
import qs from 'qs';
import { Contact } from '@/components/sections/contact';
import { WhyLeon } from '@/components/sections/whatido';
import { Bespoke } from '@/components/sections/bespoke';
import { Ticker } from '@/components/Ticker';
import { Testimonials } from '@/components/sections/Testimonials/Testimonials';
import { NextSeo } from 'next-seo';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Pricing } from '@/components/sections/Pricing';
import { Services } from '@/components/sections/Services';
import { LandingPage } from '@/components/LandingPage/LandingPage';
//const title = Poppins({ weight: ['600', '700', '800', '900'] });

const headingVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

const underlineVariants: Variants = {
    hidden: { width: '0%' },
    visible: { width: '100%', transition: { duration: 1, ease: 'easeInOut' } },
};

type HomeProps = {
    spotify: { currentlyPlaying: GetCurrentlyPlayingResponse };
    content: GlobalContent;
};

export default function Home({ content }: HomeProps) {
    if (content === undefined) return <div>Hi! Somethings gone wrong</div>;

    //TODO: Better error handling here
    return (
        <StrapiContentContextProvider strapiContent={content}>
            <NextSeo
                canonical="https://www.leondev.uk"
                title="Nottingham Web Design"
                description="Nottingham-based Bespoke Web Design & Development"
            />
            <LandingPage
                hero={{ subtitle: 'Nottingham-Based Web Design & Development' }}
                about={{
                    content: (
                        <>
                            I specialize in small business web design and
                            development for clients anywhere in Nottingham.
                            Every line of code is written by hand to ensure the
                            best performance, which helps bring in more
                            customers to your site and bring more revenue to
                            your business
                        </>
                    ),
                }}
                bespoke={{ title: 'Nottingham Web Design' }}
            />
        </StrapiContentContextProvider>
    );
}

export const getStaticProps: GetServerSideProps = async () => {
    const query = qs.stringify(
        {
            populate: '*',
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    //TODO: How do I scale this up for more data

    const [about = {}, projects = [], testimonials = []] = await Promise.all([
        //getSpotifyProps(),
        getStrapiContent<AboutContent>('about'),
        getStrapiContent<ProjectContent[]>('projects?' + query).then((ps) =>
            ps?.filter((p) => p.attributes.target !== 'job')
        ),
        getStrapiContent<TestimonialContent[]>('testimonials'),
    ]);

    return {
        props: { content: { about, projects, testimonials } },
        revalidate: 3600,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    //const res = await getLandingSlugs();
    //const paths = res.map(({ slug }) => `/${slug}`);
    const paths = ['/nottingham-web-design'];
    console.log(paths);
    return {
        paths,
        fallback: 'blocking',
    };
};
