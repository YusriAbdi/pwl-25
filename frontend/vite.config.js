import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

/**
 * Konfigurasi Vite untuk proyek Vue 3.
 * Mengatur plugin Vue dan alias folder '@' agar merujuk ke folder 'src'.
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000, // Frontend berjalan di port 3000
    proxy: {
      // Mengarahkan permintaan API ke server Backend (Express)
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});