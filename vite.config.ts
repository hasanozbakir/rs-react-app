/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
plugins: [react()],
css: {
  modules: {
    localsConvention: 'camelCase', // Optional: Use camelCase for CSS class names
  },
},
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/setupTests.ts',
  coverage: {
    provider: 'v8',  // Changed from c8 to v8
    reporter: ['text', 'json', 'html'],
    include: ['**/*.tsx'],
    exclude: [
      '**/node_modules/**',
      '**/*.test.tsx',
      '**/*.spec.tsx',
      'src/App.tsx',
      'src/main.tsx'
    ],
    thresholds: {
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70
    }
  }
}
});
