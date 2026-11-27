/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome Premium Palette (Black, White, Slate)
        vermillion: {
          DEFAULT: '#14382C',
          hover: '#1B4D3E',
          light: '#F0FDF4',
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#14382C',
          600: '#1B4D3E',
          700: '#0E2A20',
        },
        obsidian: {
          DEFAULT: '#121316',
          surface: '#18191E',
          card: '#1F2026',
          border: '#2A2C35',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        pine: {
          DEFAULT: '#121316',
          dark: '#0F1014',
          deep: '#0B0D0F',
          light: '#F8FAFC',
          50: '#F8FAFC',
          100: '#F1F5F9',
          500: '#121316',
          600: '#252830',
          700: '#121316',
        },
        bone: {
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E2E8F0',
          dark: '#F8FAFC',
        },
        raisin: {
          DEFAULT: '#121316',
          dark: '#0B0D0F',
          light: '#334155',
          muted: '#64748B',
        },
        theme: {
          primary: '#121316',
          secondary: '#121316',
          bg: '#FFFFFF',
          surface: '#FFFFFF',
          text: '#121316',
          muted: '#64748B',
          subtle: '#94A3B8',
          accent: '#121316',
          accentHover: '#252830',
          border: '#E2E8F0',
        },
        gold: {
          DEFAULT: '#121316',
          hover: '#252830',
          light: '#F8FAFC',
          dark: '#0B0D0F',
        },
        navy: {
          950: '#0B0D0F',
          900: '#121316',
          850: '#18191E',
          800: '#1F2026',
          700: '#334155',
          600: '#475569',
        },
        charcoal: {
          DEFAULT: '#121316',
          muted: '#64748B',
          subtle: '#94A3B8',
          border: '#E2E8F0',
          bg: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(18, 19, 22, 0.05), 0 2px 6px -1px rgba(18, 19, 22, 0.02)',
        'card': '0 8px 30px -4px rgba(18, 19, 22, 0.06), 0 4px 10px -2px rgba(18, 19, 22, 0.03)',
        'elevated': '0 20px 40px -5px rgba(18, 19, 22, 0.10), 0 10px 15px -3px rgba(18, 19, 22, 0.04)',
        'vermillion': '0 10px 25px -5px rgba(18, 19, 22, 0.25)',
      }
    },
  },
  plugins: [],
}
