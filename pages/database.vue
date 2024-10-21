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
          <tr v-for="(vendor, index) in vendors" :key="index">
            <td class="py-2 px-4 border-b border-r">{{ index + 1 }}</td>
            <td class="py-2 px-4 border-b border-r">{{ vendor.date }}</td>
            <td class="py-2 px-4 border-b border-r">{{ vendor.method }}</td>
            <td class="py-2 px-4 border-b border-r">{{ vendor.contractType }}</td>
            <td class="py-2 px-4 border-b border-r">{{ vendor.contractForm }}</td>
            <td class="py-2 px-4 border-b border-r">{{ vendor.work }}</td>
            <td class="py-2 px-4 border-b border-r">{{ vendor.contractValue }}</td>
            <td class="py-2 px-4 border-b border-r">{{ vendor.tkdValue }}</td>
            <td class="py-2 px-4 border-b border-r">{{ vendor.provider }}</td>
            <td class="py-2 px-4 border-b">
              <button @click="editVendor(vendor)" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button @click="deleteVendor(index)" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
  
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
      };
    },
    methods: {
      loadVendors() {
        const vendors = localStorage.getItem('vendors');
        return vendors ? JSON.parse(vendors) : [];
      },
      saveVendors() {
        localStorage.setItem('vendors', JSON.stringify(this.vendors));
      },
      validateAndSubmit() {
        // Reset error message
        this.errorMessage = '';
  
        // Validasi input untuk memastikan hanya angka di TKDN dan BIAYA KONTRAK
        if (isNaN(this.vendorData.contractValue) || isNaN(this.vendorData.tkdValue) || 
            this.vendorData.contractValue === '' || this.vendorData.tkdValue === '') {
          this.errorMessage = 'BIAYA KONTRAK (HASIL NEGO) dan NILAI TKDN harus berupa angka dan tidak boleh kosong.';
          return;
        }
  
        const newVendor = {
          date: this.vendorData.date,
          method: this.vendorData.method,
          contractType: this.vendorData.contractType,
          contractForm: this.vendorData.contractForm,
          work: this.vendorData.work,
          contractValue: 'Rp ' + this.vendorData.contractValue,
          tkdValue: this.vendorData.tkdValue + '%',
          provider: this.vendorData.provider
        };
  
        if (this.isEdit) {
          const index = this.vendors.findIndex(v => v.provider === this.vendorData.provider);
          this.vendors.splice(index, 1, newVendor);
        } else {
          this.vendors.push(newVendor);
        }
  
        this.saveVendors();
        this.closeModal();
      },
      editVendor(vendor) {
        this.vendorData = { ...vendor };
        this.isEdit = true;
        this.showModal = true;
        this.errorMessage = ''; // Reset error message when editing
      },
      deleteVendor(index) {
        this.vendors.splice(index, 1);
        this.saveVendors();
      },
      closeModal() {
        this.showModal = false;
        this.isEdit = false;
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
        this.errorMessage = ''; // Reset error message on close
      },
      exportToExcel() {
        const worksheet = XLSX.utils.json_to_sheet(this.vendors);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Vendor');
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];
        const filename = `data_vendor-${formattedDate}.xlsx`;
      XLSX.writeFile(workbook, filename);
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #1f2937;
  padding: 20px;
  border-radius: 8px;
  min-height: 100vh;
}
</style>
