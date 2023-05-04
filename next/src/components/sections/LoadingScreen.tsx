import { motion, useAnimationControls, Variants } from 'framer-motion';
import { useEffect, useLayoutEffect } from 'react';
import { useDarkModeContext } from '@/components/DarkModeContextProvider';

const loadingScreenVariants: Variants = {
    visible: { display: 'flex' },
    hidden: { display: 'none' },
};

const topRectVariants: Variants = {
    visible: { height: '100vh' },
    hidden: { height: '0vh', transition: { duration: 2, ease: 'easeOut' } },
};

const bottomRectVariants: Variants = {
    visible: { height: '10vh' },
    hidden: {
        height: '0vh',
        transition: { duration: 1, delay: 1, ease: 'easeOut' },
    },
};

type LoadingScreenProps = { onEnd: () => void };

export function LoadingScreen({ onEnd }: LoadingScreenProps) {
    const controls = useAnimationControls();

    useLayoutEffect(() => {
        controls.start('hidden').then(() => onEnd());
    }, [controls, onEnd]);

    return (
        <motion.div
            className="themed-text fixed top-0 z-50 flex min-h-screen w-screen flex-col items-center justify-start overflow-hidden font-title text-3xl font-bold"
            initial="visible"
            animate={controls}
            layoutId="intro-section"
            variants={{ visible: {}, hidden: {} }}
            transition={{ delay: 1 }}
            style={{ originY: 0 }}>
            <motion.div
                className="themed-bg flex w-full items-center justify-center overflow-hidden"
                variants={topRectVariants}>
                hey.
            </motion.div>
            <motion.div
                className="w-full bg-primary"
                variants={bottomRectVariants}
            />
        </motion.div>
    );
}
