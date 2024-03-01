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
            className="flex h-screen w-full flex-col items-center justify-center bg-theme px-12 text-theme-invert"
            id="#home"
            initial="hide"
            whileInView="show"
            transition={{ delayChildren: 0.5, staggerChildren: 0.5 }}
            variants={{ hide: {}, show: {} }}>
            <motion.header
                className="flex max-w-screen-xl flex-col items-center justify-center gap-5 text-center md:gap-10"
                transition={{ delayChildren: 0.5, staggerChildren: 0.5 }}>
                <motion.h1
                    className="text-7xl after:content-none md:text-8xl"
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

            <MotionLink
                href="mailto:hello@leondev.uk"
                className="heading fixed left-0 z-40 hidden -rotate-90 text-light mix-blend-difference md:block"
                style={{ rotate: '-90deg' }}
                initial="hide"
                animate="show"
                transition={{ delay: 2 }}
                variants={{ hide: { x: -100 }, show: { x: 0 } }}>
                hello@leondev.uk
            </MotionLink>
        </motion.section>
    );
}
