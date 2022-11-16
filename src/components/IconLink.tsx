import { AnimatePresence, motion, Variants } from 'framer-motion';
import { WithChildrenProps } from '../types';

type IconLinkProps = {
    href: string;
} & WithChildrenProps;

export function IconLink({ href, children }: IconLinkProps) {
    return (
        <a
            key={href}
            href={href}
            className="rounded p-3 text-2xl transition-all">
            {children}
        </a>
    );
}

const iconBackgroundVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

type AnimatedIconLinkProps = IconLinkProps & {
    index: number | null;
    social: number;
    onEnter: (index: number | null) => void;
};

export function AnimatedIconLink({
    href,
    children,
    index,
    social,
    onEnter,
}: AnimatedIconLinkProps) {
    return (
        <a
            onMouseEnter={() => onEnter(social)}
            key={href}
            href={href}
            target="_blank"
            className="relative flex items-center justify-center overflow-clip rounded p-2 text-3xl transition-all"
            rel="noreferrer">
            {index === social && (
                <AnimatePresence>
                    <motion.div
                        className="absolute h-full w-full rounded bg-red-400"
                        layoutId="social"
                        key="social"
                        variants={iconBackgroundVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    />
                </AnimatePresence>
            )}
            <div className="relative z-10">{children}</div>
        </a>
    );
}
