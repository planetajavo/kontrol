import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist-docs',
    rollupOptions: {
      input: {
        docs: path.resolve(__dirname, 'index-docs.html'),
      },
    },
  },
});
