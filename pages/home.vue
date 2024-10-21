
<template>
  <div class="relative min-h-screen bg-gray-800 text-white">
    <!-- Overlay for better text visibility -->
    <div class="relative z-10">
      <!-- Header Section -->
      <header class="flex justify-end p-4">
        <nuxt-link to="/about" class="mr-4 text-lg">About</nuxt-link>
        <nuxt-link to="/database" class="text-lg">Database</nuxt-link>
        <NuxtLink to="/logout" class="text-white hover:underline ml-4">Log Out</NuxtLink>
        
      </header>

      <!-- Logo Section -->
      <div class="flex justify-center my-8">
        <img 
          src="/logo2.png" 
          alt="Logo" 
          width="100px"/>
      </div>

      <!-- Title Section -->
      <div class="text-center my-4">
        <h1 class="text-4xl font-bold text-yellow-300">Surat</h1>
      </div>

      <!-- Card Section -->
      <div class="flex flex-col items-center">
        <div class="flex justify-center gap-4 p-4">
          <UCard class="hover:shadow-2xl h-40 w-64 text-center bg-white text-gray-800 mx-auto border-2 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]" @click="$router.push('/dpp')">
            <template #header>
              <i class="ph-file-text-bold text-3xl text-blue-500"></i> <!-- Icon for DPP -->
            </template>
            <div>
              <h2 class="text-xl font-semibold">DPP</h2>
            </div>
          </UCard>

          <UCard class="hover:shadow-2xl h-40 w-64 text-center bg-white text-gray-800 mx-auto border-2 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]" @click="$router.push('/sp')">
            <template #header>
              <i class="ph-file-doc-bold text-3xl text-green-500"></i> <!-- Icon for SP -->
            </template>
            <div>
              <h2 class="text-xl font-semibold">SP</h2>
            </div>
          </UCard>
        </div>

        <div class="flex justify-center gap-4 p-4">
          <UCard class="hover:shadow-2xl h-40 w-64 text-center bg-white text-gray-800 mx-auto border-2 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]" @click="$router.push('/sp2')">
            <template #header>
              <i class="ph-file-doc-bold text-3xl text-yellow-500"></i> <!-- Icon for SP2 -->
            </template>
            <div>
              <h2 class="text-xl font-semibold">SP2</h2>
            </div>
          </UCard>

          <UCard class="hover:shadow-2xl h-40 w-64 text-center bg-white text-gray-800 mx-auto border-2 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]" @click="$router.push('/sp3')">
            <template #header>
              <i class="ph-file-doc-bold text-3xl text-red-500"></i> <!-- Icon for SP3 -->
            </template>
            <div>
              <h2 class="text-xl font-semibold">SP3</h2>
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


const router = useRouter()
</script>

<style scoped>
/* Add any custom styles here if necessary */
</style>