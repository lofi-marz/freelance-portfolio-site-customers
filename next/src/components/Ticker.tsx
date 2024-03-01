import { useState } from 'react';
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useTime,
    useTransform,
    Variants,
} from 'framer-motion';
import clsx from 'clsx';

const OptionVariants: Variants = {
    hide: { opacity: 0, y: '1em' },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '-1em' },
};
export function Ticker() {
    const colours = ['text-primary'];
    const options = [
        'bring their vision to life',
        'showcase their products',
        'create an online presence',
    ];
    const [optionIndex, setOptionIndex] = useState(0);
    const text = options[optionIndex];
    const colour = colours[optionIndex % colours.length];
    const time = useTime();
    const index = useTransform(time, (v) => {
        const seconds = Math.floor((0.5 * v) / 1000);
        return seconds % options.length;
    });

    useMotionValueEvent(index, 'change', (v) => {
        setOptionIndex(v);
        //setOptionIndex(0);
    });
    return (
        <div className=" relative flex w-full flex-col gap-8 bg-theme-invert px-12 py-48 md:gap-12 xl:px-40">
            <div className="flex flex-row flex-wrap items-start justify-start bg-theme-invert text-4xl font-bold text-theme md:text-4xl lg:text-5xl xl:items-center 2xl:text-6xl">
                <span className="w-fit md:flex md:h-[1lh] md:whitespace-pre lg:items-center">
                    I help businesses{' '}
                </span>
                <motion.div className="relative flex h-[2lh] w-full grow flex-col items-start justify-start overflow-clip sm:h-[1.25lh] lg:w-auto xl:justify-center">
                    <AnimatePresence>
                        <motion.span
                            key={text}
                            className={clsx('absolute', colour)}
                            initial="hide"
                            animate="show"
                            exit="exit"
                            variants={OptionVariants}
                            transition={{ ease: 'easeOut', duration: 1 }}>
                            {text}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>
            </div>
            <p className="max-w-screen-xl text-xl tracking-normal text-light md:text-3xl ">
                I specialize in small business web design and development.{' '}
                <br />
                Every line of code is written by hand to ensure the best
                performance, which helps bring in more customers to your site
                and bring more revenue to your business.
            </p>
        </div>
    );
}
