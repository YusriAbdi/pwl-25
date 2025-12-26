/** @type {import('tailwindcss').Config} */
export default {
  /**
   * Menentukan file mana saja yang akan dipindai class Tailwind-nya.
   * Ini mencakup index.html dan semua file .vue di dalam folder src.
   */
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'humanity-blue': '#2563eb',
        'humanity-green': '#16a34a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}