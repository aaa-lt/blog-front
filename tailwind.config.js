/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-pre-bg': '#282c34',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-pre-bg': theme('colors.custom-pre-bg'),
            maxWidth: 'none',
            img: {
              maxHeight: '300px',
              margin: 'auto',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}
