import { defineConfig } from 'vite';
// import fs from 'fs'
// import path from 'path'
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
//   base: 'rumlevo-birdmap',
//     server: {
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
//       cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
//     }
//   }
});

