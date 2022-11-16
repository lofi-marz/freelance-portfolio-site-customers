import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DarkModeContextProvider } from '@/components/DarkModeContextProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <DarkModeContextProvider>
            <Component {...pageProps} />;
        </DarkModeContextProvider>
    );
}
