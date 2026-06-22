import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: process.env.NODE_ENV === 'production' ? '/threejs-edit/' : './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 8080,
    open: true,
  },
});
