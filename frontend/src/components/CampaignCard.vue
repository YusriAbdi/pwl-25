

<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
    <!-- Area Gambar Kampanye -->
    <div class="h-48 bg-gray-200 relative overflow-hidden">
      <img 
        v-if="campaign.image" 
        :src="campaign.image" 
        :alt="campaign.title"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
      </div>
      
      <!-- Label Status untuk Kampanye yang Hampir Terpenuhi -->
      <div v-if="percentage >= 80" class="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
        Mendesak
      </div>
    </div>

    <!-- Konten Informasi -->
    <div class="p-5 flex flex-col flex-grow">
      <h3 class="font-bold text-gray-800 text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
        {{ campaign.title }}
      </h3>
      
      <p class="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
        {{ campaign.description }}
      </p>

      <!-- Indikator Kemajuan Donasi -->
      <div class="space-y-2 mb-6">
        <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div 
            class="bg-blue-600 h-full rounded-full transition-all duration-1000"
            :style="{ width: Math.min(percentage, 100) + '%' }"
          ></div>
        </div>
        
        <div class="flex justify-between items-end">
          <div class="flex flex-col">
            <span class="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Terkumpul</span>
            <span class="text-sm font-bold text-blue-600">
              Rp {{ formatCurrency(campaign.current_amount) }}
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-bold text-gray-800">{{ percentage }}%</span>
          </div>
        </div>
      </div>

      <!-- Tombol Donasi -->
      <button 
        @click="$emit('select', campaign)"
        class="w-full py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        Donasi Sekarang
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  campaign: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      description: '',
      target_amount: 0,
      current_amount: 0,
      image: null
    })
  }
});

defineEmits(['select']);

/**
 * Menghitung persentase donasi yang terkumpul.
 */
const percentage = computed(() => {
  if (!props.campaign.target_amount) return 0;
  return Math.round((props.campaign.current_amount / props.campaign.target_amount) * 100);
});

/**
 * Memformat angka ke format mata uang Rupiah.
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID').format(value || 0);
};
</script>