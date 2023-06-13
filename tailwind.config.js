/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        cyan: "hsl(var(--cyan))",
        orange: "hsl(var(--orange))",
        foreground: "hsl(var(--foreground))",
        background: "hsl(var(--background))",
      },
    },
  },
  plugins: [],
}
