<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Dashboard - Pelindo',
})

const $auth = useAuth()


const widgets = [
  {
    title: 'Surat',
    widgets: [
      {
        color: 'primary',
        icon: 'ph:file-text',
        title: 'SP Konstruksi Anak Perusahaan',
        description: 'Penyusunan SP Konstruksi Anak Perusahaan',
        path: '/SPKontruksiAnakPerusahaan',
      },
      {
        color: 'red',
        icon: 'ph:file-text',
        title: 'SP Konstruksi Non Anak Perusahaan',
        description: 'Penyusunan SP Konstruksi Non Anak Perusahaan',
        path: '/SPKontruksiNonAnakPerusahaan',
      },
      {
        color: 'green',
        icon: 'ph:file-text',
        title: 'SP Konsultansi',
        description: 'Penyusunan SP Konsultansi',
        path: '/SPKonsultasi',
      },
      {
        color: 'orange',
        icon: 'ph:file-text',
        title: 'SP Pengadaan Barang',
        description: 'Penyusunan SP Pengadaan Barang',
        path: '/SPPengadaanBarang',
      },
      {
        color: 'pink',
        icon: 'ph:file-text',
        title: 'SPK Konsultansi',
        description: 'Penyusunan SPK Konsultansi',
        path: '/dpp',
      },
      {
        color: 'purple',
        icon: 'ph:file-text',
        title: 'SPK Konstruksi',
        description: 'Penyusunan SPK Konstruksi',
        path: '/SP1e',
      },
      {
        color: 'yellow',
        icon: 'ph:file-text',
        title: 'SPK Jasa Lainya',
        description: 'Penyusunan SPK Jasa Lainya',
        path: '/dpp',
      },
      {
        color: 'sky',
        icon: 'ph:file-text',
        title: 'Surat Pesanan',
        description: 'Penyusunan Surat Pesanan',
        path: '/dpp',
      },
      {
        color: 'red',
        icon: 'ph:file-text',
        title: 'DPP',
        description: 'Penyusunan DPP',
        path: '/dppnew',
      },
      {
        color: 'green',
        icon: 'ph:file-text',
        title: 'SP3',
        description: 'Penyusunan SP3',
        path: '/SP3',
      },
    ],
  },
  {
    title: 'Database',
    widgets: [
      {
        color: 'purple',
        icon: 'ph:file-text',
        title: 'Data Pejabat',
        description: 'Data Pejabat dari Sheet',
        path: '/database/pejabat',
      },
      {
        color: 'pink',
        icon: 'ph:file-text',
        title: 'Data Vendor',
        description: 'Data Vendor dari Sheet',
        path: '/database/vendor',
      },
    ],
  }
]
</script>

<template>
  <div class="flex-1 flex flex-col">
    <Container class="w-full py-4">
      <h2 class="text-2xl font-semibold">Dashboard</h2>
      <div class="mt-4">
        <UAlert
          icon="ph:lightbulb"
          color="primary"
          variant="solid"
          :title="`Halo ${$auth.user?.name} (${$auth.user?.email}), selamat datang di Dashboard!`"
        />
      </div>

      <!-- looping widget groups -->
      <div
        v-for="(widget, i) in widgets"
        :key="i"
        class="mt-4"
      >
        <h3 class="text-lg font-semibold mb-1">{{ widget.title }}</h3>
        <div class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <!-- looping widgets -->
          <div
            v-for="(item, i) in widget.widgets"
            :key="i"
            class="w-full rounded-lg flex flex-col gap-2 bg-gray-300/30 dark:bg-gray-700/30 border border-gray-400/50 dark:border-gray-600/50 p-4 cursor-pointer transition-all duration-300 hover:bg-gray-400/50 dark:hover:bg-gray-700/80"
            @click="() => {
              // kalo ada path, kita pake router buat push navigasi ke halaman tersebut
              if (item.path) {
                $router.push(item.path)
              }
            }"
          >
            <div class="flex">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center"
                :class="{
                  'bg-primary-500/20 text-primary-500': item.color === 'primary',
                  'bg-red-500/20 text-red-500': item.color === 'red',
                  'bg-green-500/20 text-green-500': item.color === 'green',
                  'bg-orange-500/20 text-orange-500': item.color === 'orange',
                  'bg-yellow-500/20 text-yellow-500': item.color === 'yellow',
                  'bg-sky-500/20 text-sky-500': item.color === 'sky',
                  'bg-purple-500/20 text-purple-500': item.color === 'purple',
                  'bg-pink-500/20 text-pink-500': item.color === 'pink',
                }"
              >
                <UIcon name="ph:file-text" class="text-sm" />
              </div>
            </div>
            <div>
              <h4 class="font-semibold">{{ item.title }}</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300 truncate">
                {{ item.description }}
              </p>
              <div
                class="mt-1 flex items-center gap-2 text-xs"
                :class="{
                  'text-primary-500': item.color === 'primary',
                  'text-red-500': item.color === 'red',
                  'text-green-500': item.color === 'green',
                  'text-orange-500': item.color === 'orange',
                  'text-yellow-500': item.color === 'yellow',
                  'text-sky-500': item.color === 'sky',
                  'text-purple-500': item.color === 'purple',
                  'text-pink-500': item.color === 'pink',
                }"
              >
                <span class="text-xs">Selengkapnya</span>
                <UIcon name="ph:arrow-right-bold" class="text-xs" />
              </div>
            </div>
          </div>
        </div>
    </div>
    </Container>
  </div>
</template>