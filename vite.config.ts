import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/trustbanksecuredfrontend/', // This MUST match your GitHub repo name exactly
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
