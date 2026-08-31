/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0f19',
        card: '#141c2e',
        cardHover: '#1b253b',
        cyanNeon: '#00f3ff',
        pinkNeon: '#ff007f',
        emeraldNeon: '#00ff88',
        amberNeon: '#ffb700',
        purpleNeon: '#a855f7',
      },
      fontFamily: {
        sans: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        cyanGlow: '0 0 25px rgba(0, 243, 255, 0.4)',
        pinkGlow: '0 0 25px rgba(255, 0, 127, 0.4)',
        emeraldGlow: '0 0 25px rgba(0, 255, 136, 0.4)',
        amberGlow: '0 0 25px rgba(255, 183, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
