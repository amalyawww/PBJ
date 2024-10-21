<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-800">
      <div class="text-white text-center">
        <h1 class="text-2xl font-bold mb-4">Logout Berhasil</h1>
        <p class="mb-4">Anda telah berhasil logout. Mengarahkan ke halaman login...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Logout',
    mounted() {
      // Redirect to login page after logout
      setTimeout(() => {
        this.$router.push('/login');
      }, 2000); // Delay 2 detik sebelum redirect
    }
  }
  </script>
  
  <style scoped>
  /* Styling untuk halaman logout */
  .bg-gray-800 {
    background-color: #1f2937; /* Warna latar belakang */
  }
  </style>
  