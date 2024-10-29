<template>
  <div class="database">
    <h1>Data Table</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by name or job title..."
      class="search-bar"
    />

    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Jabatan</th>
          <th>Instansi</th>
          <th>Alamat</th>
          <th>Kota</th>
          <th>SK</th>
          <th>No_Telp_P1</th>
          <th>Website_P1</th>
          <th>Faksimili_P1</th>
          <th>Email_P1</th>
          <th>Email_Outlook</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in filteredData" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ row[0] }}</td> <!-- B -->
          <td>{{ row[1] }}</td> <!-- C -->
          <td>{{ row[2] }}</td> <!-- D -->
          <td>{{ row[3] }}</td> <!-- E -->
          <td>{{ row[4] }}</td> <!-- F -->
          <td>{{ row[5] }}</td> <!-- G -->
          <td>{{ row[6] }}</td> <!-- H -->
          <td>{{ row[7] }}</td> <!-- I -->
          <td>{{ row[8] }}</td> <!-- J -->
          <td>{{ row[9] }}</td> <!-- K -->
          <td>{{ row[10] }}</td> <!-- L -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { google } from 'googleapis';
import googleapis_docs from '@googleapis/docs';
import { defineEventHandler, readBody } from 'h3';

export default defineComponent({
  name: 'DataTable',
  setup() {
    const searchQuery = ref('');
    const data = ref([]);
    const filteredData = computed(() => {
      if (!searchQuery.value) return data.value;
      const query = searchQuery.value.toLowerCase();
      return data.value.filter((row) =>
        row.some((cell) => cell.toLowerCase().includes(query))
      );
    });

    const fetchSheetData = async () => {
      const sheets = google.sheets('v4');
      const auth = new google.auth.GoogleAuth({
        credentials: {
          "type": "service_account",
          "project_id": "pbjpelindo",
          "private_key_id": "edf00c027cdc2666e659c5152885937e574572b2",
          "private_key": "YOUR_PRIVATE_KEY_HERE",
          "client_email": "testpjb@pbjpelindo.iam.gserviceaccount.com",
          "client_id": "101754866875342377618",
          "auth_uri": "https://accounts.google.com/o/oauth2/auth",
          "token_uri": "https://oauth2.googleapis.com/token",
          "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
          "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/testpjb%40pbjpelindo.iam.gserviceaccount.com"
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });

      try {
        const client = await auth.getClient();
        const spreadsheetId = 'YOUR_SHEET_ID'; // Fill in your Sheet ID
        const range = 'Sheet1!B2:L'; // Adjust range if necessary
        const response = await sheets.spreadsheets.values.get({
          auth: client,
          spreadsheetId,
          range,
        });
        data.value = response.data.values || [];
      } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
      }
    };

    onMounted(() => {
      fetchSheetData();
    });

    return {
      searchQuery,
      filteredData,
    };
  },
});
</script>

<style scoped>
.database {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.search-bar {
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}
th {
  background-color: #f4f4f4;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
