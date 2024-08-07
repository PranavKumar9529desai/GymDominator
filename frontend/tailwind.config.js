/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        metal: "#4B4B4B",
      },

      fontFamily: {
        pop: ["Poppins"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
      },
    },
  },
  variants: [],
  plugins: [],
};
