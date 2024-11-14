<script lang="ts" setup>
import { SuratFormInputSchema } from '@/schemas/surat' 
const nama = "amel"

// async function editdata () {
//   console.log('ALO')

//   const data = {
//     name: 'papa pian'
//   }
// }




// form
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { reactive } from 'vue';


type Schema = z.output<typeof SuratFormInputSchema>

// 
const state = reactive({
  Nomor_SP3: '',
  Jenis_Tender_UP: '',
  Pekerjaan_UP: '',
  Tanggal_Email: '',
  Jenis_Tender: '',
  Pekerjaan: '',
  Perusahaan_P2: '',
  Alamat_P2: '',
  NPWP_P2: '',
  Biaya_Pekerjaan: 0,
  terbilang_1: '',
  Jangka_Waktu_Pelaksanaan: 0,
  terbilang_2: '',
  Jangka_Waktu_Pemeliharaan: 0,
  terbilang_3: '',
  TKDN: 0,
  Terbilang_TKDN: '',
  Tanggal_Penetapan: '',
  Perdir_PBJ: '',
  Nomor_Nodin: '',
  Tanggal_Nodin: '',
});





async function onSubmit(event: FormSubmitEvent<Schema>) {
  const result = await $fetch('/api/generate-surat', {
    method: 'POST',
    body: event.data
  })
  console.log('hasil submit', result)
}
</script>

<template>
  <div class="max-w-screen-lg mx-auto">
    <UForm :schema="SuratFormInputSchema" :state="state" class="space-y-4" @submit.prevent="onSubmit">
      
      <UFormGroup label="Nomor SP3" name="Nomor_SP3">
        <UInput v-model="state.Nomor_SP3" />
      </UFormGroup>

      <UFormGroup label="Jenis Tender KAPITAL" name="Jenis_Tender_UP">
        <UInput v-model="state.Jenis_Tender_UP" />
      </UFormGroup>

      <UFormGroup label="Nama Pekerjaan KAPITAL" name="Pekerjaan_UP">
        <UInput v-model="state.Pekerjaan_UP" />
      </UFormGroup>

      <UFormGroup label="Tanggal Email" name="Tanggal_Email">
        <UInput type="date" v-model="state.Tanggal_Email" />
      </UFormGroup>

      <UFormGroup label="Jenis Tender" name="Jenis_Tender">
        <UInput v-model="state.Jenis_Tender" />
      </UFormGroup>

      <UFormGroup label="Pekerjaan" name="Pekerjaan">
        <UInput v-model="state.Pekerjaan" />
      </UFormGroup>

      <UFormGroup label="Perusahaan Pihak Kedua" name="Perusahaan_P2">
        <UInput v-model="state.Perusahaan_P2" />
      </UFormGroup>

      <UFormGroup label="Alamat Pihak Kedua" name="Alamat_P2">
        <UInput v-model="state.Alamat_P2" />
      </UFormGroup>

      <UFormGroup label="NPWP Pihak Kedua" name="NPWP_P2">
        <UInput v-model="state.NPWP_P2" />
      </UFormGroup>

      <UFormGroup label="Biaya Pekerjaan" name="Biaya_Pekerjaan">
        <UInput v-model="state.Biaya_Pekerjaan" />
      </UFormGroup>

      <UFormGroup label="Terbilang Biaya Pekerjaan" name="terbilang_1">
        <UInput v-model="state.terbilang_1" />
      </UFormGroup>

      <UFormGroup label="Jangka Waktu Pelaksanaan" name="Jangka_Waktu_Pelaksanaan">
        <UInput v-model="state.Jangka_Waktu_Pelaksanaan" />
      </UFormGroup>

      <UFormGroup label="Terbilang Jangka Waktu Pelaksanaan" name="terbilang_2">
        <UInput v-model="state.terbilang_2" />
      </UFormGroup>

      <UFormGroup label="Jangka Waktu Pemeliharaan" name="Jangka_Waktu_Pemeliharaan">
        <UInput v-model="state.Jangka_Waktu_Pemeliharaan" />
      </UFormGroup>

      <UFormGroup label="Terbilang Jangka Waktu Pemeliharaan" name="terbilang_3">
        <UInput v-model="state.terbilang_3" />
      </UFormGroup>

      <UFormGroup label="TKDN" name="TKDN">
        <UInput v-model="state.TKDN" />
      </UFormGroup>

      <UFormGroup label="Terbilang TKDN" name="Terbilang_TKDN">
        <UInput v-model="state.Terbilang_TKDN" />
      </UFormGroup>

      <UFormGroup label="Tanggal Penetapan" name="Tanggal_Penetapan">
        <UInput type="date" v-model="state.Tanggal_Penetapan" />
      </UFormGroup>

      <!-- Menambahkan input baru -->
      <UFormGroup label="Nomor Perdir PBJ" name="Perdir_PBJ">
        <UInput v-model="state.Perdir_PBJ" />
      </UFormGroup>

      <UFormGroup label="Nomor Nota Dinas" name="Nomor_Nodin">
        <UInput v-model="state.Nomor_Nodin" />
      </UFormGroup>

      <UFormGroup label="Tanggal Nota Dinas" name="Tanggal_Nodin">
        <UInput type="date" v-model="state.Tanggal_Nodin" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </div>
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
