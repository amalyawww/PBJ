<template>
  <Container class="flex-1 flex flex-col justify-center pb-20">
    <!-- <Header /> -->
    <div class="flex flex-col justify-center items-center">
      <h1 class="title">Database</h1>
      <div class="button-container">
        <NuxtLink class="animated-button" to="/database/pejabat">Data Pejabat</NuxtLink>
        <NuxtLink class="animated-button" to="/database/vendor">Data Vendor</NuxtLink>
      </div>
    </div>
  </Container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>

<style scoped>
.title {
  font-size: 48px; /* Ukuran font besar untuk judul */
  font-weight: 600; /* Bobot font yang lebih tebal */
  margin-bottom: 30px; /* Jarak antara judul dan tombol */
  text-align: center; /* Teks di tengah */
}

.button-container {
  display: flex;
  gap: 20px; /* Jarak antar tombol */
}

.animated-button {
  background: linear-gradient(135deg, #4A90E2, #FFFFFF); /* Gradien biru ke putih */
  border: none; /* Hapus border */
  color: white; /* Warna teks */
  padding: 15px 32px; /* Padding tombol */
  text-align: center; /* Teks di tengah */
  text-decoration: none; /* Hapus garis bawah */
  display: inline-block; /* Untuk mendukung margin */
  font-size: 16px; /* Ukuran font */
  margin: 4px 2px; /* Margin */
  cursor: pointer; /* Kursor pointer */
  transition: transform 0.2s ease, background-color 0.2s ease; /* Transisi */
  border-radius: 5px; /* Sudut melengkung */
  color: #FFFFFF; /* Warna teks putih */
}

.animated-button:hover {
  transform: translateY(-5px) scale(1.05); /* Gerakan ke atas dan sedikit membesar saat hover */
}

.animated-button:active {
  transform: translateY(2px); /* Gerakan ke bawah saat ditekan */
}

@keyframes buttonPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animated-button {
  animation: buttonPulse 2s infinite; /* Efek gerakan berulang */
}
</style>
