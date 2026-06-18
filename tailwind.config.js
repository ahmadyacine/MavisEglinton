/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/**/*.html",
    "./js/**/*.js",
    "./template.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f4c3a', // Deep healthcare green
          DEFAULT: '#1c7a5f', // Medium fresh green
          light: '#e8f5f1', // Soft pale green
          yellow: '#f5b041', // Warm yellow
          orange: '#e67e22', // Muted orange
          gray: '#334155', // Dark charcoal for text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
