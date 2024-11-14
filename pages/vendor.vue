<template>
  <div>
    <Header /> <!-- Tambahkan komponen Header di sini -->
    <div>
      <h1>Data from Google Sheets</h1>
      <div v-if="loading" class="loading">Loading data...</div>
      <table v-if="!loading && sheetData.length" class="styled-table">
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
      <div v-else-if="!loading" class="no-data">No data found.</div>
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
        const response = await fetch('/api/vendor'); // Ubah path ini sesuai handler API Anda
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

h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 28px; /* Reduced font size */
  margin: 20px 0;
  text-align: center;
}

.loading,
.no-data {
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #666;
  font-size: 14px; /* Smaller font size for messages */
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Poppins', sans-serif;
  font-size: 14px; /* Reduced font size for table */
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.styled-table th, .styled-table td {
  padding: 10px 12px; /* Slightly smaller padding */
  border: 1px solid #ddd;
  text-align: left;
}

.styled-table th {
  background-color: #0073e6;
  color: #ffffff;
  font-weight: 600;
}

.styled-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.styled-table tr:hover {
  background-color: #f1f1f1;
}

.styled-table td {
  color: #333;
}
</style>
