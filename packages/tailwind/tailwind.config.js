/** @type {import('tailwindcss').Config} */
const path = require('path')
const nativewindPreset = require('nativewind/preset')

const workspaceRoot = path.resolve(__dirname, '../..')

module.exports = {
  content: [
    path.join(workspaceRoot, 'packages/app/**/*.{js,jsx,ts,tsx}'),
    path.join(workspaceRoot, 'apps/expo/**/*.{js,jsx,ts,tsx}'),
    path.join(workspaceRoot, 'apps/next/**/*.{js,jsx,ts,tsx,mdx}'),
    // Exclude node_modules to avoid scanning thousands of dependency files
    `!${path.join(workspaceRoot, '**/node_modules')}`,
    `!${path.join(workspaceRoot, '**/node_modules/**')}`,
  ],
  presets: [nativewindPreset],
  theme: {
    extend: {
      colors: {
        primary: '#ff4400',
        'background-light': '#f8f6f5',
        'background-dark': '#23140f',
      },
    },
  },
  plugins: [],
  important: 'html',
}
