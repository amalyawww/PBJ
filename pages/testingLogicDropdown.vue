<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

const state = reactive({
  selectedOption: '',   // Menyimpan pilihan dari dropdown
  dropdownOptions: []   // Menyimpan data yang diambil dari Google Sheets
  
});

// Fungsi untuk fetch data dari Google Sheets melalui API route
async function fetchDropdownData() {
  try {
    const response = await $fetch('/api/gsheets'); // Panggil API endpoint
    state.dropdownOptions = response.data; // Simpan data ke dropdownOptions
  } catch (error) {
    console.error('Error fetching dropdown data:', error);
  }
}

// Panggil fetchDropdownData saat komponen dimuat
onMounted(fetchDropdownData);
</script>

<template>
  <div class="dropdown-container">
    <label for="dropdown">Pilih Opsi:</label>
    <select v-model="state.selectedOption" id="dropdown">
      <option value="" disabled selected>Pilih Opsi</option>
      <option v-for="option in state.dropdownOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>

</template>

<style scoped>
.dropdown-container {
  max-width: 400px;
  margin: 20px;
}

label {
  font-size: 1rem;
  margin-bottom: 8px;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 8px;
}
</style>
