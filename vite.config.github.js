import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'https://postmodernistx.github.io/recipe-manager/',
  build: {
    outDir: './docs',
  },
});
