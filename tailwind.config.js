/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "gris-español": "#919191",
      "licorice-black": "#171412",
      "white-nav": "#ffffff",
      "white": "#ffffff",
      "resolution-blue": "#0E1863",
      "gris-antracita": "#3E3E3E"
    }
    ,
    boxShadow: {
      'google-auth': '0px 2px 3px 0px rgba(0, 0, 0, 0.2)',
    }
  },
  plugins: [],
};
