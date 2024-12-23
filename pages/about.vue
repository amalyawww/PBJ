<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
})

const faqs = reactive([
  {
    question: "Apa itu Surat Pesanan?",
    answer: "Surat Pesanan adalah dokumen yang digunakan untuk pengadaan barang dan jasa dengan nilai <= 500 juta.",
    open: false,
  },
  {
    question: "Apa itu Surat Perintah Kerja?",
    answer: "Surat Perintah Kerja digunakan untuk pengadaan barang dan jasa dengan nilai antara 500 juta hingga 1 M.",
    open: false,
  },
  {
    question: "Apa itu Surat Perjanjian?",
    answer: "Surat Perjanjian digunakan untuk pengadaan barang dan jasa dengan nilai > 1 M hingga 10 M.",
    open: false,
  },
])

function toggleFAQ(index: number) {
  faqs[index].open = !faqs[index].open;
}
</script>

<template>
  <Container class="py-8">
    <!-- <Header /> -->

    <h1 class="text-gray-800 dark:text-white text-3xl font-bold mb-4 text-center">Informasi Pengadaan Barang dan Jasa PT. Pelabuhan Indonesia (Persero) Regional 3</h1>
    <p class="text-gray-700 dark:text-gray-300 mb-4 text-center">
      Pelindo Regional 3 merupakan salah satu sub-regional dalam pengelolaan pelabuhan di Indonesia. Sub-regional ini mencakup 
      wilayah Jawa, Bali, Nusa Tenggara, dan Kalimantan. Setiap daerah memiliki karakteristik dan kebutuhan pengadaan barang 
      dan jasa yang berbeda sesuai dengan potensi dan perkembangan wilayah tersebut.
    </p>

    <div class="faq-container max-w-2xl mx-auto">
      <h2 class="text-gray-800 dark:text-white text-2xl font-bold mb-4 text-center">FAQ</h2>
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item" @click="toggleFAQ(index)">
        <div class="faq-header flex justify-between items-center p-4 bg-gray-700 rounded-lg cursor-pointer">
          <span class="faq-icon text-blue-400 mr-2"></span>
          <span class="faq-number text-yellow-400 font-bold">{{ index + 1 }}</span>
          <span class="faq-question text-white">{{ faq.question }}</span>
          <span class="faq-toggle text-white">{{ faq.open ? '-' : '+' }}</span>
        </div>
        <transition name="fade">
          <div v-show="faq.open" class="faq-answer p-4 bg-gray-800 rounded-lg">
            <p class="text-gray-300">{{ faq.answer }}</p>
          </div>
        </transition>
      </div>
    </div>

    <div class="relative mt-8">
      <h2 class="text-gray-800 dark:text-white text-2xl font-bold mb-2 text-center">Peta Penyebaran Wilayah</h2>
      <img src="/peta.jpeg" alt="Peta Penyebaran Wilayah" class="w-full h-auto max-w-3xl mx-auto" />
    </div>
  </Container>
</template>

<style scoped>
.faq-container {
  margin: 20px auto;
}

.faq-item {
  margin-bottom: 10px;
  transition: all 0.5s ease;
}

.faq-header {
  background-color: #4b5563;
  position: relative;
  overflow: hidden;
}

.faq-answer {
  background-color: #2d3748;
}

.faq-number {
  min-width: 30px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
