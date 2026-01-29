import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // This ensures assets load correctly on carterjanet103-crypto.github.io/trustbanksecuredfrontend/
  base: '/trustbanksecuredfrontend/', 
  plugins: [react()],
  build: {
    // This is where the production-ready files will go
    outDir: 'dist',
    // Generates smaller files for faster loading
    minify: 'esbuild',
  },
});
