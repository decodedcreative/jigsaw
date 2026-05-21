import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
  resolve: {
    alias: [
      {
        find: '@providers/theme',
        replacement: resolve(__dirname, './src/providers/theme/index.ts'),
      },
      {
        find: '@providers',
        replacement: resolve(__dirname, './src/providers/index.ts'),
      },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components'),
      },
      {
        find: '@hooks',
        replacement: resolve(__dirname, './src/hooks'),
      },
      {
        find: '@utils',
        replacement: resolve(__dirname, './src/utils'),
      },
    ],
  },
});
