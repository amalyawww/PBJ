<template>
    <div class="dropdown-container">
      <!-- Menggunakan Nuxt UI untuk grup form -->
      <UFormGroup label="Pilih Nama:" name="dropdown">
        <!-- Gunakan elemen HTML standar untuk dropdown -->
        <select v-model="state.selectedOption" id="dropdown" class="form-select">
          <option value="" disabled>Pilih Nama</option>
          <option
            v-for="(option, index) in state.dropdownOptions"
            :key="index"
            :value="option.name"
          >
            {{ option.name }}
          </option>
        </select>
      </UFormGroup>
    </div>
  
    <!-- Form untuk menampilkan informasi detail -->
    <div v-if="state.selectedOption" class="details-form">
      <h2>Detail Informasi</h2>
      <UFormGroup label="Alamat:" name="address">
        <UInput v-model="selectedDetails.address" readonly />
      </UFormGroup>
      <UFormGroup label="NPWP:" name="npwp">
        <UInput v-model="selectedDetails.npwp" readonly />
      </UFormGroup>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive, onMounted, computed } from 'vue';
  
  // Definisi state dan inisialisasi data rekaktif
  const state = reactive({
    selectedOption: '',
    dropdownOptions: [] as Array<{ name: string; address: string; npwp: string }>,
  });
  
  // Fungsi untuk fetch data dari Google Sheets melalui API route
  async function fetchDropdownData() {
    try {
      const response = await $fetch('/api/gsheets'); // Panggil API endpoint
      state.dropdownOptions = response.data;
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  }
  
  // Panggil fetchDropdownData saat komponen dimuat
  onMounted(fetchDropdownData);
  
  // Computed properties untuk mendapatkan data detail dari opsi yang dipilih
  const selectedDetails = computed(() => {
    return (
      state.dropdownOptions.find(
        (option) => option.name === state.selectedOption
      ) || { address: '', npwp: '' }
    );
  });
  </script>
  
  <style scoped>
  .dropdown-container {
    max-width: 400px;
    margin: 20px;
  }
  
  .details-form {
    margin-top: 20px;
  }
  
  .label {
    font-size: 1rem;
    margin-bottom: 8px;
  }
  
  .select,
  .input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 8px;
  }
  </style>
  