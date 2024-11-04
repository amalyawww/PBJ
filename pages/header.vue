<template>
    <header>
      <div class="header-container">
        <button class="back-button" @click="goBack">Back</button>
        <nav class="nav-links">
          <router-link to="/home">Home</router-link>
          <router-link to="/database">Database</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/logout">Log Out</router-link>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: "Header",
    methods: {
      goBack() {
        this.$router.go(-1); // Kembali ke halaman sebelumnya
      },
      logout() {
        // Implementasikan logika logout di sini
        console.log('Logging out...');
      },
    },
  };
  </script>
  
  <style scoped>
  header {
    background-color: #f8f9fa; /* Contoh warna latar belakang */
    padding: 10px;
  }
  
  .header-container {
    display: flex;
    justify-content: space-between; /* Pisahkan tombol Back dan nav ke sisi kiri dan kanan */
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .back-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #4A90E2;
  }
  
  .nav-links {
    display: flex;
    gap: 20px; /* Jarak antar tautan */
    align-items: center;
  }
  
  .nav-links a {
    text-decoration: none;
    color: #4A90E2;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }
  
  .logout-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #4A90E2;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }
  </style>
  