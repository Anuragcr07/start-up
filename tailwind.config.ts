import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'work-sans': ['Work Sans', 'sans-serif'], // Keep Work Sans if you still need it
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        'text-dark': 'var(--text-color-dark)',
        'text-light': 'var(--text-color-light)',
        'background-light': 'var(--background-light)',
        'background-dark': 'var(--background-dark)',
        'border-color': 'var(--border-color)',
        // ... other colors
      },
      boxShadow: {
        'xl': '0 10px 30px rgba(0, 0, 0, 0.2)',
        'lg': '0 8px 20px rgba(0, 0, 0, 0.08)',
        'md': '0 5px 15px rgba(0, 0, 0, 0.05)',
        'sm': '0 3px 10px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // If you're using this for .prose
  ],
}
export default config;
