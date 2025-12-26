import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Impor CSS global (Tailwind & Transisi)
import './assets/main.css';

/**
 * Inisialisasi Aplikasi Vue 3.
 * File ini menghubungkan App.vue sebagai root component,
 * mengaktifkan sistem navigasi (router),
 * dan memasang (mount) aplikasi ke elemen HTML dengan id 'app'.
 */
const app = createApp(App);

// Mengaktifkan Vue Router
app.use(router);

// Menempelkan aplikasi ke elemen #app di index.html
app.mount('#app');