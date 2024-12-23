<script lang="ts" setup>
// ini sudah tidak perlu lagi karena sudah auto import
// import { useRouter } from 'vue-router'
// import Header from '/pages/header.vue' // Pastikan jalur impor sesuai dengan struktur proyek Anda


// fungsi definePageMeta() ini juga sudah auto import langsung pakai saja okay
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

// useRouter sudah auto import langsung pakai saja
const router = useRouter()


// bikin variables menu biar efisien dan tinggal looping  aja
const menus = [
  { name: 'Surat Pesanan', path: '/SP1e' },
  { name: 'Surat Perjanjian', path: '/sp' },
  { name: 'Surat Perintah Kerja', path: '/sp2' },
  { name: 'DPP', path: '/dpp' }
]
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center pb-20">
    <!-- Logo Section -->
    <div class="flex justify-center mt-0">
      <img 
        src="/logo2.png" 
        alt="Logo" 
        width="160px" 
        class="spin-vertical"
      />
    </div>

    <!-- Title Section -->
    <div class="text-center">
      <h1 class="text-4xl font-bold">Generate Surat</h1>
    </div>

    <!-- Card Section -->
    <div class="grid grid-cols-2 gap-4 items-center mt-4">
      <NuxtLink
        v-for="menu in menus"
        :key="menu.name"
        :to="menu.path"
      >
        <UCard
          class="w-64 text-center mx-auto border-2 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500"
        >
          <template #header>
            <UIcon name="ph:file-doc-bold" class="text-3xl text-blue-500" />
          </template>

          <div>
            <h2 class="text-xl font-semibold">{{ menu.name }}</h2>
          </div>
        </UCard>
      </NuxtLink>
    </div>

    <!-- Footer Section (Aksi Lain) -->
    <!-- <div class="text-center mt-12">
      <h3 class="text-xl text-gray-700">Aksi Lain</h3>
    </div> -->
  </div>
</template>


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