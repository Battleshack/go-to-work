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
        'game-primary': 'var(--game-primary)',
        'game-secondary': 'var(--game-secondary)',
        'game-accent': 'var(--game-accent)',
        'game-accent-dark': 'var(--game-accent-dark)',
        'game-success': 'var(--game-success)',
        'game-success-dark': 'var(--game-success-dark)',
        'game-warning': 'var(--game-warning)',
        'game-warning-dark': 'var(--game-warning-dark)',
        'game-text': 'var(--game-text)',
        'game-background-start': 'var(--game-background-start)',
        'game-background-end': 'var(--game-background-end)',
      },
      animation: {
        'click-pulse': 'pulse 0.2s cubic-bezier(0, 0, 0.2, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 