<script lang="ts" setup>
import { SuratFormInputSchema } from '@/schemas/surat' 
import { z } from 'zod'
import type { FormError, FormSubmitEvent } from '#ui/types'
import { reactive } from 'vue';


definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const nama = "amel"

// async function editdata () {
//   console.log('ALO')

//   const data = {
//     name: 'papa pian'
//   }
// }



type Schema = z.output<typeof SuratFormInputSchema>

// 
const state = reactive({
  selectedOption: '', // Menyimpan pilihan dari dropdown
  dropdownOptions: [], // Menyimpan data yang diambil dari Google Sheets
    Jenis_Tender: '',
    Jenis_Pengadaan: '',
    Jenis_Kontrak: '',
    Pekerjaan: '',
    Pekerjaan_UP: '',
    Perdir_PBJ: '',
    Tempat_Tanda_Tangan: '',
    Tahun: '',
    Nama_P1: '',
    Jabatan_P1: '',
    Perusahaan_P1: '',
    Reg_P1: '',
    Alamat_P1: '',
    SK_P1: '',
    No_Telp_P1: '',
    Website_P1: '',
    Faksimili_P1: '',
    Email_P1: '',
    Jabatan_Pengawas_P1: '',
    Sub_Reg_Pengawas_P1: '',
    Masa_Pemeliharaan: null as number | null,
    Jaminan_Pelaksanaan: null as number | null,
    Tempat_Pelaksanaan_Pekerjaan: '',
    Pengadilan: '',
    Tempat_Serah_Terima: '',
    Persentase_Pembayaran: null as number | null,
    Nama_P2: '',
    Jabatan_P2: '',
    Bentuk_Perusahaan_P2: '',
    Perusahaan_P2: '',
    Alamat_P2: '',
    Telepon_P2: '',
    Website_P2: '',
    Faksimili_P2: '',
    Email_P2: '',
    No_Akta_1: '',
    Tanggal_Akta_1: '',
    Notaris_Akta_1: '',
    Kota_Akta_1: '',
    No_Pengesahan_Akta_1: '',
    Tanggal_Pengesahan_Akta_1: '',
    No_Akta_2: '',
    Perihal_Akta_2: '',
    Tanggal_Akta_2: '',
    Notaris_Akta_2: '',
    Kota_Akta_2: '',
    Perihal_Pengesahan_Akta_2: '',
    No_Pengesahan_Akta_2: '',
    Tanggal_Pengesahan_Akta_2: '',
    Nomor_Rekening_P2: '',
    Atas_Nama_Norek: '',
    Nama_Bank: '',
    Nomor_SP3: '',
    Tanggal_SP3: '',
    Biaya_Pekerjaan: null as number | null,
    Jangka_Waktu_Pekerjaan: null as number | null,
    Nilai_TKDN: null as number | null,
    Nomor_Nodin: '',
    Tanggal_Nodin: '',
    Tanggal_Email: '',
    No_BA_Rapat: '',
    Tanggal_BA_Rapat: '',
    No_Supen: '',
    Tanggal_Supen: '',
    Nomor_BA_Pembukaan_Penawaran: '',
    Tanggal_BA_Pembukaan_Penawaran: '',
    Nomor_BA_Eval: '',
    Tanggal_BA_Eval: '',
    Nomor_BA_Nego: '',
    Tanggal_BA_Nego: '',
    Nomor_Pengumuman: '',
    Tanggal_Pengumuman: '',
    terbilang_masa_pemeliharaan: '',
    terbilang_jpelaksanaan: '',
    terbilang_biaya_pekerjaan: '',
    terbilang_jwaktu_pekerjaan: '',
    terbilang_nilai_tkdn: '',
    Nomor_Jampel: '',
    Tanggal_Jampel: '',
    berlaku_jampel: '',
    berakhir_jampel: '',
    Bank_BUMN: '',
    Nomor_BA_Klarif: '',
    Tanggal_BA_Klarif: '',
});

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
    const hundreds = Math.floor(n / 100);
    return (
      (hundreds === 1 ? 'seratus' : numberToWords(hundreds) + ' ratus') +
      (n % 100 ? ' ' + numberToWords(n % 100) : '')
    );
  } else if (n < 1000000) {
    const thousands = Math.floor(n / 1000);
    const remainder = n % 1000;
    return (
      (thousands === 1 ? 'seribu' : numberToWords(thousands) + ' ribu') +
      (remainder ? ' ' + numberToWords(remainder) : '')
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


// Watcher untuk update terbilang berdasarkan input
watch(
  () => state.Biaya_Pekerjaan,
  (newValue) => {
    if (newValue !== null) {
      state.terbilang_biaya_pekerjaan = numberToWords(newValue);
    } else {
      state.terbilang_biaya_pekerjaan = '';
    }
  }
);

watch(
  () => state.Jaminan_Pelaksanaan,
  (newValue) => {
    if (newValue !== null) {
      state.terbilang_jpelaksanaan = numberToWords(newValue);
    } else {
      state.terbilang_jpelaksanaan = '';
    }
  }
);

watch(
  () => state.Jangka_Waktu_Pekerjaan,
  (newValue) => {
    if (newValue !== null) {
      state.terbilang_jwaktu_pekerjaan = numberToWords(newValue);
    } else {
      state.terbilang_jwaktu_pekerjaan = '';
    }
  }
);


watch(
  () => state.Masa_Pemeliharaan,
  (newValue) => {
    if (newValue !== null) {
      state.terbilang_masa_pemeliharaan = numberToWords(newValue);
    } else {
      state.terbilang_masa_pemeliharaan = '';
    }
  }
);

watch(
  () => state.Nilai_TKDN,
  (newValue) => {
    if (newValue !== null) {
      state.terbilang_nilai_tkdn = numberToWords(newValue);
    } else {
      state.terbilang_nilai_tkdn = '';
    }
  }
);
// watch(
//   () => state.value.Pekerjaan,
//   (newValue) => {
//     state.value.Pekerjaan_UP = newValue.toUpperCase();
//   }
// );
// const handleSubmit = () => {
//   console.log("Payload:", {
//     Pekerjaan: state.value.Pekerjaan, // Input Asli
//     Pekerjaan_UP: state.value.Pekerjaan_UP, // Input Uppercase
//   });
// };

// Fungsi untuk mengambil data dropdown dari Google Sheets
async function fetchDropdownData() {
  try {
    const response = await $fetch('/api/gsheets'); // Panggil API untuk ambil data
    state.dropdownOptions = response.data; // Simpan ke dropdownOptions
  } catch (error) {
    console.error('Error fetching dropdown data:', error);
  }
}
onMounted(fetchDropdownData);

// Panggil saat komponen dimuat
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const result = await $fetch('/api/generate-surat', {
    method: 'POST',
    body: event.data
  })
  console.log('hasil submit', result)
}
</script>

<template>
  <Container class="py-8">
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="ph:file-text" class="text-xl text-blue-500" />
          <h2 class="text-lg font-semibold">
            SP Konstruksi Anak Perusahaan
          </h2>
        </div>
      </template>

      <UForm :schema="SuratFormInputSchema" :state="state" class="space-y-4" @submit.prevent="onSubmit">
        
        <UFormGroup label="Jenis Tender" name="Jenis_Tender">
          <UInput v-model="state.Jenis_Tender" />
        </UFormGroup>

        <UFormGroup label="Jenis Pengadaan" name="Jenis_Pengadaan">
        <UInput v-model="state.Jenis_Pengadaan" />
        </UFormGroup>

        <UFormGroup label="Jenis Kontrak" name="Jenis_Kontrak">
        <UInput v-model="state.Jenis_Kontrak" />
        </UFormGroup>

        <UFormGroup label="Pekerjaan" name="Pekerjaan">
        <UInput v-model="state.Pekerjaan" />
        </UFormGroup>

        <UFormGroup label="Pekerjaan UP" name="Pekerjaan_UP">
        <UInput v-model="state.Pekerjaan_UP" />
        </UFormGroup>

        <UFormGroup label="Perdir PBJ" name="Perdir_PBJ">
        <UInput v-model="state.Perdir_PBJ" />
        </UFormGroup>

        <UFormGroup label="Tempat Tanda Tangan" name="Tempat_Tanda_Tangan">
        <UInput v-model="state.Tempat_Tanda_Tangan" />
        </UFormGroup>

        <UFormGroup label="Tahun" name="Tahun">
        <UInput v-model="state.Tahun" />
        </UFormGroup>

        <UFormGroup label="Nama P1" name="Nama_P1">
        <UInput v-model="state.Nama_P1" />
        </UFormGroup>

        <UFormGroup label="Jabatan P1" name="Jabatan_P1">
        <UInput v-model="state.Jabatan_P1" />
        </UFormGroup>

        <UFormGroup label="Perusahaan P1" name="Perusahaan_P1">
        <UInput v-model="state.Perusahaan_P1" />
        </UFormGroup>

        <UFormGroup label="Reg P1" name="Reg_P1">
        <UInput v-model="state.Reg_P1" />
        </UFormGroup>

        <UFormGroup label="Alamat P1" name="Alamat_P1">
        <UInput v-model="state.Alamat_P1" />
        </UFormGroup>

        <UFormGroup label="SK P1" name="SK_P1">
        <UInput v-model="state.SK_P1" />
        </UFormGroup>

        <UFormGroup label="No Telp P1" name="No_Telp_P1">
        <UInput v-model="state.No_Telp_P1" />
        </UFormGroup>

        <UFormGroup label="Website P1" name="Website_P1">
        <UInput v-model="state.Website_P1" />
        </UFormGroup>

        <UFormGroup label="Faksimili P1" name="Faksimili_P1">
        <UInput v-model="state.Faksimili_P1" />
        </UFormGroup>

        <UFormGroup label="Email P1" name="Email_P1">
        <UInput v-model="state.Email_P1" />
        </UFormGroup>

        <UFormGroup label="Jabatan Pengawas P1" name="Jabatan_Pengawas_P1">
        <UInput v-model="state.Jabatan_Pengawas_P1" />
        </UFormGroup>

        <UFormGroup label="Sub Reg Pengawas P1" name="Sub_Reg_Pengawas_P1">
        <UInput v-model="state.Sub_Reg_Pengawas_P1" />
        </UFormGroup>

        <UFormGroup label="Masa Pemeliharaan" name="Masa_Pemeliharaan">
        <UInput v-model="state.Masa_Pemeliharaan" type="number" />
        </UFormGroup>

        <UFormGroup label="Jaminan Pelaksanaan" name="Jaminan_Pelaksanaan">
        <UInput v-model="state.Jaminan_Pelaksanaan" type="number" />
        </UFormGroup>

        <UFormGroup label="Tempat Pelaksanaan Pekerjaan" name="Tempat_Pelaksanaan_Pekerjaan">
        <UInput v-model="state.Tempat_Pelaksanaan_Pekerjaan" />
        </UFormGroup>

        <UFormGroup label="Pengadilan" name="Pengadilan">
        <UInput v-model="state.Pengadilan" />
        </UFormGroup>

        <UFormGroup label="Tempat Serah Terima" name="Tempat_Serah_Terima">
        <UInput v-model="state.Tempat_Serah_Terima" />
        </UFormGroup>

        <UFormGroup label="Persentase Pembayaran" name="Persentase_Pembayaran">
        <UInput v-model="state.Persentase_Pembayaran" type="number" />
        </UFormGroup>

        <UFormGroup label="Nama P2" name="Nama_P2">
        <UInput v-model="state.Nama_P2" />
        </UFormGroup>

        <UFormGroup label="Jabatan P2" name="Jabatan_P2">
        <UInput v-model="state.Jabatan_P2" />
        </UFormGroup>

        <UFormGroup label="Bentuk Perusahaan P2" name="Bentuk_Perusahaan_P2">
        <UInput v-model="state.Bentuk_Perusahaan_P2" />
        </UFormGroup>

        <UFormGroup label="Perusahaan P2" name="Perusahaan_P2">
        <UInput v-model="state.Perusahaan_P2" />
        </UFormGroup>

        <UFormGroup label="Alamat P2" name="Alamat_P2">
        <UInput v-model="state.Alamat_P2" />
        </UFormGroup>

        <UFormGroup label="Telepon P2" name="Telepon_P2">
        <UInput v-model="state.Telepon_P2" />
        </UFormGroup>

        <UFormGroup label="Website P2" name="Website_P2">
        <UInput v-model="state.Website_P2" />
        </UFormGroup>

        <UFormGroup label="Faksimili P2" name="Faksimili_P2">
        <UInput v-model="state.Faksimili_P2" />
        </UFormGroup>

        <UFormGroup label="Email P2" name="Email_P2">
        <UInput v-model="state.Email_P2" />
        </UFormGroup>

        <UFormGroup label="No Akta 1" name="No_Akta_1">
        <UInput v-model="state.No_Akta_1" />
        </UFormGroup>

        <UFormGroup label="Tanggal Akta 1" name="Tanggal_Akta_1">
        <UInput v-model="state.Tanggal_Akta_1" />
        </UFormGroup>

        <UFormGroup label="Notaris Akta 1" name="Notaris_Akta_1">
        <UInput v-model="state.Notaris_Akta_1" />
        </UFormGroup>

        <UFormGroup label="Kota Akta 1" name="Kota_Akta_1">
        <UInput v-model="state.Kota_Akta_1" />
        </UFormGroup>

        <UFormGroup label="No Pengesahan Akta 1" name="No_Pengesahan_Akta_1">
        <UInput v-model="state.No_Pengesahan_Akta_1" />
        </UFormGroup>

        <UFormGroup label="Tanggal Pengesahan Akta 1" name="Tanggal_Pengesahan_Akta_1">
        <UInput v-model="state.Tanggal_Pengesahan_Akta_1" />
        </UFormGroup>

        <UFormGroup label="No Akta 2" name="No_Akta_2">
        <UInput v-model="state.No_Akta_2" />
        </UFormGroup>

        <UFormGroup label="Perihal Akta 2" name="Perihal_Akta_2">
        <UInput v-model="state.Perihal_Akta_2" />
        </UFormGroup>

        <UFormGroup label="Tanggal Akta 2" name="Tanggal_Akta_2">
        <UInput v-model="state.Tanggal_Akta_2" />
        </UFormGroup>

        <UFormGroup label="Notaris Akta 2" name="Notaris_Akta_2">
        <UInput v-model="state.Notaris_Akta_2" />
        </UFormGroup>

        <UFormGroup label="Kota Akta 2" name="Kota_Akta_2">
        <UInput v-model="state.Kota_Akta_2" />
        </UFormGroup>

        <UFormGroup label="Perihal Pengesahan Akta 2" name="Perihal_Pengesahan_Akta_2">
        <UInput v-model="state.Perihal_Pengesahan_Akta_2" />
        </UFormGroup>

        <UFormGroup label="No Pengesahan Akta 2" name="No_Pengesahan_Akta_2">
        <UInput v-model="state.No_Pengesahan_Akta_2" />
        </UFormGroup>

        <UFormGroup label="Tanggal Pengesahan Akta 2" name="Tanggal_Pengesahan_Akta_2">
        <UInput v-model="state.Tanggal_Pengesahan_Akta_2" />
        </UFormGroup>

        <UFormGroup label="Nomor Rekening P2" name="Nomor_Rekening_P2">
        <UInput v-model="state.Nomor_Rekening_P2" />
        </UFormGroup>

        <UFormGroup label="Atas Nama Norek" name="Atas_Nama_Norek">
        <UInput v-model="state.Atas_Nama_Norek" />
        </UFormGroup>

        <UFormGroup label="Nama Bank" name="Nama_Bank">
        <UInput v-model="state.Nama_Bank" />
        </UFormGroup>

        <UFormGroup label="Nomor SP3" name="Nomor_SP3">
        <UInput v-model="state.Nomor_SP3" />
        </UFormGroup>

        <UFormGroup label="Tanggal SP3" name="Tanggal_SP3">
        <UInput v-model="state.Tanggal_SP3" />
        </UFormGroup>

        <UFormGroup label="Biaya Pekerjaan" name="Biaya_Pekerjaan">
        <UInput v-model="state.Biaya_Pekerjaan" type="number" />
        </UFormGroup>

        <UFormGroup label="Jangka Waktu Pekerjaan" name="Jangka_Waktu_Pekerjaan">
        <UInput v-model="state.Jangka_Waktu_Pekerjaan" type="number" />
        </UFormGroup>

        <UFormGroup label="Nilai TKDN" name="Nilai_TKDN">
        <UInput v-model="state.Nilai_TKDN" type="number" />
        </UFormGroup>

        <UFormGroup label="Nomor Nodin" name="Nomor_Nodin">
        <UInput v-model="state.Nomor_Nodin" />
        </UFormGroup>

        <UFormGroup label="Tanggal Nodin" name="Tanggal_Nodin">
        <UInput v-model="state.Tanggal_Nodin" />
        </UFormGroup>

        <UFormGroup label="Tanggal Email" name="Tanggal_Email">
        <UInput v-model="state.Tanggal_Email" />
        </UFormGroup>

        <UFormGroup label="No BA Rapat" name="No_BA_Rapat">
        <UInput v-model="state.No_BA_Rapat" />
        </UFormGroup>

        <UFormGroup label="Tanggal BA Rapat" name="Tanggal_BA_Rapat">
        <UInput v-model="state.Tanggal_BA_Rapat" />
        </UFormGroup>

        <UFormGroup label="No Supen" name="No_Supen">
        <UInput v-model="state.No_Supen" />
        </UFormGroup>

        <UFormGroup label="Tanggal Supen" name="Tanggal_Supen">
        <UInput v-model="state.Tanggal_Supen" />
        </UFormGroup>

        <UFormGroup label="Nomor BA Pembukaan Penawaran" name="Nomor_BA_Pembukaan_Penawaran">
        <UInput v-model="state.Nomor_BA_Pembukaan_Penawaran" />
        </UFormGroup>

        <UFormGroup label="Tanggal BA Pembukaan Penawaran" name="Tanggal_BA_Pembukaan_Penawaran">
        <UInput v-model="state.Tanggal_BA_Pembukaan_Penawaran" />
        </UFormGroup>

        <UFormGroup label="Nomor BA Eval" name="Nomor_BA_Eval">
        <UInput v-model="state.Nomor_BA_Eval" />
        </UFormGroup>

        <UFormGroup label="Tanggal BA Eval" name="Tanggal_BA_Eval">
        <UInput v-model="state.Tanggal_BA_Eval" />
        </UFormGroup>

        <UFormGroup label="Nomor BA Nego" name="Nomor_BA_Nego">
        <UInput v-model="state.Nomor_BA_Nego" />
        </UFormGroup>

        <UFormGroup label="Tanggal BA Nego" name="Tanggal_BA_Nego">
        <UInput v-model="state.Tanggal_BA_Nego" />
        </UFormGroup>

        <UFormGroup label="Nomor Pengumuman" name="Nomor_Pengumuman">
        <UInput v-model="state.Nomor_Pengumuman" />
        </UFormGroup>

        <UFormGroup label="Tanggal Pengumuman" name="Tanggal_Pengumuman">
        <UInput v-model="state.Tanggal_Pengumuman" />
        </UFormGroup>

        <UFormGroup label="terbilang masa pemeliharaan" name="terbilang_masa_pemeliharaan">
        <UInput v-model="state.terbilang_masa_pemeliharaan" />
        </UFormGroup>

        <UFormGroup label="terbilang jaminan pelaksanaan" name="terbilang_jpelaksanaan">
        <UInput v-model="state.terbilang_jpelaksanaan" />
        </UFormGroup>

        <UFormGroup label="terbilang biaya pekerjaan" name="terbilang_biaya_pekerjaan">
        <UInput v-model="state.terbilang_biaya_pekerjaan" />
        </UFormGroup>
        
        <UFormGroup label="terbilang jwaktu pekerjaan" name="terbilang_jwaktu_pekerjaan">
        <UInput v-model="state.terbilang_jwaktu_pekerjaan" />
        </UFormGroup>

        <UFormGroup label="terbilang nilai tkdn" name="terbilang_nilai_tkdn">
        <UInput v-model="state.terbilang_nilai_tkdn" />
        </UFormGroup>

        <UFormGroup label="Nomor Jampel" name="Nomor_Jampel">
        <UInput v-model="state.Nomor_Jampel" />
        </UFormGroup>

        <UFormGroup label="Tanggal Jampel" name="Tanggal_Jampel">
        <UInput v-model="state.Tanggal_Jampel" />
        </UFormGroup>

        <UFormGroup label="berlaku jampel" name="berlaku_jampel">
        <UInput v-model="state.berlaku_jampel" />
        </UFormGroup>

        <UFormGroup label="berakhir jampel" name="berakhir_jampel">
        <UInput v-model="state.berakhir_jampel" />
        </UFormGroup>

        <UFormGroup label="Bank BUMN" name="Bank_BUMN">
        <UInput v-model="state.Bank_BUMN" />
        </UFormGroup>

        <UFormGroup label="Nomor BA Klarif" name="Nomor_BA_Klarif">
        <UInput v-model="state.Nomor_BA_Klarif" />
        </UFormGroup>

        <UFormGroup label="Tanggal BA Klarif" name="Tanggal_BA_Klarif">
        <UInput v-model="state.Tanggal_BA_Klarif" />
        </UFormGroup>
       

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </UCard>
  </Container>
</template>

<style scoped>
/* Background Animation */
body {
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  background-size: 400% 400%;
  animation: gradientBackground 15s ease infinite;
}

@keyframes gradientBackground {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Logo Animation */
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

/* Form Container */
.form-container {
  max-width: 800px;
  padding: 30px;
  margin: 40px auto;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s, box-shadow 0.3s;
}

.form-container:hover {
  transform: scale(1.02);
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.35);
}

/* Form Fields */
input[type="text"], input[type="date"], .UInput {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus, input[type="date"]:focus, .UInput:focus {
  border-color: #007acc;
  box-shadow: 0px 0px 8px rgba(0, 122, 204, 0.5);
}

/* Submit Button */
.submit-button {
  padding: 12px 20px;
  width: 100%;
  background: linear-gradient(45deg, #1a73e8, #4CAF50);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}

.submit-button:hover {
  background: linear-gradient(45deg, #4CAF50, #1a73e8);
  transform: translateY(-2px);
}

/* Loading Spinner */
.loading-spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1a73e8;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-left: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Success Notification */
.success-message {
  background: linear-gradient(45deg, #4CAF50, #66BB6A);
  color: white;
  padding: 12px;
  border-radius: 5px;
  text-align: center;
  margin-top: 20px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  animation: fadeInOut 4s ease-in-out;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  20%, 80% { opacity: 1; }
}

/* Title Section */
h1 {
  font-size: 2.5rem;
  color: #fff;
  margin-top: 10px;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
}

</style>
