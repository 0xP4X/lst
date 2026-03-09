/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#020617', // Main background (Deep Navy)
          surface: '#0D0D0D', // Card/Sheet background
          border: 'rgba(255, 255, 255, 0.12)', // Glass border
        },
        accent: {
          purple: '#8B5CF6', // Primary Purple
          teal: '#14B8A6',   // Context Teal
          red: '#EF4444',    // Destructive
          cyan: '#06B6D4',   // Fullstack accent
        }
      },
      backdropBlur: {
        xs: '2px',
        glass: '12px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      }
    },
  },
  plugins: [],
}
