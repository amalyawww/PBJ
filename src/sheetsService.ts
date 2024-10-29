// src/sheetsService.ts
import { google } from 'googleapis';

// Set up authentication using the service account credentials
const auth = new google.auth.JWT({
  email: "testpjb@pbjpelindo.iam.gserviceaccount.com", // Ganti dengan email dari service account
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD0lv1qr6GBr3is\nXTVby53bmPdbcRDEBgjRY2PSOxrCkrNvRSWK12dRlO/VepidR3425MDqWVJUpsKp\n5j81X/aO+eSHofs5CsqfWtTOhubj48ufyR2RIjrJRZHfGHr3dPbY0OWGrW7paPQ5\nQmCZeHnGgIiqFaX+MVz8Beu4wY5FjxtgsC7Aboz8WJe8DV5epIJSNxiHSDAvzwTW\nzgj7fdowslog0mWYW+Sp7qJlLPKoN6QJYxQAB8gvbmAEOEgaiQLA1RRXdWaLjQ4v\nglO/EkR2VyydjiIXzBJrSfyBcXJqLOy7wid7aKiXTh0Pre/JB5+6STZQNUcF4oBt\n87qesz6vAgMBAAECggEAWN5TjWPrBre+3MGxFX1SCev2VB8svEyE/69hIY2gF3o9\n//vbvCqvu5Cl46b7tIm5bjCHd56kr2U37YtfBAGuEBzzz+Qm537oSCY0lCWn1r15\nysDEIWuSeHbynWDDrQ2ucvDTtK9nUR91PSjE+H4xoNIq1cGv4kAFTPzJvQN2sgar\nT5k/FlHzyAttrYrEvZ0mwb3UM99rFZZSUbhyN2UqN5u8Yoch29yda4MYgBh+iVdb\nkILnLaBQslWeOrqYik34rcpvIpKq6wUNqNTN6baBO05zZes8yM5G0xzveeY2rWLI\nuMfurJTZfBCtoQeWZlF1gVFdXSkXOR0iA6zMqPG44QKBgQD8YhIQz2LFTPAMirjM\nW7hdTNSEzvq6kvyOxttDUTImPwLy046zkYwNmXzG6Kyb6vwJMaZtSdTytnUT/nWH\nHtEYwmqweQNo+2SZv0akkNlbd37iFZfAsGONXrSBjWzeqMwvD2hnsq18nkVPt+kP\nQn8cHOKiAuHdm4PNBjJ95Q5MCwKBgQD4GFPoMRwvTV5rXBIw/cjgs0j4EmYnl+eT\nsPeA0XqEM6yxwnRJBdbV/N9jIM6etRW1gZ4JOiOK60CXO2CVq0ZaR1DsDN6k9Sxy\nZaC2jNNY3waTrRbRr4kIzAnG6PKjdLraiIWIWNdRHjWM8r2dl29m5tHjJLRAaNFm\njJ8hvkNabQKBgQDl74N+BTN7hcj95DTRGo8xkZndFaWg7eFjQxDol8UUyzuod83/\nE4+BpGDl532636+XwMBbuXRlXI32FVKGNDFUWWxSMy5EKyVQXc/ChqVAi/HxkLKd\nPxaz6aCSl4KkqSy9g1Afic49RwTmyCtxV6fuuPJRoEafW9wMoqTFxjXsWQKBgQDw\nv0rNCrr6++0f6VyNxffkdJXehJw016eVHilPC/gDydFPPg9xvQTY6mYr324hfD/w\nvjMJaS2MZPVsy+XR1z6R5JqWNXboRDI5YH0wKD//AY10SIbYO6qSqsziBLNQAro/\nzjMmOG/Y+6OjfvqZrpYgGOSbssZnqk9pYBQbvnHFkQKBgQCTHSZH4VmMnY01fpbC\nFj7u/MjymyIc46mQdQMI1VMjSXG3tndHuRzekRnpjD37sdUjtgLwVP3bEFXEqzwI\ninqQypHEO31VtdyLj/qcurpWzahtfMAAV1V8pzjNqE53hGKQWByNFDMay7pxlRXG\nxKkneSh38efTyrR5qzJahmD1iA==\n-----END PRIVATE KEY-----\n",
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Create an instance of the Google Sheets API
const sheets = google.sheets({ version: 'v4', auth });

// Function to fetch data from a specific Google Sheet
export async function getSheetData(spreadsheetId: string, range: string) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values || []; // Return fetched data or an empty array
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error; // Throw the error to be handled by the calling function
  }
}

// Example usage
const SHEET_ID = '11JxWxCeF6e6En5FnOSo0li7wmWOEuJWbt3sgBh-qWk8'; // Replace with your Google Sheets ID
const RANGE = 'Data Vendor!A1:AA'; // Replace with your desired range

// Fetch data from Google Sheets and log it
getSheetData(SHEET_ID, RANGE)
  .then(data => {
    console.log('Fetched data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  