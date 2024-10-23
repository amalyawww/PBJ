// import express, { type Request, type Response } from 'express'; // Menggunakan import type
// import fs from 'fs';
// import path from 'path';
// import PizZip from 'pizzip';
// import Docxtemplater from 'docxtemplater';


// const router = express.Router(); // Menggunakan router dari Express

// // Mendefinisikan tipe untuk request body
// interface DppRequestBody {
//   nama: string;
//   pekerjaan: string;
// }

// // Endpoint untuk menangani permintaan generate dokumen Word
// router.post('/dpp', (req: Request<{}, {}, DppRequestBody>, res: Response) => {
//   const { nama, pekerjaan } = req.body;

//   if (!nama || !pekerjaan) {
//     return res.status(400).send('Nama dan Pekerjaan tidak boleh kosong');
//   }

//   // Baca template Word dari direktori /template/
//   const templatePath = path.join(__dirname, '../../template/template.docx');

//   fs.readFile(templatePath, 'binary', (err, content) => {
//     if (err) {
//       console.error('Error reading template:', err);
//       return res.status(500).send('Gagal membaca template dokumen');
//     }

//     // Load dokumen template menggunakan PizZip dan Docxtemplater
//     const zip = new PizZip(content);
//     const doc = new Docxtemplater(zip);

//     // Ganti placeholder di template dengan data dari request
//     doc.setData({
//       nama: nama,
//       pekerjaan: pekerjaan,
//     });

//     try {
//       // Render dokumen
//       doc.render();

//       // Dapatkan buffer hasil dokumen yang sudah dimodifikasi
//       const buffer = doc.getZip().generate({ type: 'nodebuffer' });

//       // Set header untuk file download
//       res.setHeader('Content-Disposition', 'attachment; filename=output.docx');
//       res.setHeader(
//         'Content-Type',
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//       );

//       // Kirim file ke client
//       return res.send(buffer);
//     } catch (error) {
//       console.error('Error generating document:', error);
//       return res.status(500).send('Gagal menghasilkan dokumen');
//     }
//   });
// });

// export default router; // Ekspor router
