<template>
  <div>
    <Header /> <!-- Tambahkan komponen Header di sini -->
    <div class="container">
      <h1 class="title">Database</h1>
      <div class="button-container">
        <button class="animated-button" @click="goToPejabat">Data Pejabat</button>
        <button class="animated-button" @click="goToVendor">Data Vendor</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './header.vue'; // Pastikan mengimpor komponen Header

export default {
  components: {
    Header, // Daftarkan komponen Header di sini
  },
  methods: {
    goToPejabat() {
      this.$router.push('/pejabat');
    },
    goToVendor() {
      this.$router.push('/vendor');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.container {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Pusatkan secara vertikal */
  align-items: center; /* Pusatkan secara horizontal */
  height: 90vh; /* Sesuaikan tinggi untuk memberi ruang bagi header */
  font-family: 'Poppins', sans-serif; /* Menggunakan font Poppins */
}

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
