<!-- <template>
  <div class="container">
    <h2>Generate Document</h2>
    <form @submit.prevent="generateDocument">
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div class="form-group">
        <label for="ccemail1">CC Email 1:</label>
        <input v-model="form.ccemail1" type="email" />
      </div>
      <div class="form-group">
        <label for="ccemail2">CC Email 2:</label>
        <input v-model="form.ccemail2" type="email" />
      </div>
      <div class="form-group">
        <label for="ccemail3">CC Email 3:</label>
        <input v-model="form.ccemail3" type="email" />
      </div>
      <div class="form-group">
        <label for="ccemail4">CC Email 4:</label>
        <input v-model="form.ccemail4" type="email" />
      </div>
      <div class="form-group">
        <label for="pekerjaan">Pekerjaan:</label>
        <input v-model="form.pekerjaan" required />
      </div>
      <div class="form-group">
        <label for="jenis">Jenis Pekerjaan:</label>
        <input v-model="form.jenis" required />
      </div>
      <div class="form-group">
        <label for="jabatanPengawas">Jabatan Pengawas:</label>
        <input v-model="form.jabatanPengawas" required />
      </div>
      <button type="submit">Generate Document</button>
    </form>
  </div>
</template>

<script>
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { readFileSync } from 'fs';

export default {
  data() {
    return {
      form: {
        email: '',
        ccemail1: '',
        ccemail2: '',
        ccemail3: '',
        ccemail4: '',
        pekerjaan: '',
        jenis: '',
        jabatanPengawas: ''
      }
    };
  },
  methods: {
    async generateDocument() {
  // Fetching the document from the public folder
  const response = await fetch('/testing.docx'); // Use this path
  if (!response.ok) {
    console.error("Failed to fetch the document:", response.statusText);
    return; // Handle the error appropriately
  }

  const arrayBuffer = await response.arrayBuffer();
  const zip = new PizZip(arrayBuffer);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, lineBreaks: true });

  doc.render({
    email: this.form.email,
    ccemail1: this.form.ccemail1,
    ccemail2: this.form.ccemail2,
    ccemail3: this.form.ccemail3,
    ccemail4: this.form.ccemail4,
    pekerjaan: this.form.pekerjaan,
    jenis: this.form.jenis,
    jabatanPengawas: this.form.jabatanPengawas
  });

  const output = doc.getZip().generate({ type: 'blob' });
  FileSaver.saveAs(output, 'generated_document.docx');
}

  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
</style> -->
