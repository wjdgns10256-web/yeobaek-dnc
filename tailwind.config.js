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
        // '여백' 컨셉에 맞춘 차분한 애쉬그레이 포인트 컬러.
        accent: {
          DEFAULT: "#8A8172",
          50: "#F5F4F2",
          100: "#E8E4DE",
          200: "#D3CDC3",
          300: "#B9B1A3",
          400: "#9E9484",
          500: "#8A8172",
          600: "#746B5C",
          700: "#5B5346",
          800: "#423C33",
          900: "#2A2621",
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
