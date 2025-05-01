/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'game-primary': '#4F46E5',
        'game-secondary': '#10B981',
        'game-background': '#1F2937',
      },
      animation: {
        'click-pulse': 'pulse 0.2s cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
} 