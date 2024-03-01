import { FaMousePointer } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { WithChildrenProps, WithClassNameProps } from 'types';
import { cn } from 'utils/utils';
import { Dot } from './Dot';
import { VariantProps, cva } from 'class-variance-authority';
import { SlideInText } from './SlideInText';
const logoVariants = cva(
    'heading flex flex-row items-center  justify-center gap-1',
    {
        variants: {
            size: {
                sm: 'text-2xl',
                lg: 'text-4xl',
                default: 'text-3xl',
            },
        },
        defaultVariants: { size: 'default' },
    }
);
type LogoProps = VariantProps<typeof logoVariants> & { responsive?: boolean };
export function Logo({ size, responsive = false }: LogoProps) {
    return (
        <motion.div
            className={cn(
                'heading flex flex-row items-center  justify-center gap-1 text-3xl',
                logoVariants({ size })
            )}
            initial="hide"
            animate="show"
            layout>
            {responsive && (
                <span className="md:hidden">
                    ln
                    <Dot />
                </span>
            )}

            <span className={cn(responsive && 'hidden md:inline')}>
                <SlideInText>
                    leon
                    <Dot />
                </SlideInText>
            </span>
        </motion.div>
    );
}
