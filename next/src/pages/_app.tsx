import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { NextSeo } from 'next-seo';
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
            <NextSeo
                title="Omari Leon - Nottingham-Based Bespoke Web Development"
                description="Nottingham-based freelance web developer."
            />
            <Component {...pageProps} />
            <Analytics />
        </ThemeProvider>
    );
}
