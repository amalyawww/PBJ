<template>
  <div>
    <h1>Form Surat Penetapan</h1>
    <form @submit.prevent="generateSurat">
      <div v-for="(field, index) in fields" :key="index">
        <label :for="field.name">{{ field.label }}</label>
        <input
          type="text"
          :id="field.name"
          v-model="formData[field.name]"
          required
        />
      </div>
      <button type="submit">Generate Surat</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        Nomor_SP3: '',
        Jenis_Tender_UP: '',
      },
      fields: [
        { name: 'Nomor_SP3', label: 'Nomor SP3' },
        { name: 'Jenis_Tender_UP', label: 'Jenis Tender UP' },
      ],
    };
  },
  
  methods: {
    async generateSurat() {
      console.log('Form data before sending:', this.formData); // Log data yang akan dikirim
      try {
        const response = await axios.post('/api/generate-surat', this.formData);
        console.log('Dokumen berhasil di-generate:', response.data);
        alert(`Dokumen berhasil dibuat.`);
      } catch (error) {
        console.error('Error generating document:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Tambahkan style jika perlu */
</style>
