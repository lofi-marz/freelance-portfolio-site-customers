import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';

import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';
import reactAria from 'tailwindcss-react-aria-components';
//@ts-ignore
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette';
const t: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                title: ['var(--font-title)', ...defaultTheme.fontFamily.sans],
                body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: colors.emerald,
                secondary: colors.violet,
                grey: colors.stone,
                light: colors.stone[50],
                dark: colors.stone[950],
                theme: 'var(--theme)',
                'theme-invert': 'var(--theme-invert)',
            },
        },
    },
    plugins: [
        reactAria,
        forms,
        typography,
        plugin(function ({ addUtilities, matchUtilities, theme }) {
            addUtilities({
                '.light': {
                    '--theme': theme('colors.light'),
                    '--theme-invert': theme('colors.dark'),
                },
                '.dark': {
                    '--theme': theme('colors.dark'),
                    '--theme-invert': theme('colors.light'),
                },
            });
        }),
    ],
} satisfies Config;

export default t;

export const themeColors = t.theme?.extend?.colors!;
