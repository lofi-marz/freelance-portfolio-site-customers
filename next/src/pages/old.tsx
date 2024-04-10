import { Variants } from 'framer-motion';

import { Nav } from '@/components/index';
import { GetServerSideProps } from 'next';
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
import { Bespoke } from '@/components/sections/bespoke';
import { NextSeo } from 'next-seo';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { LandingPageWrapper } from '@/components/LandingPage';

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
            <NextSeo canonical="https://www.leondev.uk" />
            <LandingPageWrapper>
                <Nav />
                <Hero />



                <Contact />
                <Footer />
            </LandingPageWrapper>
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
