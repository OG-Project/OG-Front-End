
import { min } from 'date-fns'



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
   
    extend: {
      
      colors:{
        'roxoEscuro' : '#36213E',
        'roxo' : '#620BA7',
        'brancoNeve' : '#FBFBFB',
        'background-black': '3353139',
        'clickBorder' :'#ECC3FF',
        'error' : '#CD0000',
        'correct' : '#29CD00',
        'info' : '#36213E',
        'roxoAtencao' : '#8E00FF',
        'cinza-escuro': '#484848',
        'cinza-claro': '#D7D7D7',
        'roxo-claro': '#DBB3FF',

      width:{
        
      },
      fontFamily:{
        'Poppins' : 'Poppins, sans-serif',
        'Source Sans 3':'Source Sans 3, sans-serif'
      },

    },
  },
  plugins: [],
}
}
