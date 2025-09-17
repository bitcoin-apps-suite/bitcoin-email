/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'bitcoin-orange': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        'bitcoin-red': {
          50: '#ffebeb',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff4444',
          500: '#ff3333',
          600: '#cc0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
        dark: {
          100: '#1a1a1a',
          200: '#2a2a2a',
          300: '#3a3a3a',
        }
      },
      fontFamily: {
        'display': ['SF Pro Display', 'Helvetica Neue', 'system-ui'],
      }
    },
  },
  plugins: [],
}