// const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
   
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px', // Custom 'xs' breakpoint for smaller phones
      },
    },
  },
  plugins: [require('daisyui')
  ],
  
}