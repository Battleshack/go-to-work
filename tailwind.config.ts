import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        game: {
          primary: '#0F5057', // Dark teal
          secondary: '#0FB0C1', // Light teal
          accent: '#FF522E', // Red accent
          'accent-dark': '#820B1C', // Dark red
          success: '#46C97D', // Green
          'success-dark': '#1D571F', // Dark green
          warning: '#F0F557', // Yellow
          'warning-dark': '#9C702B', // Dark yellow
          text: '#252525', // Dark gray for text
          background: {
            start: '#A9F1F7', // Light teal background
            end: '#448589', // Darker teal background
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      textColor: {
        'game-text': '#252525',
      },
    },
  },
  plugins: [],
}

export default config 