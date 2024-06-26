import { Logo } from '../Logo';
import Link from 'next/link';
import { Dot } from '../Dot';
import { PropsWithChildren } from 'react';
import { PropsWithClassName } from '@/types';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';
type FooterSectionProps = { title: string } & PropsWithChildren;
function FooterSection({ title, children }: FooterSectionProps) {
    return (
        <div className="flex grow flex-col gap-4">
            <h3 className="text-2xl">{title}</h3>
            <div className="flex flex-col items-start justify-start gap-4 text-theme-subtitle-invert">
                {children}
            </div>
        </div>
    );
}

const footerVariants = cva(
    'flex w-full flex-row flex-wrap gap-8 px-12 py-24 font-semibold',
    {
        variants: {
            section: {
                blog: 'padding-page mx-auto max-w-4xl md:px-12',
                default: 'lg:px-40 2xl:px-60',
            },
        },
        defaultVariants: { section: 'default' },
    }
);
type FooterProps = VariantProps<typeof footerVariants>;
export function Footer({ section }: FooterProps) {
    return (
        <footer className={cn(footerVariants({ section }))}>
            <div className="heading flex grow flex-col items-start gap-4">
                <Logo size="lg" />
                <p className="text-theme-subtitle-invert">
                    Web design & development for small businesses <br />
                    Proudly based in Nottingham, UK
                </p>
            </div>
            <FooterSection title="Get in Touch">
                <Link
                    href="tel:07532819604"
                    className="w-fit underline underline-offset-4 transition-all hover:underline-offset-8">
                    07532 819604
                </Link>
                <Link
                    href="mailto:hello@leondev.uk"
                    className="w-fit underline underline-offset-4 transition-all hover:underline-offset-8">
                    hello@leondev.uk
                </Link>
            </FooterSection>
        </footer>
    );
}
