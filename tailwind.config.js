/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#161616",
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#333333",
          900: "#1f1f1f",
          950: "#131313",
        },
        accent: {
          DEFAULT: "#E85C24",
          50: "#FDF2EC",
          100: "#FBE3D4",
          200: "#F6C4A6",
          300: "#F0A277",
          400: "#EC8250",
          500: "#E85C24",
          600: "#C6491A",
          700: "#9E3A16",
          800: "#742B10",
          900: "#4C1C0A",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
