<template>
  <div class="container mx-auto py-6">
    <nav class="flex justify-between mb-4 w-full">
      <NuxtLink to="/home" class="text-white hover:underline">Home</NuxtLink>
      <div>
        <NuxtLink to="/logout" class="text-white hover:underline mr-4">Log Out</NuxtLink>
        <NuxtLink to="/database" class="text-white hover:underline">Database</NuxtLink>
      </div>
    </nav>

    <h1 class="text-white text-3xl font-bold mb-4 text-center">Informasi Pengadaan Barang dan Jasa Pelindo Regional 3</h1>
    <p class="text-gray-300 mb-4 text-center">
      Pelindo Regional 3 merupakan salah satu sub-regional dalam pengelolaan pelabuhan di Indonesia. Sub-regional ini mencakup 
      wilayah Jawa, Bali, Nusa Tenggara, dan Kalimantan. Setiap daerah memiliki karakteristik dan kebutuhan pengadaan barang 
      dan jasa yang berbeda sesuai dengan potensi dan perkembangan wilayah tersebut.
    </p>

    <div class="faq-container max-w-2xl mx-auto">
      <h2 class="text-white text-2xl font-bold mb-4 text-center">FAQ</h2>
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
      <h2 class="text-white text-2xl font-bold mb-2 text-center">Peta Penyebaran Wilayah</h2>
      <img src="/peta.jpeg" alt="Peta Penyebaran Wilayah" class="w-full h-auto max-w-3xl mx-auto" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      faqs: [
        {
          question: "Apa itu Surat Pesanan?",
          answer: "Surat Pesanan adalah dokumen yang digunakan untuk pengadaan barang dan jasa dengan nilai <= 500 juta."
        },
        {
          question: "Apa itu Surat Perintah Kerja?",
          answer: "Surat Perintah Kerja digunakan untuk pengadaan barang dan jasa dengan nilai antara 500 juta hingga 1 M."
        },
        {
          question: "Apa itu Surat Perjanjian?",
          answer: "Surat Perjanjian digunakan untuk pengadaan barang dan jasa dengan nilai > 1 M hingga 10 M."
        },
        // Add more FAQs as needed
      ],
    };
  },
  methods: {
    toggleFAQ(index) {
      this.faqs[index].open = !this.faqs[index].open;
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #1f2937; /* Background color */
  padding: 20px; /* Padding for container */
 /* Rounded corners */
  min-height: 100vh; /* Full screen height */
  width: 100%; /* Full width */
  overflow-x: hidden; /* Prevent horizontal overflow */
}

.faq-container {
  margin: 20px auto; /* Center the FAQ container */
}

.faq-item {
  margin-bottom: 10px; /* Space between FAQ items */
  transition: all 0.5s ease; /* Smooth transition for animations */
}

.faq-header {
  background-color: #4b5563; /* Header background color */
  position: relative; /* Position relative for animations */
  overflow: hidden; /* Prevent overflow of content */
}

.faq-answer {
  background-color: #2d3748; /* Answer background color */
}

.faq-number {
  min-width: 30px; /* Fixed width for number */
}

.faq-icon {
  position: absolute; /* Position icon to the left */
  left: 10px;
  top: 50%;
  /* transform: translateY(-50%); */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s; /* Smooth transition for opacity and transform */
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px); /* Slide effect */
}
</style>
