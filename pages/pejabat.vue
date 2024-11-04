<template>
    <div>
      <Header /> <!-- Tambahkan komponen Header di sini -->
      <div>
        <h1>Data from Google Sheets</h1>
        <div v-if="loading">Loading data...</div>
        <table v-if="!loading && sheetData.length">
          <thead>
            <tr>
              <th v-for="(header, index) in sheetData[0]" :key="index">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in sheetData.slice(1)" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else-if="!loading">No data found.</div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from './header.vue'; // Pastikan mengimpor komponen Header
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'Testing',
    components: {
      Header, // Daftarkan komponen Header di sini
    },
    setup() {
      const sheetData = ref([]);
      const loading = ref(true);
  
      // Function to fetch data from API
      const fetchData = async () => {
        try {
          const response = await fetch('/api/pejabat'); // Ubah path ini sesuai handler API Anda
          const data = await response.json();
          if (data.error) {
            console.error("Error fetching data:", data.error);
          } else {
            sheetData.value = data; // Menyimpan data yang diperoleh ke sheetData
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          loading.value = false;
        }
      };
  
      // Fetch data saat komponen dimuat
      onMounted(fetchData);
  
      return {
        sheetData,
        loading,
      };
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Poppins', sans-serif;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f4f4f4;
    text-align: left;
  }
  
  h1 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 32px;
    margin-top: 20px;
    text-align: center;
  }
  </style>
  