import { google } from 'googleapis';
import path from 'path';

const keyFilePath = path.resolve(process.cwd(), 'credentials.json');

export default async (req, res) => {
  if (req.method === 'POST') {
    const formData = req.body;
    console.log('Received form data:', formData); // Log data yang diterima

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents'],
    });

    const drive = google.drive({ version: 'v3', auth });
    const docs = google.docs({ version: 'v1', auth });

    const originalFileId = '1CmL3-8ddVGJ4DOlxG0En10g5YviXjms3OWvKJghpldQ'; // Ganti dengan ID dokumen asli

    try {
      // 1. Clone the original file
      const copyResponse = await drive.files.copy({
        fileId: originalFileId,
        requestBody: {
          name: 'Hasil Generate', // Nama baru untuk salinan
        },
      });

      const newFileId = copyResponse.data.id;

      // 2. Prepare requests to replace placeholders
      const requests = Object.keys(formData).map(key => ({
        replaceAllText: {
          containsText: {
            text: `<<${key}>>`, // Menggunakan backticks untuk interpolasi string
            matchCase: true,
          },
          replaceText: formData[key],
        },
      }));

      // 3. Update the new document with the placeholders
      const updatedDocument = await docs.documents.batchUpdate({
        documentId: newFileId,
        requestBody: {
          requests,
        },
      });

      if (!updatedDocument || !updatedDocument.data) {
        console.error('Error updating document:', updatedDocument);
        return res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui dokumen' });
      }

      res.status(200).json({ message: 'Dokumen berhasil diperbarui', newFileId });
    } catch (error) {
      console.error('Error in generateSurat:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
