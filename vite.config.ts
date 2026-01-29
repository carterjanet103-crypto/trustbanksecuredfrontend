import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // REMOVE the specific repo name for Vercel
  base: '/', 
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: 'esbuild',
  },
});
