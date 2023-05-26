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
    const colours = ['text-black'];
    const options = [
        'bring their vision to life',
        'showcase their products',
        'establish an online presence',
    ];
    const [optionIndex, setOptionIndex] = useState(0);
    const text = options[optionIndex];
    const colour = colours[optionIndex % colours.length];
    const time = useTime();
    const index = useTransform(time, (v) => {
        const seconds = Math.floor((1.35 * v) / 2000);
        return seconds % options.length;
    });

    useMotionValueEvent(index, 'change', (v) => {
        setOptionIndex(v);
        //setOptionIndex(0);
    });
    return (
        <div className="relative flex w-full flex-col items-start justify-center bg-primary px-20 py-24 font-title text-4xl font-bold text-light lg:justify-start lg:text-5xl xl:flex-row xl:items-center">
            <span className="md:flex md:h-[1lh] md:whitespace-pre lg:items-center">
                I help businesses{' '}
            </span>
            <motion.div className="relative flex h-[3lh] w-full flex-col items-start justify-start overflow-clip sm:h-[1.2lh] xl:h-[1.2lh] xl:w-auto xl:grow xl:justify-center">
                <AnimatePresence>
                    <motion.span
                        key={text}
                        className={clsx('absolute', colour)}
                        initial="hide"
                        animate="show"
                        exit="exit"
                        variants={OptionVariants}
                        transition={{ ease: 'easeOut' }}>
                        {text}
                    </motion.span>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
