// import { google } from 'googleapis'
// import googleapis_docs from '@googleapis/docs'
// import { SuratFormInputSchema } from '@/schemas/dpp'
// import { gmail } from 'googleapis/build/src/apis/gmail';
// import path from 'path';
// import fs from 'fs';

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event)
//   const data = SuratFormInputSchema.parse(body)
  
//   const dppData: Record<string, string | number | null> = {
//     Pekerjaan: data.Pekerjaan || "",
//     Pekerjaan_UP: data.Pekerjaan_UP || "",
//     Tempat_Pelaksanaan_Pekerjaan: data.Tempat_Pelaksanaan_Pekerjaan || "",
//     Lokasi_Pelabuhan: data.Lokasi_Pelabuhan || "",


//   };
  
  
  
//   // * SETUP AUTH
//   // const creds = process.env.CREDENTIALS_JSON
//   const credsPath = path.resolve(process.cwd(), 'credentials.json');
//   const creds = JSON.parse(await fs.promises.readFile(credsPath, 'utf-8'));
//   if (!creds) return {
//     ok: false,
//     message: "njir ada error mama di creds",
//   }
//   const auth = new googleapis_docs.auth.GoogleAuth({
//     credentials: creds,
//     scopes: ["https://www.googleapis.com/auth/documents", "https://www.googleapis.com/auth/drive"],
//   });
//   const authClient = await auth.getClient();
//   if (!authClient)
//     return {
//       ok: false,
//       message: "njir ada error mama di authClient",
//     };
  

//   // * SETUP CLIENT API
//   // untuk terhubung memudahkan terhubung ke google apis
//   // @ts-ignore
//   const docs = google.docs({ version: "v1", auth: authClient });
//   // @ts-ignore
//   const drive = google.drive({ version: "v3", auth: authClient });

//   // * CLONE DOCUMENT FROM TEMPLATE DOCUMENT
//   // const templateDocumentId = process.env.DOC_TEMPLATE_ID;
// //   const templateDocumentId = process.env.DOC_TEMPLATE_ID;
// //   const cloned_document = await drive.files.copy({
// //     fileId: templateDocumentId,
// //     requestBody: {
// //       name: "Hasil Generate",
// //     },
// //   });
// //   if (!cloned_document || !cloned_document?.data?.id)
// //     return {
// //       ok: false,
// //       message: "njir ada error mama di cloned_document",
// //     };

// //   // * GIVE PERMISSION TO USER
// //   const drive_created = await drive.permissions.create({
// //     fileId: cloned_document.data.id,
// //     requestBody: {
// //       type: "user",
// //       role: "writer",
// //       // emailAddress: process.env.TARGET_EMAIL,
// //       emailAddress: process.env.TARGET_EMAIL,
// //     },
// //     fields: "id",
// //   });
// //   if (!drive_created || !drive_created?.data?.id)
// //     return {
// //       ok: false,
// //       message: "njir ada error mama di drive_created",
// //     };


// //   const updated_document = await docs.documents.batchUpdate({
// //     documentId: cloned_document.data.id,
// //     requestBody: {
// //       requests: Object.keys(dppData).map((key) => ({
// //         replaceAllText: {
// //           containsText: {
// //             text: `<<${key}>>`,
// //             matchCase: true,
// //           },
// //           replaceText: String(dppData[key]), // pastikan nilai menjadi string
// //         },
// //       })),
// //     },
// //   });
  
// //   if (!updated_document || !updated_document?.data)
// //     return {
// //       ok: false,
// //       message: "njir ada error mama di updated_document",
// //     };

// //   // return
// //   return {
// //     ok: true,
// //     message: "mantap bang",
// //     process_response: [cloned_document, drive_created, updated_document],
// //   };
// // });

// const templateDocumentIds = [
//   process.env.DOC_TEMPLATE_ID_1, // Template 1
//   process.env.DOC_TEMPLATE_ID_2, // Template 2
//   process.env.DOC_TEMPLATE_ID_3, // Template 3
//   process.env.DOC_TEMPLATE_ID_4, // Template 4
// ];

// const generatedDocuments = []; // Menyimpan hasil proses

// for (let i = 0; i < templateDocumentIds.length; i++) {
//   // Clone dokumen
//   const cloned_document = await drive.files.copy({
//     fileId: templateDocumentIds[i],
//     requestBody: {
//       name: `Hasil Generate ${i + 1}`, // Nama unik untuk setiap dokumen
//     },
//   });

//   // Beri izin ke user
//   const drive_created = await drive.permissions.create({
//     fileId: cloned_document.data.id,
//     requestBody: {
//       type: "user",
//       role: "writer",
//       emailAddress: process.env.TARGET_EMAIL,
//     },
//     fields: "id",
//   });

//   // Update isi dokumen berdasarkan dppData
//   const updated_document = await docs.documents.batchUpdate({
//     documentId: cloned_document.data.id,
//     requestBody: {
//       requests: Object.keys(dppData).map((key) => ({
//         replaceAllText: {
//           containsText: {
//             text: `<<${key}>>`,
//             matchCase: true,
//           },
//           replaceText: String(dppData[key]),
//         },
//       })),
//     },
//   });

//   // Tambahkan hasil ke array
//   generatedDocuments.push({
//     ok: true,
//     message: `Dokumen ${i + 1} berhasil digenerate`,
//     process_response: [cloned_document, drive_created, updated_document],
//   });
// }

// // Return semua hasil proses
// return {
//   ok: true,
//   message: "Proses generate selesai",
//   results: generatedDocuments,
// };
// });