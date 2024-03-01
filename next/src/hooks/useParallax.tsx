import { MutableRefObject, useRef } from 'react';
import { MotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[number]>['offset']; //Should this be this hard
export function useParallax<T extends number | string>(
    scrollRef: MutableRefObject<null>,
    range: [T, T],
    offset?: ScrollOffset,
    springMotion = false
) {
    // @ts-ignore
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: offset,
    });
    const spring = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 100,
        mass: 1,
        restDelta: 0.001,
    });

    return useTransform(springMotion ? spring : scrollYProgress, [0, 1], range);
}
