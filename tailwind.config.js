/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {

        primary: "#1E1E2E",
        accent: "#9ECE6A",
        mirage: {
          '50': '#f4f6fa',
          '100': '#e6e9f3',
          '200': '#d3d8ea',
          '300': '#b4bedc',
          '400': '#919dc9',
          '500': '#7680bb',
          '600': '#6369ad',
          '700': '#585a9d',
          '800': '#4c4c81',
          '900': '#404168',
          '950': '#1e1e2e',
        },

      }
    },
  },
  plugins: [],
}

