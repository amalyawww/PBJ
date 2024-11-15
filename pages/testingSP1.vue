<template>
  <div class="max-w-screen-sm mx-auto py-4">
    <h1 class="text-center text-2xl font-bold mb-6">Form Angka dan Terbilang</h1>

    <!-- Form pertama untuk input angka -->
    <UForm class="space-y-4">
      <UFormGroup label="Masukkan Angka" name="angka">
        <UInput type="number" v-model="angka" placeholder="Masukkan angka" />
      </UFormGroup>

      <!-- Form kedua untuk menampilkan terbilang -->
      <UFormGroup label="Terbilang" name="terbilang">
        <UInput v-model="terbilang" placeholder="Terbilang otomatis" readonly />
      </UFormGroup>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const angka = ref<number | null>(null);
const terbilang = ref<string>('');

// Fungsi untuk mengubah angka menjadi terbilang
function numberToWords(n: number): string {
  const words: string[] = [
    'nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 
    'sepuluh', 'sebelas'
  ];

  if (n < 12) {
    return words[n];
  } else if (n < 20) {
    return numberToWords(n - 10) + ' belas';
  } else if (n < 100) {
    return numberToWords(Math.floor(n / 10)) + ' puluh' + (n % 10 ? ' ' + numberToWords(n % 10) : '');
  } else if (n < 1000) {
    // Tangani "seratus" tanpa "satu ratus"
    return (
      (Math.floor(n / 100) === 1 ? 'seratus' : numberToWords(Math.floor(n / 100)) + ' ratus') +
      (n % 100 ? ' ' + numberToWords(n % 100) : '')
    );
  } else if (n < 1000000) {
    return (
      numberToWords(Math.floor(n / 1000)) +
      ' ribu' +
      (n % 1000 ? ' ' + numberToWords(n % 1000) : '')
    );
  } else if (n < 1000000000) {
    return (
      numberToWords(Math.floor(n / 1000000)) +
      ' juta' +
      (n % 1000000 ? ' ' + numberToWords(n % 1000000) : '')
    );
  } else if (n < 10000000000) {
    return (
      numberToWords(Math.floor(n / 1000000000)) +
      ' milyar' +
      (n % 1000000000 ? ' ' + numberToWords(n % 1000000000) : '')
    );
  }
  return '';
}

watch(angka, (newValue) => {
  if (newValue !== null) {
    terbilang.value = numberToWords(newValue);
  } else {
    terbilang.value = '';
  }
});
</script>


<style scoped>
/* Styling untuk form */
h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.max-w-screen-sm {
  max-width: 600px;
}

.space-y-4 {
  margin-bottom: 1.5rem;
}

UFormGroup {
  margin-bottom: 1rem;
}

UInput {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
}
</style>
