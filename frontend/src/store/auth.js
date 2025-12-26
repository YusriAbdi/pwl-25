import { reactive, computed } from 'vue';

/**
 * State Management sederhana menggunakan Vue Reactive API.
 * Berfungsi untuk menyimpan data pengguna, role, dan token JWT secara terpusat.
 */
const state = reactive({
  user: {
    name: localStorage.getItem('name') || null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
  }
});

/**
 * Getters: Digunakan untuk mengambil data dari state secara reaktif.
 */
const isAuthenticated = computed(() => !!state.user.token);
const getUserRole = computed(() => state.user.role);
const getUserName = computed(() => state.user.name);

/**
 * Actions: Fungsi untuk mengubah state.
 */

/**
 * Menyimpan data autentikasi ke dalam state dan localStorage.
 * @param {Object} userData - Data yang berisi name, role, dan token.
 */
const setAuth = (userData) => {
  state.user.name = userData.name;
  state.user.role = userData.role;
  state.user.token = userData.token;

  // Simpan ke localStorage agar data tetap ada saat halaman di-refresh
  localStorage.setItem('name', userData.name);
  localStorage.setItem('role', userData.role);
  localStorage.setItem('token', userData.token);
};

/**
 * Menghapus data autentikasi (Logout).
 */
const clearAuth = () => {
  state.user.name = null;
  state.user.role = null;
  state.user.token = null;

  // Bersihkan localStorage
  localStorage.removeItem('name');
  localStorage.removeItem('role');
  localStorage.removeItem('token');
};

/**
 * Ekspor fungsi useAuth agar bisa digunakan di seluruh komponen Vue.
 */
export const useAuth = () => {
  return {
    state,
    isAuthenticated,
    getUserRole,
    getUserName,
    setAuth,
    clearAuth
  };
};