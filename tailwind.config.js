/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {},
    extend: {
      colors: {
        primary: "#009688",
        secondary: "#FF5722",
        background: "#F5F5F5",
        accent: "#673AB7",
        text: "#333333",
        "text-secondary": "#757575",
        success: "#4CAF50",
        warning: "#FFC107",
        error: "#F44336",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
