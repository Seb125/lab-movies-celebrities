/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./views/movies/**/*.hbs", // Files in the "movies" subdirectory
  "./views/celebrities/**/*.hbs", // Files in the "celebrities" subdirectory
  "./views/*.hbs"],
  theme: {
    extend: {},
  },
  plugins: [],
}

