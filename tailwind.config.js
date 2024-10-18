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
      // Animation for 3D flip effect
      animation: {
        flip: 'flip 0.8s ease-in-out',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
      },
      spacing: {
        '300': '300px',
        '200': '200px',
      },
      // Extend to include perspective
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}
