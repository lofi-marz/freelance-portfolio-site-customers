import { motion, Variants } from 'framer-motion';
import { WithChildrenProps } from '../types';
import clsx from 'clsx';
import { title } from '../fonts';

const lineVariants: Variants = {
    hidden: {
        transition: { duration: 0.1 },
    },
    visible: {
        transition: {
            staggerChildren: 0.1,
            ease: 'easeOut',
            bounce: 0,
            duration: 5,
        },
    },
};
const charVariants = {
    hidden: { y: '120%' },
    visible: {
        y: 0,
        transition: {
            ease: 'easeOut',
            bounce: 1,
            duration: 1,
        },
    },
};

function SlideInChar({ char }: { char: string }) {
    return <motion.div variants={charVariants}>{char}</motion.div>;
}

//TODO: Add some sort of reusability to this
export function SlideInText({
    children,
}: WithChildrenProps): JSX.Element | null {
    if (Array.isArray(children)) {
        return (
            <motion.div
                className={clsx('flex flex-col gap-2', title.className)}
                variants={lineVariants}
                transition={{ staggerChildren: 1 }}>
                {children.map((e) =>
                    typeof e === 'string' ? (
                        <motion.div
                            key={e}
                            className="flex flex-row overflow-clip"
                            variants={lineVariants}
                            transition={{ staggerChildren: 1 }}>
                            {[...e].map((c) => (
                                <SlideInChar key={c} char={c} />
                            ))}
                        </motion.div>
                    ) : null
                )}
            </motion.div>
        );
    }
    return null;
}
