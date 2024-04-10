'use client';
import { motion } from 'framer-motion';

export function Dot() {
    return (
        <motion.span
            className="h-fit w-fit origin-bottom text-primary transition-all group-hover:text-light"
            variants={{
                hide: { scale: 0 },
                show: { scale: 1 },
                exit: { scale: 0 },
            }}>
            .
        </motion.span>
    );
}
