import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  },
  build: {
    rollupOptions: {
      // Kaboom v3000 breaks when Vite minifies it.
      // Load it from CDN (see index.html) so the bundler never touches it.
      external: ['kaboom'],
      output: {
        globals: {
          kaboom: 'kaboom',
        },
      },
    },
  },
});
