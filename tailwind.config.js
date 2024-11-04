/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'bg-blue-400',
    'bg-blue-600',
    'bg-indigo-400',
    'bg-indigo-600',
    'bg-violet-400',
    'bg-violet-600',
    'bg-purple-400',
    'bg-purple-600',
    'bg-fuchsia-400',
    'bg-fuchsia-600',
    'bg-pink-400',
    'bg-pink-600',
    'bg-rose-400',
    'bg-rose-600',
    'bg-red-400',
    'bg-red-600',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};