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
import localFont from 'next/font/local';
export const title = localFont({
    src: './Satoshi-Variable.woff2',
    variable: '--font-title',
});
/*export const title = Work_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-title',
});*/
export const body = Inter({
    subsets: ['latin'],
    variable: '--font-body',
});
