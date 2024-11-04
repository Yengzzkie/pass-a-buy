/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
import withMT from "@material-tailwind/react/utils/withMT"

export default withMT({
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
    screens: {
      "full": '100%'
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
})

