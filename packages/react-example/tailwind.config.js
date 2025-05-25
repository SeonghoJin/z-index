import { createZIndex } from '../tailwind-extend/dist/index.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: createZIndex({
        config: [
          {
            name: 'modal',
            children: [
              { name: 'overlay' },
              { name: 'content' },
              { name: 'input' },
            ],
          },
          { name: 'tooltip' },
        ],
        base: 1000,
      }),
    },
  },
  plugins: [],
};
