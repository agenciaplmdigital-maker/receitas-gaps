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
        olive: '#556B2F',
        beige: '#F5F5DC',
        terracotta: '#C24B3E',
        sage: '#9CAF88',
        cream: '#FFFDD0',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(85, 107, 47, 0.08)',
        hover: '0 8px 20px rgba(85, 107, 47, 0.12)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1f2937',
            '[class~="lead"]': {
              color: '#4B5563',
            },
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
