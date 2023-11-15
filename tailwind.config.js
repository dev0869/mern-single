/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-in": "slide-in .5s ease-out",
        "slide-out": "slide-out .5s ease-in-out",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            left: "-100vw",
          },
          "100%": {
            left: "0vw",
          },
        },

        "slide-out": {
          "0%": {
            left: "0vw",
          },
          "100%": {
            left: "-100vw",
          },
        },
      },
      fontFamily: {
        body: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        main: "linear-gradient(95.69deg,#ac0000 0,#f00 26.35%,#ff3b3b 50.83%,#f00 72.71%,#f00 100%)",
        // "nav":"rgba(255, 255, 255, 0.795)",
      },
    },
  },
  plugins: [],
};

