<template>
  <div class="relative min-h-screen bg-gray-800 text-white">
    <!-- Header Section -->
    <Header />

    <!-- Overlay for better text visibility -->
    <div class="relative z-10">
      <!-- Logo Section -->
      <div class="flex justify-center mt-0">
        <img 
          src="/logo2.png" 
          alt="Logo" 
          width="160px" 
          class="spin-vertical"/>
      </div>

      <!-- Title Section -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-white">Generate Surat</h1>
      </div>

      <!-- Card Section -->
      <div class="flex flex-col items-center">
        <div class="flex justify-center gap-4 p-4">
          <UCard class="hover:shadow-2xl h-40 w-64 text-center bg-white text-gray-800 mx-auto border-2 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]" @click="$router.push('/SP1e')">
            <template #header>
              <i class="ph-file-text-bold text-3xl text-blue-500"></i>
            </template>
            <div>
              <h2 class="text-xl font-semibold">Surat Pesanan</h2>
            </div>
          </UCard>

          <UCard class="hover:shadow-2xl h-40 w-64 text-center bg-white text-gray-800 mx-auto border-2 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]" @click="$router.push('/sp')">
            <template #header>
              <i class="ph-file-doc-bold text-3xl text-green-500"></i>
            </template>
            <div>
              <h2 class="text-xl font-semibold">Surat Perjanjian</h2>
            </div>
          </UCard>
        </div>

        <div class="flex justify-center gap-4 p-4">
          <UCard class="hover:shadow-2xl h-40 w-64 text-center bg-white text-gray-800 mx-auto border-2 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]" @click="$router.push('/sp2')">
            <template #header>
              <i class="ph-file-doc-bold text-3xl text-yellow-500"></i>
            </template>
            <div>
              <h2 class="text-xl font-semibold">Surat Perintah Kerja</h2>
            </div>
          </UCard>

          <UCard class="hover:shadow-2xl h-40 w-64 text-center bg-white text-gray-800 mx-auto border-2 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]" @click="$router.push('/dpp')">
            <template #header>
              <i class="ph-file-doc-bold text-3xl text-red-500"></i>
            </template>
            <div>
              <h2 class="text-xl font-semibold">DPP</h2>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Footer Section (Aksi Lain) -->
      <div class="text-center mt-12">
        <h3 class="text-xl text-gray-700">Aksi Lain</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Header from '/pages/header.vue' // Pastikan jalur impor sesuai dengan struktur proyek Anda

const router = useRouter()
</script>

<style>
.spin-vertical {
  animation: spinVertical 5s linear infinite;
  transform-style: preserve-3d;
  display: block;
}

@keyframes spinVertical {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
