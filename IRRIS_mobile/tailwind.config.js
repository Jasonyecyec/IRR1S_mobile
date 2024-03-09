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
        mainColor: "#0037b1",
        secondaryColor: "#f2f8ff",
        thirdColor: "#f8faff",
        accentColor: "#f52400",
        iconGrayColor: "#9ba3ae",
        errorColor: "#FF0000",
        bottomNav:"#f7f7f7",
        background: "#e8ecf9",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
