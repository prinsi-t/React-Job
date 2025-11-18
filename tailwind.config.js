/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            'mono': ['ui-monospace', 'SFMono-Regular'],
        },
        gridTemplateColumns: {
            '70/30': '70% 28%',
        },
    },
  },
  plugins: [],
}
