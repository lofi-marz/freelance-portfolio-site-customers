'use client';
import clsx from 'clsx';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import {
    useTime,
    useTransform,
    motion,
    useMotionValueEvent,
    AnimatePresence,
    Variants,
} from 'framer-motion';
import { useState } from 'react';
import { getTestimonials } from 'utils/strapi/strapi-rsc';
import { TestimonialContent } from 'utils/strapi';

function shorten(name: string) {
    const [first, last] = name.split(' ');
    return `${first} ${last[0]}.`;
}
const QuoteVariants: Variants = {
    hide: { opacity: 0, x: '0%' },
    show: { opacity: 1, x: '0' },
    exit: { opacity: 0, x: '0%' },
};
const NameVariants: Variants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
};
export function Testimonials({
    testimonials,
}: {
    testimonials: TestimonialContent[];
}) {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const time = useTime();
    const index = useTransform(time, (v) => {
        const seconds = Math.floor((0.5 * v) / 4000);
        return seconds % testimonials.length;
    });
    useMotionValueEvent(index, 'change', (v) => {
        setQuoteIndex(v);
    });
    return (
        <motion.section
            className="relative z-20 flex w-full flex-col items-center justify-center overflow-clip bg-primary px-12 py-24 font-title text-4xl md:px-40 lg:h-screen"
            layout>
            <Quote />
            <AnimatePresence presenceAffectsLayout={false} mode="wait">
                <motion.blockquote
                    className="flex h-[20vh] items-center justify-start py-6 text-start text-xl font-semibold leading-tight text-theme md:h-1/2 md:text-5xl"
                    key={'quote-' + quoteIndex}
                    variants={QuoteVariants}
                    initial="hide"
                    animate="show"
                    exit="exit"
                    transition={{ ease: 'easeInOut', duration: 1 }}>
                    {testimonials[quoteIndex].attributes.text}
                </motion.blockquote>
                <motion.div
                    key={'name-' + quoteIndex}
                    className="text-dark-50 w-full text-start text-2xl font-bold"
                    variants={NameVariants}
                    initial="hide"
                    animate="show"
                    exit="exit"
                    transition={{
                        ease: 'easeIn',
                        duration: 1,
                        opacity: { duration: 0.5 },
                    }}>
                    {shorten(testimonials[quoteIndex].attributes.name)}
                </motion.div>
            </AnimatePresence>

            <Quote end />
        </motion.section>
    );
}

function Quote({ end = false }: { end?: boolean }) {
    return (
        <div
            className={clsx(
                'flex w-full flex-row text-4xl font-bold text-theme opacity-20 md:text-9xl',
                end && 'justify-end'
            )}>
            {end ? <FaQuoteRight /> : <FaQuoteLeft />}
        </div>
    );
}
