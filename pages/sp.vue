<template>
  <div class="form-container">
    <h1>Form Input</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group" v-for="(field, index) in fields" :key="index">
        <label :for="field.name">{{ field.label }}</label>
        <input
          v-model="formData[field.name]"
          :type="field.type"
          :placeholder="field.placeholder"
          :id="field.name"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      fields: [
        { name: 'Jenis_Tender', label: 'Jenis Tender', type: 'text', placeholder: 'Enter Jenis Tender' },
        { name: 'Jenis_Pengadaan', label: 'Jenis Pengadaan', type: 'text', placeholder: 'Enter Jenis Pengadaan' },
        { name: 'Jenis_Kontrak', label: 'Jenis Kontrak', type: 'text', placeholder: 'Enter Jenis Kontrak' },
        { name: 'Pekerjaan', label: 'Pekerjaan', type: 'text', placeholder: 'Enter Pekerjaan' },
        { name: 'Pekerjaan_UP', label: 'Pekerjaan UP', type: 'text', placeholder: 'Enter Pekerjaan UP' },
        { name: 'Perdir_PBJ', label: 'Perdir PBJ', type: 'text', placeholder: 'Enter Perdir PBJ' },
        { name: 'Tempat_Tanda_Tangan', label: 'Tempat Tanda Tangan', type: 'text', placeholder: 'Enter Tempat Tanda Tangan' },
        { name: 'Tahun', label: 'Tahun', type: 'number', placeholder: 'Enter Tahun' },
        { name: 'Nama_P1', label: 'Nama P1', type: 'text', placeholder: 'Enter Nama P1' },
        { name: 'Jabatan_P1', label: 'Jabatan P1', type: 'text', placeholder: 'Enter Jabatan P1' },
        { name: 'Perusahaan_P1', label: 'Perusahaan P1', type: 'text', placeholder: 'Enter Perusahaan P1' },
        { name: 'Reg_P1', label: 'Reg P1', type: 'text', placeholder: 'Enter Reg P1' },
        { name: 'Alamat_P1', label: 'Alamat P1', type: 'text', placeholder: 'Enter Alamat P1' },
        { name: 'SK_P1', label: 'SK P1', type: 'text', placeholder: 'Enter SK P1' },
        { name: 'No_Telp_P1', label: 'No Telp P1', type: 'tel', placeholder: 'Enter No Telp P1' },
        { name: 'Website_P1', label: 'Website P1', type: 'url', placeholder: 'Enter Website P1' },
        { name: 'Faksimili_P1', label: 'Faksimili P1', type: 'text', placeholder: 'Enter Faksimili P1' },
        { name: 'Email_P1', label: 'Email P1', type: 'email', placeholder: 'Enter Email P1' },
        { name: 'Jabatan_Pengawas_P1', label: 'Jabatan Pengawas P1', type: 'text', placeholder: 'Enter Jabatan Pengawas P1' },
        { name: 'Sub_Reg_Pengawas_P1', label: 'Sub Reg Pengawas P1', type: 'text', placeholder: 'Enter Sub Reg Pengawas P1' },
        { name: 'Masa_Pemeliharaan', label: 'Masa Pemeliharaan', type: 'text', placeholder: 'Enter Masa Pemeliharaan' },
        { name: 'Jaminan_Pelaksanaan', label: 'Jaminan Pelaksanaan', type: 'text', placeholder: 'Enter Jaminan Pelaksanaan' },
        { name: 'Tempat_Pelaksanaan_Pekerjaan', label: 'Tempat Pelaksanaan Pekerjaan', type: 'text', placeholder: 'Enter Tempat Pelaksanaan Pekerjaan' },
        { name: 'Pengadilan', label: 'Pengadilan', type: 'text', placeholder: 'Enter Pengadilan' },
        { name: 'Tempat_Serah_Terima', label: 'Tempat Serah Terima', type: 'text', placeholder: 'Enter Tempat Serah Terima' },
        { name: 'Persentase_Pembayaran', label: 'Persentase Pembayaran', type: 'text', placeholder: 'Enter Persentase Pembayaran' },
        { name: 'Nama_P2', label: 'Nama P2', type: 'text', placeholder: 'Enter Nama P2' },
        { name: 'Jabatan_P2', label: 'Jabatan P2', type: 'text', placeholder: 'Enter Jabatan P2' },
        { name: 'Bentuk_Perusahaan_P2', label: 'Bentuk Perusahaan P2', type: 'text', placeholder: 'Enter Bentuk Perusahaan P2' },
        { name: 'Perusahaan_P2', label: 'Perusahaan P2', type: 'text', placeholder: 'Enter Perusahaan P2' },
        { name: 'Alamat_P2', label: 'Alamat P2', type: 'text', placeholder: 'Enter Alamat P2' },
        { name: 'Telepon_P2', label: 'Telepon P2', type: 'tel', placeholder: 'Enter Telepon P2' },
        { name: 'Website_P2', label: 'Website P2', type: 'url', placeholder: 'Enter Website P2' },
        { name: 'Faksimili_P2', label: 'Faksimili P2', type: 'text', placeholder: 'Enter Faksimili P2' },
        { name: 'Email_P2', label: 'Email P2', type: 'email', placeholder: 'Enter Email P2' },
        { name: 'No_Akta_1', label: 'No Akta 1', type: 'text', placeholder: 'Enter No Akta 1' },
        { name: 'Tanggal_Akta_1', label: 'Tanggal Akta 1', type: 'date', placeholder: 'Enter Tanggal Akta 1' },
        { name: 'Notaris_Akta_1', label: 'Notaris Akta 1', type: 'text', placeholder: 'Enter Notaris Akta 1' },
        { name: 'Kota_Akta_1', label: 'Kota Akta 1', type: 'text', placeholder: 'Enter Kota Akta 1' },
        { name: 'No_Pengesahan_Akta_1', label: 'No Pengesahan Akta 1', type: 'text', placeholder: 'Enter No Pengesahan Akta 1' },
        { name: 'Tanggal_Pengesahan_Akta_1', label: 'Tanggal Pengesahan Akta 1', type: 'date', placeholder: 'Enter Tanggal Pengesahan Akta 1' },
        { name: 'No_Akta_2', label: 'No Akta 2', type: 'text', placeholder: 'Enter No Akta 2' },
        { name: 'Perihal_Akta_2', label: 'Perihal Akta 2', type: 'text', placeholder: 'Enter Perihal Akta 2' },
        { name: 'Tanggal_Akta_2', label: 'Tanggal Akta 2', type: 'date', placeholder: 'Enter Tanggal Akta 2' },
        { name: 'Notaris_Akta_2', label: 'Notaris Akta 2', type: 'text', placeholder: 'Enter Notaris Akta 2' },
        { name: 'Kota_Akta_2', label: 'Kota Akta 2', type: 'text', placeholder: 'Enter Kota Akta 2' },
        { name: 'Perihal_Pengesahan_Akta_2', label: 'Perihal Pengesahan Akta 2', type: 'text', placeholder: 'Enter Perihal Pengesahan Akta 2' },
        { name: 'No_Pengesahan_Akta_2', label: 'No Pengesahan Akta 2', type: 'text', placeholder: 'Enter No Pengesahan Akta 2' },
        { name: 'Tanggal_Pengesahan_Akta_2', label: 'Tanggal Pengesahan Akta 2', type: 'date', placeholder: 'Enter Tanggal Pengesahan Akta 2' },
        { name: 'Nomor_Rekening_P2', label: 'Nomor Rekening P2', type: 'text', placeholder: 'Enter Nomor Rekening P2' },
        { name: 'Atas_Nama_Norek', label: 'Atas Nama Norek', type: 'text', placeholder: 'Enter Atas Nama Norek' },
        { name: 'Nama_Bank', label: 'Nama Bank', type: 'text', placeholder: 'Enter Nama Bank' },
        { name: 'Nomor_SP3', label: 'Nomor SP3', type: 'text', placeholder: 'Enter Nomor SP3' },
        { name: 'Tanggal_SP3', label: 'Tanggal SP3', type: 'date', placeholder: 'Enter Tanggal SP3' },
        { name: 'Biaya_Pekerjaan', label: 'Biaya Pekerjaan', type: 'number', placeholder: 'Enter Biaya Pekerjaan' },
        { name: 'Jangka_Waktu_Pekerjaan', label: 'Jangka Waktu Pekerjaan', type: 'text', placeholder: 'Enter Jangka Waktu Pekerjaan' },
        { name: 'Nilai_TKDN', label: 'Nilai TKDN', type: 'text', placeholder: 'Enter Nilai TKDN' },
        { name: 'Nomor_Nodin', label: 'Nomor Nodin', type: 'text', placeholder: 'Enter Nomor Nodin' },
        { name: 'Tanggal_Nodin', label: 'Tanggal Nodin', type: 'date', placeholder: 'Enter Tanggal Nodin' },
        { name: 'Tanggal_Email', label: 'Tanggal Email', type: 'date', placeholder: 'Enter Tanggal Email' },
        { name: 'No_BA_Rapat', label: 'No BA Rapat', type: 'text', placeholder: 'Enter No BA Rapat' },
        { name: 'Tanggal_BA_Rapat', label: 'Tanggal BA Rapat', type: 'date', placeholder: 'Enter Tanggal BA Rapat' },
        { name: 'No_Supen', label: 'No Supen', type: 'text', placeholder: 'Enter No Supen' },
        { name: 'Tanggal_Supen', label: 'Tanggal Supen', type: 'date', placeholder: 'Enter Tanggal Supen' },
        { name: 'Nomor_BA_Pembukaan_Penawaran', label: 'Nomor BA Pembukaan Penawaran', type: 'text', placeholder: 'Enter Nomor BA Pembukaan Penawaran' },
        { name: 'Tanggal_BA_Pembukaan_Penawaran', label: 'Tanggal BA Pembukaan Penawaran', type: 'date', placeholder: 'Enter Tanggal BA Pembukaan Penawaran' },
        { name: 'Nomor_BA_Eval', label: 'Nomor BA Eval', type: 'text', placeholder: 'Enter Nomor BA Eval' },
        { name: 'Tanggal_BA_Eval', label: 'Tanggal BA Eval', type: 'date', placeholder: 'Enter Tanggal BA Eval' },
        { name: 'Nomor_BA_Nego', label: 'Nomor BA Nego', type: 'text', placeholder: 'Enter Nomor BA Nego' },
        { name: 'Tanggal_BA_Nego', label: 'Tanggal BA Nego', type: 'date', placeholder: 'Enter Tanggal BA Nego' },
        { name: 'Nomor_Pengumuman', label: 'Nomor Pengumuman', type: 'text', placeholder: 'Enter Nomor Pengumuman' },
        { name: 'Tanggal_Pengumuman', label: 'Tanggal Pengumuman', type: 'date', placeholder: 'Enter Tanggal Pengumuman' },
        { name: 'terbilang_masa_pemeliharaan', label: 'Terbilang Masa Pemeliharaan', type: 'text', placeholder: 'Enter Terbilang Masa Pemeliharaan' },
        { name: 'terbilang_jpelaksanaan', label: 'Terbilang Jpelaksanaan', type: 'text', placeholder: 'Enter Terbilang Jpelaksanaan' },
        { name: 'terbilang_biaya_pekerjaan', label: 'Terbilang Biaya Pekerjaan', type: 'text', placeholder: 'Enter Terbilang Biaya Pekerjaan' },
        { name: 'terbilang_jwaktu_pekerjaan', label: 'Terbilang Jwaktu Pekerjaan', type: 'text', placeholder: 'Enter Terbilang Jwaktu Pekerjaan' },
        { name: 'terbilang_nilai_tkdn', label: 'Terbilang Nilai TKDN', type: 'text', placeholder: 'Enter Terbilang Nilai TKDN' },
        { name: 'Nomor_Jampel', label: 'Nomor Jampel', type: 'text', placeholder: 'Enter Nomor Jampel' },
        { name: 'Tanggal_Jampel', label: 'Tanggal Jampel', type: 'date', placeholder: 'Enter Tanggal Jampel' },
        { name: 'berlaku_jampel', label: 'Berlaku Jampel', type: 'text', placeholder: 'Enter Berlaku Jampel' },
        { name: 'berakhir_jampel', label: 'Berakhir Jampel', type: 'text', placeholder: 'Enter Berakhir Jampel' },
        { name: 'Bank_BUMN', label: 'Bank BUMN', type: 'text', placeholder: 'Enter Bank BUMN' },
        { name: 'Nomor_BA_Klarif', label: 'Nomor BA Klarif', type: 'text', placeholder: 'Enter Nomor BA Klarif' },
        { name: 'Tanggal_BA_Klarif', label: 'Tanggal BA Klarif', type: 'date', placeholder: 'Enter Tanggal BA Klarif' }
      ]
    };
  },
  async handleSubmit() {
      try {
        // Create a new folder in Google Drive
        const folderName = 'hasil generate';
        const folderId = await this.createFolder(folderName);

        // Generate the Google Document from the template
        const templateId = '1aOfQNXKaLLeOSKZ0JBxoqeKVt1dbKZsUPmLtBMZLfRg'; // Replace with your template ID
        const newDocId = await this.generateDocumentFromTemplate(templateId, this.formData, folderId);

        // Optional: Provide feedback to the user
        alert(`Document generated successfully! You can find it in the folder: ${folderName}`);
      } catch (error) {
        console.error("Error generating document:", error);
        alert("There was an error generating the document.");
      }
    },

    async createFolder(folderName) {
      const accessToken = '1_Zp_hmWI510Farfvby5KZaDwiLpU4mCj'; // Replace with the actual access token
      const response = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
        }),
      });
      const data = await response.json();
      return data.id; // Return the ID of the created folder
    },

    async generateDocumentFromTemplate(templateId, formData, folderId) {
      const accessToken = '1_Zp_hmWI510Farfvby5KZaDwiLpU4mCj'; // Replace with the actual access token
      const newDocument = await fetch(`https://docs.googleapis.com/v1/documents/${templateId}:copy`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Generated Document',
          parents: [folderId],
        }),
      });
      const newDocData = await newDocument.json();

      // Replace placeholders in the new document (implement this method according to your needs)
      await this.replacePlaceholders(newDocData.documentId, formData);

      return newDocData.documentId; // Return the ID of the new document
    },

    async replacePlaceholders(documentId, formData) {
      const accessToken = '1aOfQNXKaLLeOSKZ0JBxoqeKVt1dbKZsUPmLtBMZLfRg'; // Replace with the actual access token
      const requests = Object.keys(formData).map(key => ({
        replaceAllText: {
          containsText: {
            text: `<<${key}>>`, // The placeholder format
            matchCase: true,
          },
          replaceText: formData[key],
        },
      }));

      await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests }),
      });
    },
  };
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

label {
  flex: 0 0 40%;
  font-weight: bold;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>

