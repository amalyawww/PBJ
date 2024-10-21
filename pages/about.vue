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
      <p class="text-gray-300 mb-4 text-center">
        Dalam rangka pengadaan barang dan jasa, terdapat berbagai jenis dokumen yang digunakan sesuai dengan nilai pengadaan. 
        Berikut adalah penjelasan mengenai jenis-jenis dokumen tersebut.
      </p>
  
      <div class="flex justify-center">
        <table class="table-auto bg-gray-800 text-white border border-gray-700 mb-6" style="max-width: 600px; width: 100%;">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">Nama Dokumen</th>
              <th class="py-2 px-4 border-b">Definisi</th>
              <th class="py-2 px-4 border-b">Contoh</th>
              <th class="py-2 px-4 border-b">Nilai Pengadaan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4 border-b">Surat Pesanan</td>
              <td class="py-2 px-4 border-b">Dokumen yang digunakan untuk pengadaan barang dan jasa dengan nilai <= 500 juta.</td>
              <td class="py-2 px-4 border-b">Pengadaan alat tulis kantor, perlengkapan IT, dan lain-lain.</td>
              <td class="py-2 px-4 border-b"><= 500 juta</td>
            </tr>
            <tr>
              <td class="py-2 px-4 border-b">Surat Perintah Kerja</td>
              <td class="py-2 px-4 border-b">Dokumen yang digunakan untuk pengadaan barang dan jasa dengan nilai antara 500 juta hingga 1 M.</td>
              <td class="py-2 px-4 border-b">Pengadaan konstruksi bangunan, pengadaan kendaraan operasional, dan lainnya.</td>
              <td class="py-2 px-4 border-b">500 juta - 1 M</td>
            </tr>
            <tr>
              <td class="py-2 px-4 border-b">Surat Perjanjian</td>
              <td class="py-2 px-4 border-b">Dokumen yang digunakan untuk pengadaan barang dan jasa dengan nilai > 1 M hingga 10 M.</td>
              <td class="py-2 px-4 border-b">Pengadaan proyek besar seperti pembangunan pelabuhan, fasilitas logistik, dan lain-lain.</td>
              <td class="py-2 px-4 border-b">1 M - 10 M</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <p class="text-gray-300 mb-4 text-center">
        Informasi persuratan ini penting untuk memastikan bahwa proses pengadaan barang dan jasa berjalan dengan baik, 
        transparan, dan sesuai dengan ketentuan yang berlaku. Dengan adanya dokumen-dokumen yang tepat, Pelindo Regional 3 
        dapat memenuhi kebutuhan dan memberikan layanan yang optimal bagi masyarakat dan pelaku usaha di wilayahnya.
      </p>
  
      <div class="relative mt-8">
        <h2 class="text-white text-2xl font-bold mb-2 text-center">Peta Penyebaran Wilayah</h2>
        <img src="/peta.jpeg" alt="Peta Penyebaran Wilayah" class="w-full h-auto max-w-3xl mx-auto" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'About',
  }
  </script>
  
  <style scoped>
  html, body {
    height: 100%; /* Set full height */
    margin: 0; /* Remove default margin */
  }
  
  .container {
    background-color: #1f2937; /* Gray-800 */
    padding: 20px; /* Add padding */
    border-radius: 8px; /* Optional: for rounded corners */
    min-height: 100vh; /* Full screen height */
    width: 100%; /* Full width */
    overflow-x: hidden; /* Prevent horizontal overflow */
  }
  
  .table-auto {
    border-collapse: collapse; /* Ensure borders are combined */
  }
  
  .table-auto th, .table-auto td {
    border: 1px solid #4b5563; /* Darker border for table cells */
    padding: 10px; /* Padding for cells */
  }
  
  .table-auto th {
    background-color: #4b5563; /* Header background color */
    font-weight: bold; /* Make header text bold */
  }
  
  .table-auto tr:nth-child(even) {
    background-color: #2d3748; /* Alternate row background color */
  }
  
  .table-auto tr:hover {
    background-color: #4b5563; /* Change background on hover */
  }
  </style>
  