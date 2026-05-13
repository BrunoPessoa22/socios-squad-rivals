/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cobalt: {
          DEFAULT: '#1833cb',
          hover: '#2447e8',
        },
        accent: '#ff7359',
        gold: {
          400: '#f59e0b',
          500: '#d97706',
        },
        argblue: '#75AADB',
        porblue: '#4561ff',
        bragold: '#fcd34d',
        ink: {
          950: '#000',
          900: '#0a0a0c',
          800: '#111114',
          700: '#1a1a1f',
        },
        emerald: '#22c98a',
        crimson: '#ff4757',
      },
      fontFamily: {
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // exact sizes from real site
        'h1': ['48px', { lineHeight: '0.95', fontWeight: '800', letterSpacing: '-0.01em' }],
        'h2': ['28px', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.005em' }],
        'h3': ['15px', { lineHeight: '1.3', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
};
