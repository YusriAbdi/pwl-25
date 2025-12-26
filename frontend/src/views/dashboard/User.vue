<template>
  <div class="space-y-6">
    <!-- Ringkasan Statistik -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Donasi</p>
          <p class="text-2xl font-black text-gray-900">Rp {{ formatCurrency(totalDonated) }}</p>
        </div>
      </div>
      <div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aksi Terbantu</p>
          <p class="text-2xl font-black text-gray-900">{{ donations.length }} Kampanye</p>
        </div>
      </div>
    </div>

    <!-- Bagian Riwayat Donasi -->
    <div v-if="loading" class="py-20 text-center">
      <div class="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-gray-400 text-sm font-medium uppercase tracking-widest">Memuat Riwayat...</p>
    </div>

    <div v-else class="space-y-6">
      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <h2 class="font-bold text-lg mb-4 text-gray-800">Riwayat Donasi Saya</h2>
        
        <!-- Jika Belum Pernah Berdonasi -->
        <div class="text-center py-12" v-if="donations.length === 0">
          <div class="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-gray-500 font-medium">Anda belum pernah berdonasi.</p>
          <router-link to="/" class="text-blue-600 font-bold mt-4 inline-block hover:underline">
            Mulai Donasi Sekarang →
          </router-link>
        </div>

        <!-- Tabel Riwayat Jika Ada Data -->
        <div v-else class="overflow-x-auto -mx-6">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-gray-100">
                <th class="px-6 py-4">Kampanye</th>
                <th class="px-6 py-4">Tanggal</th>
                <th class="px-6 py-4 text-right">Nominal</th>
                <th class="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-50">
              <tr v-for="c in donations" :key="c.id" class="hover:bg-gray-50/50 transition-colors">
                <!-- KAMPANYE + FOTO -->
                <td class="px-6 py-5">
                  <div class="flex items-center gap-4">
                    <!-- FOTO KAMPANYE -->
                    <div class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                      <img v-if="c.foto" :src="c.foto" class="w-full h-full object-cover" alt="Foto Kampanye" />
                      <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    <!-- JUDUL -->
                    <div>
                      <span class="font-bold text-gray-800 text-sm block">{{ c.campaign_title }}</span>
                      <span class="text-[10px] text-gray-400 font-medium tracking-tight">ID: #{{ c.id }}</span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-5 text-sm text-gray-500 font-medium">
                  {{ formatDate(c.created_at) }}
                </td>

                <td class="px-6 py-5 text-right font-black text-gray-900 text-sm">
                  Rp {{ formatCurrency(c.amount) }}
                </td>

                <td class="px-6 py-5 text-center">
                  <span class="px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-tight">
                    Berhasil
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../../api';

// State
const donations = ref([]);
const loading = ref(true);

// Hitung total donasi
const totalDonated = computed(() => {
  return donations.value.reduce((sum, item) => sum + parseFloat(item.amount), 0);
});

// Format Angka
const formatCurrency = (val) => new Intl.NumberFormat('id-ID').format(val || 0);

// Format Tanggal
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Ambil data dari API
const fetchDonations = async () => {
  try {
    const response = await api.get('/donations/my-donations');
    donations.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil riwayat:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDonations);
</script>