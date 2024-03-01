import Link from 'next/link';
import { VariantProps, cva } from 'class-variance-authority';
import { WithChildrenProps, WithClassNameProps } from 'types';
import { cn } from 'utils/utils';
import { Dot } from './Dot';

const buttonVariants = cva(
    'ring-offset-background focus-visible:ring-ring group inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-light hover:bg-primary/90',
                theme: 'bg-theme text-theme-invert hover:bg-primary hover:text-light',
                themeInvert:
                    'bg-theme-invert text-theme hover:bg-primary hover:text-light',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'border bg-theme hover:bg-grey-900 dark:border-grey-900',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-full px-3',
                lg: 'h-14 rounded-full px-8 text-lg',
                xl: 'h-12 rounded-full px-10 text-3xl',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

interface ButtonVariants extends VariantProps<typeof buttonVariants> {}
type LinkButtonProps = { href: string } & WithChildrenProps &
    WithClassNameProps &
    ButtonVariants;
export function LinkButton({
    className,
    variant,
    size,
    children,
    href,
}: LinkButtonProps) {
    return (
        <Link
            href={href}
            className={cn(buttonVariants({ variant, size, className }))}>
            {children}
        </Link>
    );
}

export function CTA(props: Omit<LinkButtonProps, 'children' | 'href'>) {
    return (
        <LinkButton href="#contact" variant="themeInvert" size="lg" {...props}>
            Let's chat
            <Dot />
        </LinkButton>
    );
}
