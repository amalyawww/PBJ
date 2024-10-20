import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03', // Tanggal kompatibilitas untuk versi Nuxt
  devtools: { enabled: true }, // Mengaktifkan devtools untuk pengembangan
  modules: ['@nuxt/ui'], // Menggunakan modul UI Nuxt
  build: {
    transpile: ['@phosphor-icons/vue'], // Add this line
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap' // Menambahkan font Poppins dari Google Fonts
        }
      ]
    }
  }
})