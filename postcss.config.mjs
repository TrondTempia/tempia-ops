/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // <- riktig plugin
    autoprefixer: {},
  },
}
