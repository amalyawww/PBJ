<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
})
useSeoMeta({
  title: 'Pelindo',
})
</script>

<template>
  <div class="overflow-x-hidden flex flex-1">
    <Container class="flex-1 flex flex-col justify-center items-center">
      <div class="flex w-full gap-4 pb-10 ">
        <div class="flex-1 flex flex-col justify-center gap-2">
          <div class="flex">
            <span class="px-2 py-1 rounded-full bg-primary-500/20 text-xs">
              PELINDO
            </span>
          </div>
          <h1 class="text-6xl font-bold mb-8 text-left">
            <span class="block text-primary-500">PT. Pelabuhan Indonesia (Persero)</span>
            <!-- <span class="block">Pelabuhan Indonesia (Perser</span> -->
            <span class="block">Regional 3</span>
          </h1>
             <h2>
              <p>
                Departemen Pengadaan Barang dan Jasa
              </p>
            </h2>
          <p>
            Badan Usaha Milik Negara Indonesia yang bergerak di bidang logistik, terutama pengelolaan dan pengembangan pelabuhan.
          </p>
          <div class="mt-8 flex gap-4">
            <UButton size="lg" to="/login" label="Login" class="px-8"/>
            <UButton size="lg" to="/about" label="Tentang Kami" variant="ghost" trailing-icon="ph:arrow-fat-lines-right" />
          </div>
        </div>
        <div class="flex-1 flex justify-center mt-0 relative pl-20">
          <!-- <img src="/logo.png" alt="Company Logo" class="h-[60px]" /> -->
          <div class="border-4 border-white border-dashed p-2 rounded-lg overflow-hidden">
            <img src="https://img.antaranews.com/cache/1200x800/2023/06/29/SAVE_20230629_161333.jpg.webp" alt="Company Logo" class="w-auto rounded-lg overflow-hidden" />
          </div>
          <div class="absolute border-4 border-primary-500 border-dashed p-2 rounded-lg overflow-hidden flex w-[300px] transform translate-x-[-80%] translate-y-[-50%] rotate-[-15deg]">
            <img src="https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/218/2024/01/09/DJI_0120_1-3018798723.jpg" alt="Company Logo" class="rounded-lg overflow-hidden" />
          </div>
          <div class="absolute border-4 border-primary-500 border-dashed p-2 rounded-lg overflow-hidden flex w-[250px] transform translate-x-[120%] translate-y-[180%] rotate-[15deg]">
            <img src="https://foto.kontan.co.id/SohymKmx6clCoSK6h811upan0rM=/smart/2023/09/01/1679125438p.jpg" alt="Company Logo" class="rounded-lg overflow-hidden" />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <UButton size="lg" label="Selengkapnya" variant="ghost" class="px-8 animate-bounce" trailing-icon="ph:caret-down" />
      </div>
    </Container>


    <!-- overlay gradient to bottom -->
    <div
      class="absolute bottom-0 left-0 right-0 flex justify-center items-center h-20 bg-gradient-to-b from-transparent dark:to-gray-950/80 to-gray-400/80"
    />
  </div>
</template>