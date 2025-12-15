/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'christmas-red': '#c41e3a',
        'christmas-green': '#228b22',
        'christmas-gold': '#ffd700',
        'snow': '#fffafa',
        'pine': '#1e4d2b'
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
        'body': ['system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
