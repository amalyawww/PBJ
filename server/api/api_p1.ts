import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const sheets = google.sheets('v4');

// Ambil Spreadsheet ID dari .env
const spreadsheetId = process.env.ID_GSHEETS_DATA_P1 || '';

/**
 * Ambil data dari Google Sheets
 * @param sheetName Nama tab di Google Sheets
 * @returns Data dalam bentuk array
 */
export const getSheetData = async (sheetName: string): Promise<any[]> => {
  try {
    // Autentikasi dengan API Key
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    // Buat client
    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    // Request data dari Google Sheets
    const range = 'DATA PEJABAT'; // Nama sheet yang benar
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    // Return data
    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch Google Sheets data');
  }
};
