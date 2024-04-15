import '@/styles/globals.css';

import clsx from 'clsx';

import { cn } from 'utils/utils';
import { Providers } from './providers';
import { Metadata } from 'next';
import { LocalBusinessJsonLd } from 'next-seo';
import { EmailSidebar } from '@/components/EmailSidebar';
import { ColumnOverlay } from '@/components/ColumnOverlay';

import {
    DM_Sans,
    IBM_Plex_Sans,
    Inter,
    Poppins,
    PT_Sans,
    Rubik,
    Vollkorn,
    Work_Sans,
} from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import localFont from 'next/font/local';
export const title = localFont({
    src: '../styles/Satoshi-Variable.woff2',
    variable: '--font-title',
});
/*export const title = Work_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-title',
});*/
export const body = GeistSans;

export const metadata: Metadata = {
    title: 'Nottingham-Based Bespoke Web Development',
    description: 'Nottingham-based freelance web developer.',
};

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={cn(title.variable, body.variable)}>
            <body
                className={cn(
                    'min-h-screen bg-theme font-title text-theme-invert '
                )}>
                <Providers>
                    <EmailSidebar />
                    <ColumnOverlay />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
