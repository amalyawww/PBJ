<template>
  <div>
    <h1>Form Penggantian Placeholder</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="pekerjaan">Pekerjaan:</label>
        <input type="text" id="pekerjaan" v-model="pekerjaan" required />
      </div>
      <button type="submit">Kirim</button>
    </form>
    <div v-if="loading">Sedang memproses...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">Penggantian placeholder berhasil!</div>
  </div>
</template>

<script>
import { google } from 'googleapis';

export default {
  data() {
    return {
      pekerjaan: '',
      loading: false,
      success: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.error = null;
      this.success = false;

      try {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            type: "service_account",
            project_id: process.env.VUE_APP_GOOGLE_PROJECT_ID,
            private_key_id: process.env.VUE_APP_GOOGLE_PRIVATE_KEY_ID,
            private_key: process.env.VUE_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.VUE_APP_GOOGLE_CLIENT_EMAIL,
            client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.VUE_APP_GOOGLE_CLIENT_EMAIL}`,
          },
          scopes: ['https://www.googleapis.com/auth/documents'],
        });

        const docs = google.docs({ version: 'v1', auth });
        const documentId = '1CquQ_0U9gJ3ub-MkO3EyT8cb0tqVSHcBX3-Fo3q_oNs'; // ID for the Google Doc

        // Ganti placeholder
        await docs.documents.batchUpdate({
          documentId,
          requestBody: {
            requests: [
              {
                replaceAllText: {
                  replaceText: this.pekerjaan,
                  containsText: {
                    text: '<<Pekerjaan_UP>>',
                    matchCase: true,
                  },
                },
              },
            ],
          },
        });

        // Save to Google Drive
        const drive = google.drive({ version: 'v3', auth });
        const fileId = '10tQ_a-qimwiXVRqFlol5UVF2orCxB1ZP'; // ID for Google Drive folder
        await drive.files.create({
          requestBody: {
            name: 'Hasil Penggantian',
            mimeType: 'application/vnd.google-apps.document',
            parents: [fileId], // Specify the parent folder ID
          },
          fields: 'id',
        });

        this.success = true;
      } catch (err) {
        this.error = 'Terjadi kesalahan: ' + err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.success {
  color: green;
}
</style>
