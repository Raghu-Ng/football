/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary" : '#001489', // Warm orange
        // Professional cream theme colors
        'cream': {
          50: '#fefcf8',
          100: '#fdf8f0',
          200: '#faf0e1',
          300: '#f6e7d1',
          400: '#f1ddc0',
          500: '#ebd3ae',
          600: '#e4c89b',
          700: '#dcbc87',
          800: '#d3af72',
          900: '#c9a15c'
        },
        'warm-cream': '#f8f5f0',
        'soft-cream': '#faf7f2',
        'rich-cream': '#f5f1ea',
        // Enhanced orange palette for light theme
        'warm-orange': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        }
      },
      backgroundImage: {
        'cream-gradient': 'linear-gradient(135deg, #faf7f2 0%, #f5f1ea 50%, #f0ebe2 100%)',
        'warm-gradient': 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)',
      },
      animation: {
        'theme-switch': 'theme-switch 0.3s ease-in-out',
        'parallax-float': 'parallax-float 6s ease-in-out infinite',
        'cream-glow': 'cream-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'theme-switch': {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'parallax-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        'cream-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(249, 115, 22, 0.4)' },
        },
      },
      boxShadow: {
        'cream': '0 4px 20px rgba(249, 115, 22, 0.1)',
        'cream-lg': '0 10px 40px rgba(249, 115, 22, 0.15)',
        'warm': '0 4px 20px rgba(234, 88, 12, 0.1)',
      }
    },
  },
  plugins: [],
};