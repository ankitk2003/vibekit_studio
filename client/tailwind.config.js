/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',      // Mobile: 320px–480px
        'sm': '480px',      // Mobile upper bound
        'md': '768px',      // Tablet: 768px–1024px
        'lg': '1024px',     // Tablet upper bound / Desktop lower
        'xl': '1280px',     // Desktop: 1280px+
        '2xl': '1536px',    // Large desktop
      },
      spacing: {
        '11': '2.75rem',
        '13': '3.25rem',
        '21': '5.25rem',
      },
      minHeight: {
        '44': '2.75rem',    // Touch target minimum (44px)
      },
      minWidth: {
        '44': '2.75rem',    // Touch target minimum (44px)
      },
    },
  },
  plugins: [],
}