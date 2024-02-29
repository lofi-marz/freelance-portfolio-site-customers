import { FaMousePointer } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Dot } from '../../Dot';
import { WithChildrenProps, WithClassNameProps } from 'types';

export function NavLogo({ className }: WithClassNameProps) {
    return (
        <motion.div
            className="flex flex-row items-center justify-center gap-1 tracking-wide"
            layout>
            <FaMousePointer className="text-primary-400" />{' '}
            <span className="md:hidden">
                Ln
                <Dot />
            </span>
            <span className="heading hidden md:inline">
                leon
                <Dot />
            </span>
        </motion.div>
    );
}
