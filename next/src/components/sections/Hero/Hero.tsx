'use client';
/* eslint-disable quotes */
import { LinkButton } from '@/components/Button';
import { Dot } from '@/components/Dot';
import { SlideInText } from '@/components/SlideInText';
import { motion } from 'framer-motion';
import Link from 'next/link';
const MotionLink = motion(Link);
export type HeroProps = {
    title?: string;
    subtitle?: string;
};
export function Hero({
    title = "Hi, I'm Omari",
    subtitle = 'I create 100% hand-coded websites with personalised results.',
}: HeroProps) {
    return (
        <motion.section
            className="dotted-none-section flex h-screen w-full flex-col items-center justify-center bg-theme px-12 text-theme-invert"
            id="#home"
            initial="hide"
            whileInView="show"
            transition={{ delayChildren: 0, staggerChildren: 0.5 }}
            variants={{ hide: {}, show: {} }}>
            <motion.header
                className="flex max-w-screen-xl flex-col items-center justify-center gap-5 text-center md:gap-10"
                transition={{ delayChildren: 0, staggerChildren: 0.5 }}>
                <motion.h1
                    className="text-7xl md:text-8xl"
                    variants={{ hide: {}, show: {} }}>
                    <SlideInText>
                        {title}
                        <Dot />
                    </SlideInText>
                </motion.h1>
                <motion.p
                    className=" text-xl font-semibold text-theme-subtitle-invert"
                    variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }}>
                    {subtitle}
                </motion.p>
                <LinkButton href="#about" size="lg" variant="themeInvert">
                    Learn More
                    <Dot />
                </LinkButton>
            </motion.header>

            
        </motion.section>
    );
}
