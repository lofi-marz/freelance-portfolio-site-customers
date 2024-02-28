import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo, LocalBusinessJsonLd, NextSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            forcedTheme="light">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="google-site-verification"
                    content="Yt65GonydGAWX9LfJcUou4dacAjaH7vOS5Q8kmZzxHs"
                />
            </Head>
            <DefaultSeo
                title="leon. | Nottingham-Based Bespoke Web Development"
                description="Nottingham-based freelance web developer."
                openGraph={{
                    title: 'leon.',
                    description: 'Nottingham-Based Bespoke Web Development',
                    images: [
                        {
                            url: 'https://leondev.uk/og.png',
                            width: 1280,
                            height: 720,
                            alt: 'leon.',
                        },
                    ],
                }}
            />
            <LocalBusinessJsonLd
                type="store"
                id="https://leondev.uk"
                name="Leon Web Design"
                description="Nottingham-based Bespoke Web Development"
                address={undefined}
            />
            <Component {...pageProps} />
            <Analytics />
        </ThemeProvider>
    );
}
