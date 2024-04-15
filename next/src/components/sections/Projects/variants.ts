import { Variants } from 'framer-motion';

export const underlineVariants: Variants = {
    hide: { scaleX: 0 },
    show: { scaleX: 1, transition: { ease: 'easeOut' } },
};

export const verticalUnderlineVariants: Variants = {
    hide: { scaleY: 0 },
    show: { scaleY: 1, transition: { ease: 'easeOut', duration: 1 } },
};
export const projectTitleVariants: Variants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
};
