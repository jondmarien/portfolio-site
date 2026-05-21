import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { renderSeoHead } from './src/lib/renderSeoHead.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-seo-head',
      transformIndexHtml(html) {
        return html.replace('<!--seo-head-->', renderSeoHead());
      },
    },
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 20000,
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/]react/,
              priority: 20,
            },
            {
              name: 'three-vendor',
              test: /node_modules[\\/]three/,
              maxSize: 250000,
              priority: 15,
            },
            {
              name: 'vendor',
              test: /node_modules/,
              priority: 10,
            },
            {
              name: 'common',
              minShareCount: 2,
              minSize: 10000,
              priority: 5,
            },
          ],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    setupFiles: './src/test/setup.js',
  },
});
