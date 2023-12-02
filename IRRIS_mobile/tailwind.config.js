/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#2e39ac",
        secondaryColor: "#EEF2FF",
        thirdColor: "#f8faff",
        accentColor: "#7447EB",
        errorColor: "#FF0000",
        background: "#e8ecf9",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
