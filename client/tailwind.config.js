/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: '#0B0D17',
          secondary: '#171923',
          bg: '#F7F7F5',
          surface: '#FFFFFF',
          text: '#151A2D',
          muted: '#697386',
          subtle: '#A0A4AE',
          accent: '#FFC43D',
          accentHover: '#EBAF20',
          border: '#E8E8E5',
        },
        gold: {
          DEFAULT: '#FFC43D',
          hover: '#EBAF20',
          light: '#FFF9E6',
          dark: '#D49D24',
          50: '#FFFDF5',
          100: '#FFF9E6',
          200: '#FFF0BF',
          300: '#FFE699',
          400: '#FFD766',
          500: '#FFC43D',
          600: '#EBAF20',
          700: '#C7900F',
          800: '#9E7008',
          900: '#735004',
        },
        navy: {
          950: '#06070D',
          900: '#0B0D17',
          850: '#111420',
          800: '#171923',
          700: '#232638',
          600: '#353A52',
        },
        charcoal: {
          DEFAULT: '#151A2D',
          muted: '#697386',
          subtle: '#A0A4AE',
          border: '#E8E8E5',
          bg: '#F7F7F5',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(11, 13, 23, 0.05), 0 4px 6px -2px rgba(11, 13, 23, 0.02)',
        'card': '0 10px 25px -5px rgba(11, 13, 23, 0.06), 0 8px 10px -6px rgba(11, 13, 23, 0.03)',
        'elevated': '0 20px 35px -5px rgba(11, 13, 23, 0.10), 0 10px 10px -5px rgba(11, 13, 23, 0.04)',
        'gold': '0 10px 25px -5px rgba(255, 196, 61, 0.35)',
      }
    },
  },
  plugins: [],
}
