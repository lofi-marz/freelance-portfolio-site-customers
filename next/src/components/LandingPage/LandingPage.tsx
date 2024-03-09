import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { LoadingScreen } from '@/components/sections/LoadingScreen';

import { SlideInText } from '@/components/SlideInText';
import { title } from '../../styles/fonts';
import { SocialsDesktop } from '@/components/sections/intro/Socials';
import { CallToAction } from '@/components/sections/intro/CallToAction';
import { Nav } from '@/components/index';
import { GetServerSideProps } from 'next';
import { GetCurrentlyPlayingResponse } from '../../utils/spotify';
import {
    AboutContent,
    getStrapiContent,
    GlobalContent,
    ProjectContent,
    TestimonialContent,
} from '../../utils/strapi';
import { StrapiContentContextProvider } from '@/components/StrapiContextProvider';
import { Projects } from '@/components/sections/projects';
import qs from 'qs';
import { Contact } from '@/components/sections/contact';
import { WhyLeon } from '@/components/sections/whatido';
import { Bespoke, BespokeProps } from '@/components/sections/bespoke';
import { Ticker } from '@/components/Ticker';
import { Testimonials } from '@/components/sections/Testimonials/Testimonials';
import { NextSeo } from 'next-seo';
import { Footer } from '@/components/sections/Footer';
import { Hero, HeroProps } from '@/components/sections/Hero';
import { About, AboutProps } from '@/components/sections/About';
import { Pricing } from '@/components/sections/Pricing';
import { Services } from '@/components/sections/Services';
import { WithChildrenProps } from 'types';
//const title = Poppins({ weight: ['600', '700', '800', '900'] });

const headingVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

const underlineVariants: Variants = {
    hidden: { width: '0%' },
    visible: { width: '100%', transition: { duration: 1, ease: 'easeInOut' } },
};

type LandingPageProps = {
    hero?: HeroProps;
    about?: AboutProps;
    bespoke?: BespokeProps;
};

export function LandingPageWrapper({ children }: WithChildrenProps) {
    return (
        <motion.div
            className={clsx(
                'relative flex min-h-screen w-full flex-col items-center justify-center bg-theme font-title text-theme'
            )}
            id="home">
            <motion.div className="relative w-full snap-y snap-mandatory bg-theme text-theme-invert">
                {children}
            </motion.div>
        </motion.div>
    );
}
