/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        dacing: ["Dancing Script"],
      },
      backgroundColor: {
        "main-50": "#fffbeb",
        "main-100": "#fef3c7",
        "main-200": "#fef08a",
        "main-300": "#fde047",
        "main-400": "#facc15",
        "main-500": "#eab308",
        "main-600": "#ca8a04",
        "main-700": "#a16207",
        "main-800": "#854d0e",
        "main-900": "#713f12",
        "main-950": "#422006",
        "overlay-60": "rgba(0, 0, 0, 0.6)",
        "overlay-40": "rgba(0, 0, 0, 0.4)",
      },
      colors: {
        "main-50": "#fffbeb",
        "main-100": "#fef3c7",
        "main-200": "#fef08a",
        "main-300": "#fde047",
        "main-400": "#facc15",
        "main-500": "#eab308",
        "main-600": "#ca8a04",
        "main-700": "#a16207",
        "main-800": "#854d0e",
        "main-900": "#713f12",
        "main-950": "#422006",
      },
      width: {
        main: "1319px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
