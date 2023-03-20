import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DarkModeContextProvider } from '@/components/DarkModeContextProvider';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <DarkModeContextProvider>
            <Head>
                <title>Omari Thompson-Edwards</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
            <Analytics />
        </DarkModeContextProvider>
    );
}
