/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      'black': '#2D2D2D',
      'darkerblue': '#090A0E',
      'darkblue': '#122242',
      'brightblue': '#1d3ab0',
      'brighterblue': '#3152d7',
      'navyblue': '#0A00A6',
      'grey': '#4A5263',
      'lightgray': '#DEE3EB',
      'lightergray': '#DEE3EB',
      'white': '#FFF',
    }
  },
  plugins: [
     require('flowbite/plugin')
  ],
}

