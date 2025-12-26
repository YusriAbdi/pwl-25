<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Buat Akun Baru</h2>
        <p class="text-gray-500 text-sm mt-1">Bergabunglah dalam komunitas kemanusiaan kami</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input v-model="form.name" type="text" class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email" class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="form.password" type="password" class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Daftar Sebagai</label>
          <select v-model="form.role" class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="user">Donatur</option>
            <option value="field_worker">Petugas Lapangan</option>
          </select>
        </div>

        <div v-if="success" class="p-3 bg-green-50 text-green-600 text-xs rounded-lg font-medium text-center">
          Pendaftaran berhasil! Silakan masuk.
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ loading ? 'Memproses...' : 'Daftar' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500">
        Sudah punya akun? 
        <router-link to="/login" class="text-blue-600 font-bold hover:underline">Masuk</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const loading = ref(false);
const success = ref(false);

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'user'
});

const handleRegister = async () => {
  loading.value = true;
  try {
    await api.post('/auth/register', form);
    success.value = true;
    setTimeout(() => router.push('/login'), 2000);
  } catch (err) {
    alert(err.response?.data?.message || 'Gagal mendaftar.');
  } finally {
    loading.value = false;
  }
};
</script>