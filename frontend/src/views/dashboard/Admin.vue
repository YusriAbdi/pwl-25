<template>
  <div class="space-y-8 animate-in">
    <!-- Header Utama -->
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
      <div class="space-y-1">
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">Pusat Kendali Admin</h1>
        <p class="text-gray-500 text-sm font-medium">Selamat datang kembali, kelola operasional hari ini.</p>
      </div>
      
      <!-- Navigasi Tab -->
      <div class="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
        <button 
          @click="activeTab = 'stats'"
          :class="activeTab === 'stats' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'"
          class="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
        >
          Statistik
        </button>
        <button 
          @click="activeTab = 'team'"
          :class="activeTab === 'team' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'"
          class="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
        >
          Manajemen Tim
        </button>
      </div>
    </header>

    <!-- KONTEN TAB: STATISTIK & KAMPANYE -->
    <div v-if="activeTab === 'stats'" class="space-y-8">
      <!-- Kartu Ringkasan Statistik -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:border-blue-200 transition-all">
          <div class="flex items-center gap-4 mb-6">
            <div class="p-4 bg-blue-50 text-blue-600 rounded-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Donasi</span>
          </div>
          <p class="text-3xl font-black text-gray-900">Rp {{ formatCurrency(stats.totalDonations) }}</p>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:border-purple-200 transition-all">
          <div class="flex items-center gap-4 mb-6">
            <div class="p-4 bg-purple-50 text-purple-600 rounded-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Donatur Aktif</span>
          </div>
          <p class="text-3xl font-black text-gray-900">{{ stats.totalDonors }}</p>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:border-orange-200 transition-all">
          <div class="flex items-center gap-4 mb-6">
            <div class="p-4 bg-orange-50 text-orange-600 rounded-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Kampanye</span>
          </div>
          <p class="text-3xl font-black text-gray-900">{{ campaigns.length }}</p>
        </div>
      </div>

      <!-- Tabel Daftar Kampanye -->
      <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 class="text-xl font-black text-gray-900">Monitor Kampanye</h2>
          <button @click="openCampaignModal" class="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
            Buat Kampanye Baru
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50/50 text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-gray-100">
                <th class="px-8 py-5">Judul Kampanye</th>
                <th class="px-6 py-5">Progress Dana</th>
                <th class="px-6 py-5 text-center">Status</th>
                <th class="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="c in campaigns" :key="c.id" class="hover:bg-gray-50/30 transition-colors">
                <td class="px-8 py-6">
                  <div class="flex flex-col">
                    <span class="font-bold text-gray-900 text-sm">{{ c.title }}</span>
                    <span class="text-[10px] text-gray-400 font-medium">Target: Rp {{ formatCurrency(c.target_amount) }}</span>
                  </div>
                </td>
                <td class="px-6 py-6">
                  <div class="w-full max-w-[150px] space-y-2">
                    <div class="flex justify-between text-[10px] font-black text-blue-600">
                      <span>Rp {{ formatCurrency(c.current_amount) }}</span>
                    </div>
                    <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div class="bg-blue-500 h-full transition-all duration-1000" :style="{ width: (c.current_amount/c.target_amount*100) + '%' }"></div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-6 text-center">
                  <span 
                    :class="c.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'"
                    class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                  >
                    {{ c.status }}
                  </span>
                </td>
                <td class="px-8 py-6 text-right">
                  <div class="flex justify-end gap-3">
                    <button @click="deleteCampaign(c.id)" class="p-2 text-gray-300 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

    <!-- KONTEN TAB: MANAJEMEN TIM -->
    <div v-if="activeTab === 'team'" class="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 class="text-xl font-black text-gray-900">Kelola Akses Tim</h2>
          <button @click="openTeamModal" class="px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black shadow-xl shadow-gray-200 transition-all">
            Tambah Anggota Tim
          </button>
        </div>
        
        <div v-if="loading" class="py-20 text-center">
          <div class="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p class="text-gray-400 font-bold text-xs uppercase tracking-widest">Sinkronisasi Data...</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50/50 text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-gray-100">
                <th class="px-8 py-5">Identitas Anggota</th>
                <th class="px-6 py-5 text-center">Role</th>
                <th class="px-6 py-5">Tgl Bergabung</th>
                <th class="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="user in team" :key="user.id" class="hover:bg-gray-50/30 transition-colors">
                <td class="px-8 py-6">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-2xl bg-gray-50 text-gray-900 border border-gray-100 flex items-center justify-center font-black text-xs">
                      {{ user.name.charAt(0) }}
                    </div>
                    <div>
                      <span class="block font-bold text-gray-900 text-sm">{{ user.name }}</span>
                      <span class="text-xs text-gray-400 font-medium">{{ user.email }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-6 text-center">
                  <span 
                    :class="user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'"
                    class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-6 text-sm text-gray-500 font-medium italic">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-8 py-6 text-right">
                  <button @click="deleteUser(user.id)" class="p-2 text-gray-300 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL: TAMBAH TIM -->
    <transition name="modal">
      <div v-if="showTeamModal" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-md">
        <div class="bg-white w-full max-w-md rounded-[3rem] shadow-2xl p-10 relative animate-in zoom-in duration-300">
          <h2 class="text-2xl font-black text-gray-900 mb-8">Anggota Tim Baru</h2>
          <form @submit.prevent="handleAddUser" class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
              <input v-model="teamForm.name" type="text" class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-bold" required>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <input v-model="teamForm.email" type="email" class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-bold" required>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password Awal</label>
              <input v-model="teamForm.password" type="password" class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-bold" required>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Role Jabatan</label>
              <select v-model="teamForm.role" class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-bold bg-white">
                <option value="staff">Petugas Lapangan (Staff)</option>
                <option value="admin">Administrator (Admin)</option>
              </select>
            </div>
            <div class="flex gap-4 pt-4">
              <button type="button" @click="showTeamModal = false" class="flex-1 py-4 font-bold text-gray-400">Batal</button>
              <button type="submit" :disabled="submitting" class="flex-[2] py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-95">
                {{ submitting ? 'Menyimpan...' : 'Konfirmasi & Buat' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '@/api';

// State Dashboard
const activeTab = ref('stats'); // Switch: 'stats' atau 'team'
const loading = ref(true);
const submitting = ref(false);

// State Data
const team = ref([]);
const campaigns = ref([]);
const stats = reactive({
  totalDonations: 1250000000,
  totalDonors: 4829
});

// UI State Modals
const showTeamModal = ref(false);
const showCampaignModal = ref(false); // Untuk fitur masa depan

// Form States
const teamForm = reactive({
  name: '',
  email: '',
  password: '',
  role: 'staff'
});

// Functions
const formatCurrency = (val) => new Intl.NumberFormat('id-ID').format(val || 0);
const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const fetchData = async () => {
  loading.value = true;
  try {
    // 1. Ambil Data Tim
    const teamRes = await api.get('/admin/management-list');
    team.value = teamRes.data;

    // 2. Ambil Data Kampanye
    const campaignRes = await api.get('/campaigns');
    campaigns.value = campaignRes.data;
    
  } catch (err) {
    console.error("Dashboard Sync Error:", err);
  } finally {
    loading.value = false;
  }
};

const openTeamModal = () => {
  teamForm.name = ''; teamForm.email = ''; teamForm.password = ''; teamForm.role = 'staff';
  showTeamModal.value = true;
};

const handleAddUser = async () => {
  if (submitting.value) return;
  submitting.value = true;
  try {
    await api.post('/admin/add-account', teamForm);
    showTeamModal.value = false;
    fetchData(); // Refresh list
  } catch (err) {
    alert(err.response?.data?.message || 'Gagal membuat akun tim');
  } finally {
    submitting.value = false;
  }
};

const deleteUser = async (id) => {
  if (!confirm('Hapus akses anggota tim ini secara permanen?')) return;
  try {
    await api.delete(`/admin/delete-account/${id}`);
    fetchData();
  } catch (err) {
    alert(err.response?.data?.message || 'Gagal menghapus');
  }
};

const deleteCampaign = async (id) => {
  if (!confirm('Hapus kampanye ini?')) return;
  try {
    await api.delete(`/campaigns/${id}`);
    fetchData();
  } catch (err) {
    alert('Gagal menghapus kampanye');
  }
};

onMounted(fetchData);
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }

.animate-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Custom Scrollbar for modern look */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
</style>