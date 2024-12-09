/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        spinDots: "spinDots 1s infinite steps(8)",
      },
      keyframes: {
        spinDots: {
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
}

