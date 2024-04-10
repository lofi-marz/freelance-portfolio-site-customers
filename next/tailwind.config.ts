import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';

import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';
import reactAria from 'tailwindcss-react-aria-components';

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
                body: [
                    'var(--font-geist-sans)',
                    ...defaultTheme.fontFamily.sans,
                ],
                title: ['var(--font-title)', ...defaultTheme.fontFamily.sans],
            },
            padding: ({ theme }) => ({
                'page-mobile': theme('spacing.6'),
                'page-lg': theme('spacing.40'),
            }),
            colors: {
                primary: colors.emerald[500],
                secondary: colors.green,
                grey: colors.stone,
                light: colors.stone[50],
                dark: colors.stone[950],
                'subtitle-light': colors.stone[200],
                'subtitle-dark': colors.stone[700],
                theme: 'var(--theme)',
                'theme-invert': 'var(--theme-invert)',
                'theme-subtitle': 'var(--theme-subtitle)',
                'theme-subtitle-invert': 'var(--theme-subtitle-invert)',
            },
            dropShadow: { solid: '0px 5px 0px #059669' },
        },
    },
    plugins: [
        forms,
        typography,
        reactAria,
        plugin(({ matchUtilities, theme }) =>
            matchUtilities(
                {
                    'grid-auto-fill': (value) => ({
                        gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))`,
                    }),
                },
                { values: theme('spacing') }
            )
        ),
        plugin(function ({
            addUtilities,
            matchUtilities,
            addComponents,
            theme,
        }) {
            addUtilities({
                '.light': {
                    '--theme': theme('colors.light'),
                    '--theme-invert': theme('colors.dark'),
                    '--theme-subtitle': theme('colors.subtitle-light'),
                    '--theme-subtitle-invert': theme('colors.subtitle-dark'),
                },
                '.dark': {
                    '--theme': theme('colors.dark'),
                    '--theme-invert': theme('colors.light'),
                    '--theme-subtitle': theme('colors.subtitle-dark'),
                    '--theme-subtitle-invert': theme('colors.subtitle-light'),
                },
            });
            matchUtilities(
                {
                    'card-solid': (value) => ({
                        backgroundColor: value,
                        textColor: theme('colors.light'),
                    }),
                    'card-theme-solid': (value) => ({
                        backgroundColor: value,
                        textColor: theme('colors.theme'),
                    }),
                    'card-theme-invert-solid': (value) => ({
                        backgroundColor: value,
                        textColor: theme('colors.theme-invert'),
                    }),
                },
                { values: theme('colors') }
            );
        }),
    ],
} satisfies Config;

export default t;

export const themeColors = t.theme?.extend?.colors!;
