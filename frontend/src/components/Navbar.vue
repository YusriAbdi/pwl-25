<template>
  <nav class="bg-white border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2">
          <div class="bg-blue-600 p-2 rounded-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <span class="text-xl font-bold tracking-tight text-blue-600">HumanityCare</span>
        </router-link>
        
        <!-- Menu Navigasi -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-gray-600 hover:text-blue-600 font-medium transition">Jelajah</router-link>
          
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="text-gray-600 hover:text-blue-600 font-medium transition">Masuk</router-link>
            <router-link to="/register" class="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition shadow-sm font-bold">Daftar</router-link>
          </template>
          
          <template v-else>
            <router-link to="/dashboard" class="text-gray-600 hover:text-blue-600 font-medium transition">Dashboard</router-link>
            <div class="flex items-center gap-4 pl-4 border-l">
              <span class="text-sm font-bold text-gray-700">{{ userName }}</span>
              <button @click="handleLogout" class="text-red-500 hover:text-red-700 text-sm font-bold">Keluar</button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLoggedIn = computed(() => !!localStorage.getItem('token'));
const userName = computed(() => localStorage.getItem('name'));

const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
};
</script>