import { motion, useAnimationControls, Variants } from 'framer-motion';
import { useEffect } from 'react';
import { useDarkModeContext } from '@/components/DarkModeContextProvider';

const loadingScreenVariants: Variants = {
    visible: { width: '100%' },
    hidden: { width: '100%', transition: { delay: 1, duration: 1 } },
};

type LoadingScreenProps = { onEnd: () => void };

export function LoadingScreen({ onEnd }: LoadingScreenProps) {
    const controls = useAnimationControls();

    useEffect(() => {
        controls.start('hidden').then(() => onEnd());
    }, []);

    return (
        <motion.div
            className="fixed top-0 z-10 flex h-screen w-screen items-center justify-center bg-white text-white dark:bg-stone-800"
            initial="visible"
            animate={controls}
            layoutId="intro-section"
            variants={loadingScreenVariants}>
            <motion.h1
                layoutId="greeting"
                className="font-title text-8xl font-bold"
                animate={{
                    rotate: [-10, 10, -10, 10, 10],
                    scale: [0.9, 1.1, 1.1, 1.1, 1],
                }}>
                👋
            </motion.h1>
        </motion.div>
    );
}
