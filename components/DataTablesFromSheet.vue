<script lang="ts" setup>

// props ini adalah parameter yang harus diisi ketika mau manggil komponen ini nanti, jadi biar kita bisa ambil dan gunakan disini
const props = defineProps({
  urlApi: {
    type: String,
    required: true
  }
})

const sheetData = ref<string[][]>([]);
const loading = ref(true);

const sheetDataColumns = computed(() => {
  if (sheetData.value.length === 0) {
    return [];
  }

  const headers = sheetData.value[0];

  // nuxt ui menerima data columns sebagai header seperti ini :
  // [ { key: 'id', label: 'ID' }, ]

  // jadi kita perlu extract header dari data sheet, dan ubah ke bentuk yang diterima oleh nuxt ui
  const columns = headers.map((header) => {
    return {
      key: header,
      label: header,
      sortable: true
    };
  });

  return columns;
});

const shetDataFormatted = computed(() => {

  // jika data sheet kosong, maka return kosong
  if (sheetData.value.length === 0) {
    return [];
  }

  // kita perlu formated, karena table dari nuxt ui menerima data seperti ini :
  // [ { id: 1, name: 'John Doe', title: 'CEO' }, { id: 2, name: 'Jane Doe', title: 'CTO' } ]
  // jadi headernya harus sesuai dengan key nya
  // sedangkan data dari sheet headernya itu array biasa di awal, jadi kita extract dulu yah

  // ambil header dari data
  const headers = sheetData.value[0];

  // ambil data dari index 1, karena index 0 itu header
  const data = sheetData.value.slice(1);

  // cleaning data
  // |- 1. jika dalam satu baris tidak ada data atau hanya string dengan whitespace, maka baris tersebut dihapus
  for (let i = data.length - 1; i >= 0; i--) {
    const row = data[i];
    if (row.every((cell) => cell.trim() === '')) {
      data.splice(i, 1);
    }
  }

  // selanjutnya kita perlu frommated data, karena kita perlu data yang berbentuk object dan key nya sesuai dengan header
  // karena sekarang datanya berbentuk array string saja : [ ['1', 'John Doe', 'CEO'], ['2', 'Jane Doe', 'CTO'] ]
  // kita harus ubah ke bentuk object : [ { id: 1, name: 'John Doe', title: 'CEO' }, { id: 2, name: 'Jane Doe', title: 'CTO' } ]
  // jadi kita perlu loop data dan ubah ke bentuk object
  const formattedData = data.map((row) => {
    const obj: any = {};
    row.forEach((cell, index) => {
      obj[headers[index]] = cell;
    });
    return obj;
  });
  return formattedData;
});

watch(() => sheetData.value, () => {
  console.log(sheetData.value);
});


// // tables pake nuxt ui
// const columns = [{
//   key: 'id',
//   label: 'ID'
// }, {
//   key: 'name',
//   label: 'Name',
//   sortable: true
// }, {
//   key: 'title',
//   label: 'Title',
//   sortable: true
// }, {
//   key: 'email',
//   label: 'Email',
//   sortable: true,
//   direction: 'desc' as const
// }, {
//   key: 'role',
//   label: 'Role'
// }]


// Function to fetch data from API
const fetchData = async () => {
  try {
    // pakai url dari props nya, agar dinamis
    const response = await fetch(props.urlApi); // Ubah path ini sesuai handler API Anda
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

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return shetDataFormatted.value
  }

  return shetDataFormatted.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

// Fetch data saat komponen dimuat
onMounted(fetchData);


</script>

<template>
  <div class="max-w-screen-xl mx-auto">
    <UCard>
      <div class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="q" placeholder="Cari..." />
        <div>
          <p class="text-sm text-gray-500">Menampilkan {{ filteredRows.length }} dari {{ shetDataFormatted.length }} data</p>
        </div>
      </div>
      <UTable
        :columns="sheetDataColumns"
        :rows="filteredRows"
        :loading="loading"
      />
    </UCard>
    <div v-if="!loading && sheetData.length == 0" class="no-data">Tidak ada data</div>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 28px; /* Slightly reduced font size */
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
