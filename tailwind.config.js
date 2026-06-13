/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        voire: {
          bg: '#F8F7F4',
          charcoal: '#1C1C1E',
          sand: '#C9B99A',
          burgundy: '#8B3A3A',
          border: '#E8E6E1',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
