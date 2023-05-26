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
import { useStrapiContentContext } from '@/components/StrapiContextProvider';

function shorten(name: string) {
    const [first, last] = name.split(' ');
    return `${first} ${last[0]}.`;
}
const QuoteVariants: Variants = {
    hide: { opacity: 0, x: '-100%' },
    show: { opacity: 1, x: '0' },
    exit: { opacity: 0, x: '100%' },
};
const NameVariants: Variants = {
    hide: { opacity: 0, y: '0lh' },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '0lh' },
};
export function Testimonials() {
    const { testimonials } = useStrapiContentContext()!;
    const [quoteIndex, setQuoteIndex] = useState(0);
    const time = useTime();
    const index = useTransform(time, (v) => {
        const seconds = Math.floor((0.5 * v) / 2000);
        return seconds % testimonials.length;
    });
    useMotionValueEvent(index, 'change', (v) => {
        setQuoteIndex(v);
        //setOptionIndex(0);
    });
    return (
        <motion.section
            className="relative z-20 flex w-full flex-col items-center justify-start overflow-clip bg-primary px-24 py-20 font-title text-4xl"
            layout>
            <Quote />
            <AnimatePresence presenceAffectsLayout={false} mode="popLayout">
                <motion.blockquote
                    className="themed-text-invert flex h-[20vh] items-center justify-start py-6 text-start text-xl leading-tight md:h-32 md:text-4xl"
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
                    className="w-full text-start text-2xl font-bold text-dark-800"
                    variants={NameVariants}
                    initial="hide"
                    animate="show"
                    exit="exit"
                    transition={{ ease: 'easeOut', duration: 1 }}>
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
                'themed-text flex w-full flex-row text-4xl font-bold md:text-9xl',
                end && 'justify-end'
            )}>
            {end ? <FaQuoteRight /> : <FaQuoteLeft />}
        </div>
    );
}
