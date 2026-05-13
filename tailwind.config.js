/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07080b',
          900: '#0c0e13',
          800: '#11141b',
          700: '#181c25',
          600: '#222732',
          500: '#2f3542',
          400: '#4a5160',
          300: '#717a8a',
          200: '#a4abb8',
          100: '#d4d8de',
        },
        accent: {
          DEFAULT: '#ff2d4a',
          hover: '#ff4761',
          soft: 'rgba(255,45,74,0.12)',
        },
        gold: '#f5b942',
        emerald: '#22c98a',
        crimson: '#ff4757',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,45,74,0.4), 0 8px 32px -8px rgba(255,45,74,0.5)',
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px -16px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'pitch-gradient':
          'linear-gradient(180deg, #0d3b22 0%, #0a2e1b 50%, #07241432 100%)',
        'pitch-stripes':
          'repeating-linear-gradient(180deg, rgba(255,255,255,0.04) 0 40px, transparent 40px 80px)',
      },
    },
  },
  plugins: [],
};
