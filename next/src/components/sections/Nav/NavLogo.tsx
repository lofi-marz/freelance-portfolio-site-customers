'use client';
import { FaMousePointer } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Dot } from '../../Dot';

import { cn } from 'utils/utils';
import { PropsWithClassName } from 'types';

export function NavLogo({ className }: PropsWithClassName) {
    return (
        <motion.div
            className={cn(
                'heading flex flex-row items-center  justify-center gap-1 text-3xl',
                className
            )}
            layout>
            <span className="md:hidden">
                ln
                <Dot />
            </span>
            <span className="hidden md:inline">
                leon
                <Dot />
            </span>
        </motion.div>
    );
}
