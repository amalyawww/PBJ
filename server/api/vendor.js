import { google } from 'googleapis';
import { defineEventHandler } from 'h3';
import path from 'path';

export default defineEventHandler(async () => {
  try {
    // Path ke file credentials.json di root proyek
    const keyFilePath = path.resolve(process.cwd(), 'credentials.json');
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    // Inisialisasi Google Sheets API
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: '11JxWxCeF6e6En5FnOSo0li7wmWOEuJWbt3sgBh-qWk8', // Contoh Spreadsheet ID
        range: 'Data Vendor!A1:AA100',
        
    });

    return response.data.values;
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return { error: 'Unable to fetch data from Google Sheets.' };
  }
});
