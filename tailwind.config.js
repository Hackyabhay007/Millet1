/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom Fonts
      fontFamily: {
        babesNeue: ['"Babes Neue"', 'sans-serif'],
        josefinSans: ['"Josefin Sans"', 'sans-serif'],
        plusJakartaSans: ['"Plus Jakarta Sans"', 'sans-serif'],
        afacadFlux: ['"Afacad Flux"', 'sans-serif'], // Adding Afacad Flux
      },
      // Existing Animation and Keyframes
      animation: {
        slideDown: 'slideDown 0.5s ease forwards',
        slideUp: 'slideUp 0.5s ease forwards',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
