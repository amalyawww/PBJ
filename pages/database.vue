<template>
  <div class="container mx-auto py-6">
    <nav class="flex justify-between mb-4">
      <NuxtLink to="/home" class="text-white hover:underline">Home</NuxtLink>
      <div class="flex items-center">
        <button @click="exportToExcel" class="bg-green-500 text-white px-4 py-2 rounded">Export Database</button>
        <NuxtLink to="/about" class="text-white hover:underline ml-4">About</NuxtLink>
        <NuxtLink to="/logout" class="text-white hover:underline ml-4">Log Out</NuxtLink>
      </div>
    </nav>

    <h1 class="text-white text-3xl font-bold mb-4 text-center">Data Vendor</h1>

    <div class="flex mb-4">
      <input v-model="searchText" type="text" placeholder="Search..." class="p-2 rounded w-full" />
    </div>

    <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">Tambah Vendor</button>

    <table class="min-w-full bg-gray-800 text-white border border-gray-700 mb-6" style="font-size: 14px;">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b border-r">No</th>
          <th class="py-2 px-4 border-b border-r">TANGGAL</th>
          <th class="py-2 px-4 border-b border-r">METODE</th>
          <th class="py-2 px-4 border-b border-r">JENIS KONTRAK</th>
          <th class="py-2 px-4 border-b border-r">BENTUK KONTRAK</th>
          <th class="py-2 px-4 border-b border-r">PEKERJAAN</th>
          <th class="py-2 px-4 border-b border-r">BIAYA KONTRAK (HASIL NEGO)</th>
          <th class="py-2 px-4 border-b border-r">NILAI TKDN</th>
          <th class="py-2 px-4 border-b border-r">PENYEDIA</th>
          <th class="py-2 px-4 border-b">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vendor, index) in paginatedVendors" :key="index">
          <td class="py-2 px-4 border-b border-r">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td class="py-2 px-4 border-b border-r">{{ vendor.date }}</td>
          <td class="py-2 px-4 border-b border-r">{{ vendor.method }}</td>
          <td class="py-2 px-4 border-b border-r">{{ vendor.contractType }}</td>
          <td class="py-2 px-4 border-b border-r">{{ vendor.contractForm }}</td>
          <td class="py-2 px-4 border-b border-r">{{ vendor.work }}</td>
          <td class="py-2 px-4 border-b border-r">{{ vendor.contractValue }}</td>
          <td class="py-2 px-4 border-b border-r">{{ vendor.tkdValue }}</td>
          <td class="py-2 px-4 border-b border-r">{{ vendor.provider }}</td>
          <td class="py-2 px-4 border-b">
            <UButton @click="editVendor(vendor)" icon="i-heroicons-pencil-square" size="sm" color="yellow" variant="soft" label="Edit Data" trailing/>
            <button @click="deleteVendor(index)" class="bg-red-500 text-white px-2 py-1 rounded">Hapus🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-between items-center mb-4">
      <div>
        <label for="itemsPerPage" class="text-white">Items per page:</label>
        <select v-model="itemsPerPage" id="itemsPerPage" class="p-2 ml-2">
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div>
        <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1" class="bg-blue-500 text-white px-2 py-1 rounded">Previous</button>
        <span class="text-white mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages" class="bg-blue-500 text-white px-2 py-1 rounded">Next</button>
      </div>
    </div>

    <!-- Modal untuk menambah atau mengedit vendor -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-gray-900 p-6 rounded w-96">
        <h2 class="text-white mb-4">{{ isEdit ? 'Edit Vendor' : 'Tambah Vendor' }}</h2>

        <input v-model="vendorData.date" type="date" placeholder="TANGGAL" class="mb-2 p-2 w-full" />

        <select v-model="vendorData.method" class="mb-2 p-2 w-full">
          <option disabled value="">METODE</option>
          <option>Penunjukan Langsung</option>
          <option>Pengadaan Langsung</option>
          <option>Tender/ Seleksi Terbatas</option>
        </select>

        <input v-model="vendorData.contractType" placeholder="JENIS KONTRAK" class="mb-2 p-2 w-full" />

        <select v-model="vendorData.contractForm" class="mb-2 p-2 w-full">
          <option disabled value="">BENTUK KONTRAK</option>
          <option>Surat Perjanjian</option>
          <option>Surat Perintah Kerja</option>
          <option>Surat Pesanan</option>
        </select>

        <input v-model="vendorData.work" placeholder="PEKERJAAN" class="mb-2 p-2 w-full" />

        <input v-model="vendorData.contractValue" placeholder="BIAYA KONTRAK (HASIL NEGO)" class="mb-2 p-2 w-full" />
        <input v-model="vendorData.tkdValue" placeholder="NILAI TKDN" class="mb-4 p-2 w-full" />

        <input v-model="vendorData.provider" placeholder="PENYEDIA" class="mb-2 p-2 w-full" />

        <div v-if="errorMessage" class="text-red-500 mb-2">{{ errorMessage }}</div>

        <button @click="validateAndSubmit" class="bg-blue-500 text-white px-4 py-2 rounded">
          {{ isEdit ? 'Update' : 'Tambah' }}
        </button>
        <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded ml-2">Batal</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: 'Database',
  data() {
    return {
      vendors: this.loadVendors(),
      showModal: false,
      isEdit: false,
      errorMessage: '',
      vendorData: {
        date: '',
        method: '',
        contractType: '',
        contractForm: '',
        work: '',
        contractValue: '',
        tkdValue: '',
        provider: ''
      },
      searchText: '',
      itemsPerPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    filteredVendors() {
      return this.vendors.filter(vendor => {
        return (
          vendor.date.toLowerCase().includes(this.searchText.toLowerCase()) ||
          vendor.method.toLowerCase().includes(this.searchText.toLowerCase()) ||
          vendor.contractType.toLowerCase().includes(this.searchText.toLowerCase()) ||
          vendor.contractForm.toLowerCase().includes(this.searchText.toLowerCase()) ||
          vendor.work.toLowerCase().includes(this.searchText.toLowerCase()) ||
          vendor.contractValue.toLowerCase().includes(this.searchText.toLowerCase()) ||
          vendor.tkdValue.toLowerCase().includes(this.searchText.toLowerCase()) ||
          vendor.provider.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
    },
    paginatedVendors() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredVendors.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredVendors.length / this.itemsPerPage);
    }
  },
  methods: {
   
    loadVendors() {
      const storedVendors = localStorage.getItem('vendors');
      return storedVendors ? JSON.parse(storedVendors) : [];
    },
    saveVendors() {
      localStorage.setItem('vendors', JSON.stringify(this.vendors));
    },
    validateAndSubmit() {
      this.errorMessage = '';
      const { date, method, contractType, contractForm, work, contractValue, tkdValue, provider } = this.vendorData;

      // Validation checks
      if (!date || !method || !contractType || !contractForm || !work || !contractValue || !tkdValue || !provider) {
        this.errorMessage = 'All fields are required.';
        return;
      }

      if (isNaN(contractValue) || isNaN(tkdValue)) {
        this.errorMessage = 'BIAYA KONTRAK and NILAI TKDN must be numeric.';
        return;
      }

      if (this.isEdit) {
        const index = this.vendors.findIndex(v => v === this.currentVendor);
        if (index !== -1) {
          this.vendors[index] = { ...this.vendorData };
        }
      } else {
        this.vendors.push({ ...this.vendorData });
      }

      this.saveVendors();
      this.closeModal();
      this.resetVendorData();
    },
    editVendor(vendor) {
      this.isEdit = true;
      this.currentVendor = vendor;
      this.vendorData = { ...vendor };
      this.showModal = true;
    },
    deleteVendor(index) {
      if (confirm('Are you sure you want to delete this vendor?')) {
        this.vendors.splice(index, 1);
        this.saveVendors();
      }
    },
    closeModal() {
      this.showModal = false;
      this.resetVendorData();
    },
    resetVendorData() {
      this.vendorData = {
        date: '',
        method: '',
        contractType: '',
        contractForm: '',
        work: '',
        contractValue: '',
        tkdValue: '',
        provider: ''
      };
      this.isEdit = false;
      this.errorMessage = '';
    },
    exportToExcel() {
      const ws = XLSX.utils.json_to_sheet(this.vendors);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Vendors');
      XLSX.writeFile(wb, 'vendors.xlsx');
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}
</style>
