import { FaMousePointer } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Dot } from '../../Dot';
import { WithChildrenProps, WithClassNameProps } from 'types';
import { cn } from 'utils/utils';

export function NavLogo({ className }: WithClassNameProps) {
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
