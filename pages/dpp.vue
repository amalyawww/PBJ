<template>
    <div class="container">
      <div class="logo-container">
        <!-- <img src="logo2.png" alt="Logo Pelindo" class="logo" /> -->
      </div>
      <h1>DPP (SINGKATAN DPP GATAU APA TULIS AJA "NANTI TANYA MBAK ROSI")</h1>
      <button @click="openAddModal" class="add-button">Add DPP</button>
  
      <div class="table-container">
        <table class="dpp-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Alamat</th>
              <th>Perusahaan</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dppList" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.jabatan }}</td>
              <td>{{ item.alamat }}</td>
              <td>{{ item.perusahaan }}</td>
              <td>{{ item.deskripsi }}</td>
              <td>
                <button @click="openEditModal(item)" class="edit-button">Edit</button>
                <button @click="deleteDPP(item.id)" class="delete-button">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal for Add/Edit -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>{{ isEditMode ? 'Edit DPP' : 'Add DPP' }}</h2>
          <form @submit.prevent="isEditMode ? editDPP() : addDPP()">
            <input v-model="currentDPP.nama" placeholder="Nama" required />
            <input v-model="currentDPP.jabatan" placeholder="Jabatan" required />
            <input v-model="currentDPP.alamat" placeholder="Alamat" required />
            <input v-model="currentDPP.perusahaan" placeholder="Perusahaan" required />
            <textarea v-model="currentDPP.deskripsi" placeholder="Deskripsi"></textarea>
            <button type="submit">{{ isEditMode ? 'Update' : 'Add' }}</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'DPP',
    setup() {
      const dppList = ref<any[]>([]);
      const showModal = ref(false);
      const isEditMode = ref(false);
      const currentDPP = ref({ id: null, nama: '', jabatan: '', alamat: '', perusahaan: '', deskripsi: '' });
  
      const fetchDPP = async () => {
        try {
          const response = await axios.get('/api/dpp');
          dppList.value = response.data;
        } catch (error) {
          console.error(error);
        }
      };
  
      const openAddModal = () => {
        currentDPP.value = { id: null, nama: '', jabatan: '', alamat: '', perusahaan: '', deskripsi: '' };
        isEditMode.value = false;
        showModal.value = true;
      };
  
      const openEditModal = (item: any) => {
        currentDPP.value = { ...item };
        isEditMode.value = true;
        showModal.value = true;
      };
  
      const addDPP = async () => {
        try {
          await axios.post('/api/dpp', currentDPP.value);
          fetchDPP();
          closeModal();
        } catch (error) {
          console.error(error);
        }
      };
  
      const editDPP = async () => {
        try {
          await axios.put(`/api/dpp/${currentDPP.value.id}`, currentDPP.value);
          fetchDPP();
          closeModal();
        } catch (error) {
          console.error(error);
        }
      };
  
      const deleteDPP = async (id: number) => {
        try {
          await axios.delete(`/api/dpp/${id}`);
          fetchDPP();
        } catch (error) {
          console.error(error);
        }
      };
  
      const closeModal = () => {
        showModal.value = false;
      };
  
      fetchDPP(); // Fetch data on component mount
  
      return {
        dppList,
        showModal,
        isEditMode,
        currentDPP,
        fetchDPP,
        openAddModal,
        openEditModal,
        addDPP,
        editDPP,
        deleteDPP,
        closeModal,
      };
    }
  });
  </script>
  
  <style scoped>
  body {
    background-color: #e0f7fa; /* Warna latar belakang selayar */
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .logo-container {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .logo {
    max-width: 150px; /* Ukuran logo */
  }
  
  h1 {
    text-align: center;
  }
  
  .add-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #0056b3; /* Warna biru yang elegan */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .add-button:hover {
    background-color: #004494; /* Warna lebih gelap saat hover */
  }
  
  .table-container {
    overflow-x: auto; /* Menambahkan scroll horizontal jika diperlukan */
    margin: 0 20px; /* Memberikan jeda kiri dan kanan */
  }
  
  .dpp-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #0077c2; /* Garis luar tabel */
    border-radius: 8px; /* Membuat sudut tabel bulat */
    overflow: hidden; /* Mencegah konten meluap */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Menambahkan bayangan */
    background-color: white; /* Latar belakang tabel putih */
  }
  
  .dpp-table th,
  .dpp-table td {
    border: 1px solid #0077c2; /* Garis tabel berwarna biru tua */
    padding: 10px;
    text-align: left;
  }
  
  .dpp-table th {
    background-color: #007bb3; /* Warna latar belakang header tabel */
    color: white;
  }
  
  .dpp-table tbody tr:hover {
    background-color: #f1f1f1; /* Warna saat hover pada baris tabel */
  }
  
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    padding-top: 60px;
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  