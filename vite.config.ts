import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { manifest } from './webmanifest';

export default defineConfig({
  plugins: [
    vue({ script: { defineModel: true } }),
    VitePWA({
      manifest,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
