'use client';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';

import { BespokeProps } from '@/components/sections/bespoke';
import { HeroProps } from '@/components/sections/Hero';
import { AboutProps } from '@/components/sections/About';
import { PropsWithChildren } from 'react';

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

export function LandingPageWrapper({ children }: PropsWithChildren) {
    return (
        <motion.div
            className={clsx(
                'dotted-section relative flex min-h-screen w-full flex-col items-center justify-center bg-theme font-title text-theme'
            )}
            id="home">
            <motion.div className="relative w-full snap-y snap-mandatory bg-theme text-theme-invert">
                {children}
            </motion.div>
        </motion.div>
    );
}
