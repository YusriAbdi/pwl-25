<template>
  <div class="space-y-6">
    <!-- Header Halaman -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Panel Administrasi</h1>
        <p class="text-sm text-gray-500">Kelola kampanye, verifikasi donasi, dan pantau statistik platform.</p>
      </div>
      <button 
        @click="showCreateModal = true"
        class="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Buat Kampanye Baru
      </button>
    </div>

    <!-- Kartu Statistik -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div class="flex items-center gap-4 mb-4">
          <div class="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Donasi</span>
        </div>
        <p class="text-3xl font-extrabold text-gray-900">Rp 1.250.000.000</p>
        <p class="text-xs text-green-600 mt-2 font-medium">↑ 12% dari bulan lalu</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div class="flex items-center gap-4 mb-4">
          <div class="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span class="text-sm font-bold text-gray-400 uppercase tracking-wider">Donatur Aktif</span>
        </div>
        <p class="text-3xl font-extrabold text-gray-900">4.829</p>
        <p class="text-xs text-gray-500 mt-2">Tersebar di seluruh Indonesia</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div class="flex items-center gap-4 mb-4">
          <div class="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span class="text-sm font-bold text-gray-400 uppercase tracking-wider">Kampanye Berjalan</span>
        </div>
        <p class="text-3xl font-extrabold text-gray-900">24</p>
        <p class="text-xs text-orange-600 mt-2 font-medium">5 Kampanye butuh laporan</p>
      </div>
    </div>

    <!-- Tabel Manajemen Kampanye -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-50 flex justify-between items-center">
        <h2 class="font-bold text-gray-800 text-lg">Daftar Kampanye</h2>
        <div class="flex gap-2">
          <input 
            type="text" 
            placeholder="Cari kampanye..." 
            class="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/10"
          >
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-gray-100">
              <th class="px-6 py-4">Kampanye</th>
              <th class="px-6 py-4">Target Dana</th>
              <th class="px-6 py-4">Terkumpul</th>
              <th class="px-6 py-4 text-center">Status</th>
              <th class="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="c in campaigns" :key="c.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <span class="font-bold text-gray-800 text-sm">{{ c.title }}</span>
                  <span class="text-xs text-gray-400">Dibuat oleh: {{ c.creator }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">Rp {{ formatCurrency(c.target_amount) }}</td>
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-bold text-blue-600">Rp {{ formatCurrency(c.current_amount) }}</span>
                  <div class="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-blue-500 h-full" :style="{ width: (c.current_amount/c.target_amount*100) + '%' }"></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <span 
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  :class="c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                >
                  {{ c.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../../api';

// State Kampanye
const campaigns = ref([
  { id: 1, title: 'Bantuan Banjir Demak', creator: 'Admin Utama', target_amount: 500000000, current_amount: 120000000, status: 'active' },
  { id: 2, title: 'Renovasi Sekolah NTT', creator: 'Admin Utama', target_amount: 250000000, current_amount: 250000000, status: 'completed' },
  { id: 3, title: 'Ambulans Kemanusiaan', creator: 'Andi Lapangan', target_amount: 750000000, current_amount: 450000000, status: 'active' },
]);

const showCreateModal = ref(false);

/**
 * Memformat angka ke format mata uang Rupiah
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID').format(value);
};

onMounted(async () => {
  try {
    const res = await api.get('/campaigns');
    if (res.data.length > 0) {
      // campaigns.value = res.data; // Aktifkan jika API sudah siap
    }
  } catch (err) {
    console.error("Gagal mengambil data kampanye:", err);
  }
});
</script>