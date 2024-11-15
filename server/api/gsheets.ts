import { defineEventHandler } from 'h3';
import { google } from 'googleapis';

export default defineEventHandler(async (event) => {
  try {
    // Autentikasi dengan Google API menggunakan Service Account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID // Ganti dengan ID Google Sheets
    const range = 'Data Vendor!D2:D'; // Sesuaikan range data

    // Mengambil data dari Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return { message: 'No data found' };
    }

    // Mengirim data sebagai JSON
    return { data: rows.map(row => row[0]) };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { message: 'Failed to fetch data from Google Sheets' };
  }
});
