<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <header class="bg-white py-16 border-b">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Uluran Tangan Anda, Harapan Mereka
        </h1>
        <p class="text-xl text-gray-500 max-w-2xl mx-auto">
          Bantu sesama melalui platform donasi kemanusiaan yang transparan dan tepat sasaran.
        </p>
      </div>
    </header>

    <!-- Campaign List -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800">Kampanye Mendesak</h2>
        <button class="text-blue-600 font-semibold hover:underline">Lihat Semua</button>
      </div>

      <div v-if="loading" class="text-center py-20">
        <p class="text-gray-500">Memuat kampanye...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Gunakan komponen CampaignCard yang sudah dibuat sebelumnya -->
        <CampaignCard 
          v-for="campaign in campaigns" 
          :key="campaign.id" 
          :campaign="campaign"
          @select="handleDonate"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
import CampaignCard from '../components/CampaignCard.vue';
import { useAuth } from '../store/auth';

const router = useRouter();
const { isAuthenticated } = useAuth();
const campaigns = ref([]);
const loading = ref(true);

const fetchCampaigns = async () => {
  try {
    const response = await api.get('/campaigns');
    campaigns.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data kampanye:', error);
  } finally {
    loading.value = false;
  }
};

const handleDonate = (campaign) => {
  if (!isAuthenticated.value) {
    router.push('/login');
  } else {
    // Logika lanjut ke halaman pembayaran atau modal donasi
    alert(`Lanjut berdonasi untuk: ${campaign.title}`);
  }
};

onMounted(fetchCampaigns);
</script>