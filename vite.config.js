import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/rumlevo-birdmap/',
  build: {
    rollupOptions: {
      input: 'index.html',
    }
  }
})
