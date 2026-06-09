import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          from: '#6366f1',
          to: '#3b82f6',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1, #3b82f6)',
        'gradient-primary-hover': 'linear-gradient(135deg, #4f46e5, #2563eb)',
      },
    },
  },
  plugins: [],
};

export default config;
