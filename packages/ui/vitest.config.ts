import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@storybook/jest': 'vitest',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '../src/test/setup.ts',
    coverage: {
      // config coverage
      all: true,
      provider: 'c8',
      reporter: ['text', 'html', 'json'],
      exclude: ['node_modules'],
    },
  },
});
