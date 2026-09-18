/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          950: '#050507',
          900: '#0a0a0f',
          800: '#0f0f16',
          700: '#16161f',
          600: '#1e1e2a',
          500: '#2a2a38',
          400: '#3a3a4a',
          300: '#5a5a6e',
          200: '#8a8a9e',
          100: '#b8b8c8',
          50: '#e8e8f0',
        },
        accent: {
          DEFAULT: '#c4a86f',
          light: '#e0c896',
          dark: '#9a7f4a',
        },
        steel: {
          DEFAULT: '#6b7a8f',
          light: '#8a9aaf',
          dark: '#4a5a6f',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 1s ease-out forwards',
        'slow-pan': 'slowPan 20s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowPan: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(-20px) translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
