import { MouseEventHandler, useEffect, useRef, useState } from 'react';

import theme from '../../../tailwind.config';
import {
    MotionValue,
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTime,
    useTransform,
} from 'framer-motion';

const CANVAS_WIDTH = 1920 / 1.5;
const CANVAS_HEIGHT = 1080 / 1.5;
const MAX_RADIUS = 50;
const MIN_RADIUS = 10;
const SPACING = 10;

const MOUSE_OFFSET_X = 25;
const MOUSE_OFFSET_y = MOUSE_OFFSET_X;

function Dot({
    x,
    y,
    followMouse,
}: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    followMouse: boolean;
}) {
    const reducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const time = useTime();
    const pos = ref.current?.getBoundingClientRect();
    const distance = useTransform(() => {
        if (typeof window === 'undefined') return 0;

        const dotX = pos?.x ?? 0;
        const dotY = pos?.y ?? 0;

        if (reducedMotion) {
            const sin = Math.sin((dotY + dotX) / 250);
            return ((sin + 1) / 2) * 0.2;
        }
        if (!followMouse) {
            //const sin = Math.sin(time.get() / 750 + dotX / 250);
            const t = time.get();
            const sin = Math.sin(t / 750 + dotX / 250 + dotY / 250);
            return ((sin + 1) / 2) * 0.5;
        }
        const xPos: number =
            (x.get() - MOUSE_OFFSET_X - dotX) / window.screen.width;
        const yPos: number =
            (y.get() - MOUSE_OFFSET_y - dotY) / window.screen.height;

        return Math.hypot(xPos, yPos);
    });

    const spring = useSpring(distance, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    const scale = useTransform(spring, (v) =>
        Math.min(1, Math.max(0.2, (1 - v) ** 5))
    );

    return (
        <motion.div className="aspect-square w-full">
            <motion.div
                className="aspect-square w-[90%] rounded-full bg-primary"
                style={{ scale }}
                ref={ref}
            />
        </motion.div>
    );
}

export function Dots({
    followMouse,
    x,
    y,
}: {
    followMouse: boolean;
    x: MotionValue<number>;
    y: MotionValue<number>;
}) {
    const [visible, setVisible] = useState(false);

    return (
        <motion.div
            className="mx-auto grid h-full w-full grid-cols-5 grid-rows-5 place-content-center place-items-center overflow-clip"
            initial="hide"
            whileInView="show"
            onViewportEnter={() => setVisible(true)}
            onViewportLeave={() => setVisible(true)}
            transition={{ delayChildren: 2 }}
            layout>
            {visible &&
                [...new Array(25)].map((_, i) => (
                    <Dot key={i} x={x} y={y} followMouse={followMouse} />
                ))}
        </motion.div>
    );
}
