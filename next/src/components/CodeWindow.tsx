import { MotionValue, motion } from 'framer-motion';
import { useParallax } from 'hooks/useParallax';
import { useRef } from 'react';
import { FaCode } from 'react-icons/fa';
import { cn } from 'utils/utils';

export function CodeWindow() {
    const containerRef = useRef(null);

    const yOffset: MotionValue<number> = useParallax(
        containerRef,
        [0, 0],
        ['start end', 'center center']
    );
    return (
        <motion.div
            ref={containerRef}
            className="flex aspect-video w-full flex-col overflow-clip rounded-xl bg-theme-invert"
            style={{ y: yOffset }}>
            <div className=" flex h-6 w-full gap-2 bg-primary p-1 px-2">
                {['bg-red-400', 'bg-amber-400', 'bg-green-400'].map((c) => (
                    <div
                        key={c}
                        className={cn('aspect-square h-full rounded-full', c)}
                    />
                ))}
            </div>
            <div className="flex grow items-center justify-center">
                <FaCode className="text-9xl text-primary" />
            </div>
        </motion.div>
    );
}
