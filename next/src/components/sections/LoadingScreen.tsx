import { motion, useAnimationControls, Variants } from 'framer-motion';
import { useLayoutEffect } from 'react';

const loadingScreenVariants: Variants = {
    visible: { display: 'flex' },
    hidden: { display: 'none' },
};

const topRectVariants: Variants = {
    visible: { height: '100vh' },
    hidden: { height: '0vh', transition: { duration: 0.5, ease: 'easeOut' } },
};

const bottomRectVariants: Variants = {
    visible: { height: '10vh' },
    hidden: {
        height: '0vh',
        transition: { duration: 1, delay: 1, ease: 'easeInOut' },
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
            className="fixed top-0 z-50 w-screen flex-col items-center justify-start overflow-hidden font-title text-8xl font-bold text-theme"
            initial="visible"
            animate={controls}
            layoutId="intro-section"
            variants={{ visible: {}, hidden: {} }}
            transition={{ delay: 1, delayChildren: 1 }}
            style={{ originY: 0 }}>
            <motion.div
                className="flex w-full items-center justify-center bg-theme "
                variants={topRectVariants}>
                <motion.h1
                    animate={{
                        rotate: [-10, 10, -10, 10, 10, 10],
                        scale: [0.9, 1.1, 1.1, 1.1, 1, 0],
                    }}>
                    👋
                </motion.h1>
            </motion.div>
            <motion.div
                className="w-full bg-primary-500"
                variants={bottomRectVariants}
            />
        </motion.div>
    );
}
