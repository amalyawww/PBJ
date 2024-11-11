// import { google } from 'googleapis'; // Import googleapis package
// import path from 'path';

// // Define your formData object
// const formData: {
//     [key: string]: string;
// } = {
//     'Pekerjaan_UP': 'Tentang perkembangan proyek pembangunan Pelabuhan Patimban',
//     'Perusahaan_P1': 'PT. Pelindo II',
//     'Reg_P1': 'IIX: 112432423235',
//     'Perusahaan_P2': 'PT. Pelindo III',
//     'Alamat_P2': 'Jl. Pelabuhan No. 1, Jakarta',
// };

// // Setup Google Auth
// const keyFilePath = path.resolve(process.cwd(), 'credentials.json');
// const auth = new google.auth.GoogleAuth({
//   keyFile: keyFilePath,
//   scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents'],
// });

// // Main function to handle the Google Docs process
// async function generateDocument() {
//     try {
//         const authClient = await auth.getClient();
//         if (!authClient) {
//             return { ok: false, message: 'Error in authClient' };
//         }

//         // Setup Google Docs and Drive clients
//         const docs = google.docs({ version: 'v1', auth: authClient });
//         const drive = google.drive({ version: 'v3', auth: authClient });

//         // Clone the document from the template
//         const templateDocumentId = '1jt00HKYv5yTkvrr8KArvHr_hqQTO3EAmo2kH7QhFgOc';
//         const clonedDocument = await drive.files.copy({
//             fileId: templateDocumentId,
//             requestBody: {
//                 name: 'Undangan - Cloned Document from Template',
//             },
//         });

//         if (!clonedDocument || !clonedDocument.data?.id) {
//             return { ok: false, message: 'Error in cloned_document' };
//         }

//         // Give permission to a user
//         const driveCreated = await drive.permissions.create({
//             fileId: clonedDocument.data.id,
//             requestBody: {
//                 type: 'user',
//                 role: 'writer',
//                 emailAddress: 'testpjb@pbjpelindo.iam.gserviceaccount.com',
//             },
//             fields: 'id',
//         });

//         if (!driveCreated || !driveCreated.data?.id) {
//             return { ok: false, message: 'Error in drive_created' };
//         }

//         // Replace text in the cloned document with formData values
//         const updatedDocument = await docs.documents.batchUpdate({
//             documentId: clonedDocument.data.id,
//             requestBody: {
//                 requests: Object.keys(formData).map((key) => ({
//                     replaceAllText: {
//                         containsText: {
//                             text: `<<${key}>>`,
//                             matchCase: true,
//                         },
//                         replaceText: formData[key],
//                     },
//                 })),
//             },
//         });

//         if (!updatedDocument || !updatedDocument.data) {
//             return { ok: false, message: 'Error in updated_document' };
//         }

//         return {
//             ok: true,
//             message: 'Document generated successfully',
//             process_response: [clonedDocument, driveCreated, updatedDocument],
//         };
//     } catch (error: any) {
//         // Enhanced error handling with full stack trace and message
//         console.error('Detailed Error:', error); // Log the full error
//         return {
//             ok: false,
//             message: 'Unexpected error occurred',
//             error: {
//                 message: error.message,
//                 stack: error.stack, // Full stack trace
//                 name: error.name, // Error name
//             },
//         };
//     }
// }

// // Call the function
// generateDocument().then((response) => {
//     console.log(response);
// });
