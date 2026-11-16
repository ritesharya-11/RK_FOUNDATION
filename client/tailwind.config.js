/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Authentic Reference Color Palette from Dribbble UI
        vermillion: {
          DEFAULT: '#F67708',
          hover: '#E06800',
          light: '#FFF4EB',
          50: '#FFF7ED',
          100: '#FFEDD5',
          500: '#F67708',
          600: '#E06800',
          700: '#C25500',
        },
        pine: {
          DEFAULT: '#036C6C',
          dark: '#024747',
          deep: '#013535',
          light: '#E8F4F3',
          50: '#F0F9F8',
          100: '#D7ECE9',
          500: '#036C6C',
          600: '#025858',
          700: '#024747',
        },
        bone: {
          DEFAULT: '#FAF7F2',
          card: '#FAF6F0',
          border: '#E3D9CF',
          dark: '#D8CCBF',
        },
        raisin: {
          DEFAULT: '#323D3D',
          dark: '#1E2525',
          light: '#4E5B5B',
          muted: '#697777',
        },
        theme: {
          primary: '#036C6C',
          secondary: '#024747',
          bg: '#FAF7F2',
          surface: '#FFFFFF',
          text: '#323D3D',
          muted: '#697777',
          subtle: '#9CA3AF',
          accent: '#F67708',
          accentHover: '#E06800',
          border: '#E3D9CF',
        },
        gold: {
          DEFAULT: '#F67708',
          hover: '#E06800',
          light: '#FFF4EB',
          dark: '#C25500',
        },
        navy: {
          950: '#012828',
          900: '#023838',
          850: '#024747',
          800: '#036C6C',
          700: '#0E7E7E',
          600: '#1D9292',
        },
        charcoal: {
          DEFAULT: '#323D3D',
          muted: '#697777',
          subtle: '#9CA3AF',
          border: '#E3D9CF',
          bg: '#FAF7F2',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(3, 108, 108, 0.05), 0 4px 6px -2px rgba(3, 108, 108, 0.02)',
        'card': '0 10px 25px -5px rgba(50, 61, 61, 0.06), 0 8px 10px -6px rgba(50, 61, 61, 0.03)',
        'elevated': '0 20px 35px -5px rgba(3, 108, 108, 0.12), 0 10px 10px -5px rgba(3, 108, 108, 0.04)',
        'vermillion': '0 10px 25px -5px rgba(246, 119, 8, 0.35)',
        'teal': '0 10px 25px -5px rgba(3, 108, 108, 0.30)',
      }
    },
  },
  plugins: [],
}
