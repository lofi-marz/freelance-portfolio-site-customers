import '@/styles/globals.css';

import clsx from 'clsx';
import { title, body } from '@/styles/fonts';

import { cn } from 'utils/utils';
import { Providers } from './providers';
import { Metadata } from 'next';
import { LocalBusinessJsonLd } from 'next-seo';
import { EmailSidebar } from '@/components/EmailSidebar';
import { ColumnOverlay } from '@/components/ColumnOverlay';
import { GeistSans } from 'geist/font/sans';
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
            <body className={cn('bg-theme font-title text-theme-invert')}>
                <Providers>
                    <EmailSidebar />
                    <ColumnOverlay />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
