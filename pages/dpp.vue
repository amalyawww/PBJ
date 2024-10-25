<template>
  <div>
    <h2>Form Pengisian Dokumen</h2>
    <form @submit.prevent="generateDocument">
      <input v-model="formData.nama" placeholder="nama" required />
      <button type="button" @click="previewDocument">Preview</button>
      <button type="submit">Generate Document</button>
    </form>

    <div v-if="previewText">
      <h3>Preview:</h3>
      <p>{{ previewText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

const formData = ref({
  nama: '',
});

const previewText = ref('');

// Fungsi untuk menggantikan placeholder di template Word
const replacePlaceholders = async (templateFile: ArrayBuffer, data: any) => {
  const zip = new PizZip(templateFile);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.setData(data);

  try {
    doc.render();
  } catch (error) {
    throw new Error("Error rendering document: " + error.message);
  }

  const output = doc.getZip().generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  return output;
};

// Fungsi untuk preview dokumen
const previewDocument = async () => {
  try {
    const templateFile = await fetch('/template/testingside.docx').then((res) => res.arrayBuffer());

    // Data yang akan menggantikan placeholder
    const data = {
      nama: formData.value.nama,
    };

    // Proses penggantian placeholder untuk preview
    const zip = new PizZip(templateFile);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData(data);
    doc.render();

    // Ambil isi dokumen setelah render untuk preview
    const outputText = doc.getFullText();
    previewText.value = outputText.replace(/<<nama>>/g, data.nama); // Gantikan placeholder dengan inputan

  } catch (error) {
    console.error("Failed to preview document:", error);
  }
};

// Fungsi untuk generate dokumen
const generateDocument = async () => {
  try {
    const templateFile = await fetch('/template/testingside.docx').then((res) => res.arrayBuffer());

    // Data yang akan menggantikan placeholder
    const data = {
      nama: formData.value.nama,
    };

    // Proses penggantian placeholder dan generate dokumen
    const generatedDoc = await replacePlaceholders(templateFile, data.nama);

    // Debugging: Cetak hasil akhir dokumen yang akan diunduh
    console.log("Generated Document Data:", data);

    // Unduh dokumen yang sudah digenerate
    saveAs(generatedDoc, 'Generated_Document.docx');
  } catch (error) {
    console.error("Failed to generate document:", error);
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
  font-size: 16px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
