/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'text-type': 'typing 2s steps(20, end), blink-caret .75s step-end infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out'
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'orange' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.9' }
        }
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(210, 40%, 50%)',
          light: 'hsl(210, 40%, 70%)',
          dark: 'hsl(210, 40%, 30%)',
        },
        secondary: {
          DEFAULT: 'hsl(30, 100%, 50%)',
          light: 'hsl(30, 100%, 70%)',
          dark: 'hsl(30, 100%, 30%)',
        },
        background: {
          light: 'hsl(0, 0%, 98%)',
          dark: 'hsl(240, 10%, 10%)',
        },
        text: {
          light: 'hsl(240, 10%, 20%)',
          dark: 'hsl(0, 0%, 95%)',
        },
        card: {
          light: 'hsl(0, 0%, 100%)',
          dark: 'hsl(240, 10%, 15%)',
        },
        border: {
          light: 'hsl(240, 10%, 85%)',
          dark: 'hsl(240, 10%, 25%)'
        }
      }
    }
  },
  plugins: [],
}
