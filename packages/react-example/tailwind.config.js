import { extendZIndex } from '@z-index/tailwind-extend';
console.log(
  extendZIndex({
    config: [
      {
        name: 'modal',
        children: [{ name: 'overlay' }, { name: 'content' }, { name: 'input' }],
      },
      { name: 'tooltip' },
    ],
    base: 1000,
  })
);
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: extendZIndex({
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
