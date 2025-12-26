<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navbar akan selalu muncul di bagian atas semua halaman -->
    <Navbar />

    <!-- Konten utama yang berubah-ubah sesuai rute (Router View) -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <!-- Transisi fade agar perpindahan halaman terasa lebih halus dan modern -->
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer Global -->
    <footer class="bg-white border-t py-10">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="bg-blue-600 p-1.5 rounded-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span class="text-lg font-bold text-blue-600">HumanityCare</span>
          </div>
          <p class="text-sm text-gray-400">
            &copy; 2023 HumanityCare. Platform Donasi Kemanusiaan Terpercaya.
          </p>
          <div class="flex gap-6 text-sm font-medium text-gray-500">
            <a href="#" class="hover:text-blue-600 transition-colors">Tentang Kami</a>
            <a href="#" class="hover:text-blue-600 transition-colors">Bantuan</a>
            <a href="#" class="hover:text-blue-600 transition-colors">Kontak</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
/**
 * Note: Pastikan file Navbar.vue sudah ada di folder components.
 * Gaya CSS global (Tailwind) sudah diatur melalui main.js yang mengacu pada assets/main.css.
 */
</script>

<style>
/* Animasi Transisi Halaman */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mengatur scrollbar global agar seragam di semua halaman dashboard */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>