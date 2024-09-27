/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{html,jsx,js}",
    // "node_modules/flowbite-react/lib/esm/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      extend: {
        '-1/2': '-50%',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

