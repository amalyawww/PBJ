import { google } from 'googleapis'
import googleapis_docs from '@googleapis/docs'
import { SuratFormInputSchema } from '@/schemas/surat'
import { gmail } from 'googleapis/build/src/apis/gmail';
import path from 'path';
import fs from 'fs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const data = SuratFormInputSchema.parse(body)
  
  const formData: Record<string, string | number | null> = {
    Jenis_Tender: data.Jenis_Tender || "",
    Jenis_Pengadaan: data.Jenis_Pengadaan || "",
    Jenis_Kontrak: data.Jenis_Kontrak || "",
    Pekerjaan: data.Pekerjaan || "",
    Pekerjaan_UP: data.Pekerjaan_UP || "",
    Perdir_PBJ: data.Perdir_PBJ || "",
    Tempat_Tanda_Tangan: data.Tempat_Tanda_Tangan || "",
    Tahun: data.Tahun || "",
    Nama_P1: data.Nama_P1 || "",
    Jabatan_P1: data.Jabatan_P1 || "",
    Perusahaan_P1: data.Perusahaan_P1 || "",
    Reg_P1: data.Reg_P1 || "",
    Alamat_P1: data.Alamat_P1 || "",
    SK_P1: data.SK_P1 || "",
    No_Telp_P1: data.No_Telp_P1 || "",
    Website_P1: data.Website_P1 || "",
    Faksimili_P1: data.Faksimili_P1 || "",
    Email_P1: data.Email_P1 || "",
    Jabatan_Pengawas_P1: data.Jabatan_Pengawas_P1 || "",
    Sub_Reg_Pengawas_P1: data.Sub_Reg_Pengawas_P1 || "",
    Masa_Pemeliharaan: data.Masa_Pemeliharaan ?? 0,
    Jaminan_Pelaksanaan: data.Jaminan_Pelaksanaan ?? 0,
    Tempat_Pelaksanaan_Pekerjaan: data.Tempat_Pelaksanaan_Pekerjaan || "",
    Pengadilan: data.Pengadilan || "",
    Tempat_Serah_Terima: data.Tempat_Serah_Terima || "",
    Persentase_Pembayaran: data.Persentase_Pembayaran ?? 0,
    Nama_P2: data.Nama_P2 || "",
    Jabatan_P2: data.Jabatan_P2 || "",
    Bentuk_Perusahaan_P2: data.Bentuk_Perusahaan_P2 || "",
    Perusahaan_P2: data.Perusahaan_P2 || "",
    Alamat_P2: data.Alamat_P2 || "",
    Telepon_P2: data.Telepon_P2 || "",
    Website_P2: data.Website_P2 || "",
    Faksimili_P2: data.Faksimili_P2 || "",
    Email_P2: data.Email_P2 || "",
    No_Akta_1: data.No_Akta_1 || "",
    Tanggal_Akta_1: data.Tanggal_Akta_1 || "",
    Notaris_Akta_1: data.Notaris_Akta_1 || "",
    Kota_Akta_1: data.Kota_Akta_1 || "",
    No_Pengesahan_Akta_1: data.No_Pengesahan_Akta_1 || "",
    Tanggal_Pengesahan_Akta_1: data.Tanggal_Pengesahan_Akta_1 || "",
    No_Akta_2: data.No_Akta_2 || "",
    Perihal_Akta_2: data.Perihal_Akta_2 || "",
    Tanggal_Akta_2: data.Tanggal_Akta_2 || "",
    Notaris_Akta_2: data.Notaris_Akta_2 || "",
    Kota_Akta_2: data.Kota_Akta_2 || "",
    Perihal_Pengesahan_Akta_2: data.Perihal_Pengesahan_Akta_2 || "",
    No_Pengesahan_Akta_2: data.No_Pengesahan_Akta_2 || "",
    Tanggal_Pengesahan_Akta_2: data.Tanggal_Pengesahan_Akta_2 || "",
    Nomor_Rekening_P2: data.Nomor_Rekening_P2 || "",
    Atas_Nama_Norek: data.Atas_Nama_Norek || "",
    Nama_Bank: data.Nama_Bank || "",
    Nomor_SP3: data.Nomor_SP3 || "",
    Tanggal_SP3: data.Tanggal_SP3 || "",
    Biaya_Pekerjaan: data.Biaya_Pekerjaan ?? 0,
    Jangka_Waktu_Pekerjaan: data.Jangka_Waktu_Pekerjaan ?? 0,
    Nilai_TKDN: data.Nilai_TKDN ?? 0,
    Nomor_Nodin: data.Nomor_Nodin || "",
    Tanggal_Nodin: data.Tanggal_Nodin || "",
    Tanggal_Email: data.Tanggal_Email || "",
    No_BA_Rapat: data.No_BA_Rapat || "",
    Tanggal_BA_Rapat: data.Tanggal_BA_Rapat || "",
    No_Supen: data.No_Supen || "",
    Tanggal_Supen: data.Tanggal_Supen || "",
    Nomor_BA_Pembukaan_Penawaran: data.Nomor_BA_Pembukaan_Penawaran || "",
    Tanggal_BA_Pembukaan_Penawaran: data.Tanggal_BA_Pembukaan_Penawaran || "",
    Nomor_BA_Eval: data.Nomor_BA_Eval || "",
    Tanggal_BA_Eval: data.Tanggal_BA_Eval || "",
    Nomor_BA_Nego: data.Nomor_BA_Nego || "",
    Tanggal_BA_Nego: data.Tanggal_BA_Nego || "",
    Nomor_Pengumuman: data.Nomor_Pengumuman || "",
    Tanggal_Pengumuman: data.Tanggal_Pengumuman || "",
    terbilang_masa_pemeliharaan: data.terbilang_masa_pemeliharaan || "",
    terbilang_jpelaksanaan: data.terbilang_jpelaksanaan || "",
    terbilang_biaya_pekerjaan: data.terbilang_biaya_pekerjaan || "",
    terbilang_jwaktu_pekerjaan: data.terbilang_jwaktu_pekerjaan || "",
    terbilang_nilai_tkdn: data.terbilang_nilai_tkdn || "",
    Nomor_Jampel: data.Nomor_Jampel || "",
    Tanggal_Jampel: data.Tanggal_Jampel || "",
    berlaku_jampel: data.berlaku_jampel || "",
    berakhir_jampel: data.berakhir_jampel || "",
    Bank_BUMN: data.Bank_BUMN || "",
    Nomor_BA_Klarif: data.Nomor_BA_Klarif || "",
    Tanggal_BA_Klarif: data.Tanggal_BA_Klarif || "",
  };
  
  
  
  // * SETUP AUTH
  // const creds = process.env.CREDENTIALS_JSON
  const credsPath = path.resolve(process.cwd(), 'credentials.json');
  const creds = JSON.parse(await fs.promises.readFile(credsPath, 'utf-8'));
  if (!creds) return {
    ok: false,
    message: "njir ada error mama di creds",
  }
  const auth = new googleapis_docs.auth.GoogleAuth({
    credentials: creds,
    scopes: ["https://www.googleapis.com/auth/documents", "https://www.googleapis.com/auth/drive"],
  });
  const authClient = await auth.getClient();
  if (!authClient)
    return {
      ok: false,
      message: "njir ada error mama di authClient",
    };
  

  // * SETUP CLIENT API
  // untuk terhubung memudahkan terhubung ke google apis
  // @ts-ignore
  const docs = google.docs({ version: "v1", auth: authClient });
  // @ts-ignore
  const drive = google.drive({ version: "v3", auth: authClient });

  // * CLONE DOCUMENT FROM TEMPLATE DOCUMENT
  // const templateDocumentId = process.env.DOC_TEMPLATE_ID;
//   const templateDocumentId = process.env.DOC_TEMPLATE_ID;
//   const cloned_document = await drive.files.copy({
//     fileId: templateDocumentId,
//     requestBody: {
//       name: "Hasil Generate",
//     },
//   });
//   if (!cloned_document || !cloned_document?.data?.id)
//     return {
//       ok: false,
//       message: "njir ada error mama di cloned_document",
//     };

//   // * GIVE PERMISSION TO USER
//   const drive_created = await drive.permissions.create({
//     fileId: cloned_document.data.id,
//     requestBody: {
//       type: "user",
//       role: "writer",
//       // emailAddress: process.env.TARGET_EMAIL,
//       emailAddress: process.env.TARGET_EMAIL,
//     },
//     fields: "id",
//   });
//   if (!drive_created || !drive_created?.data?.id)
//     return {
//       ok: false,
//       message: "njir ada error mama di drive_created",
//     };


//   const updated_document = await docs.documents.batchUpdate({
//     documentId: cloned_document.data.id,
//     requestBody: {
//       requests: Object.keys(formData).map((key) => ({
//         replaceAllText: {
//           containsText: {
//             text: `<<${key}>>`,
//             matchCase: true,
//           },
//           replaceText: String(formData[key]), // pastikan nilai menjadi string
//         },
//       })),
//     },
//   });
  
//   if (!updated_document || !updated_document?.data)
//     return {
//       ok: false,
//       message: "njir ada error mama di updated_document",
//     };

//   // return
//   return {
//     ok: true,
//     message: "mantap bang",
//     process_response: [cloned_document, drive_created, updated_document],
//   };
// });

const templateDocumentIdSP3 = [
  process.env.DOC_TEMPLATE_ID_SP3_1, // Template 1
  process.env.DOC_TEMPLATE_ID_SP3_2, // Template 2
  process.env.DOC_TEMPLATE_ID_SP3_3, // Template 3
  process.env.DOC_TEMPLATE_ID_SP3_4, // Template 4
];

const generatedDocuments = []; // Menyimpan hasil proses

for (let i = 0; i < templateDocumentIdSP3.length; i++) {
  // Clone dokumen
  const cloned_document = await drive.files.copy({
    fileId: templateDocumentIdSP3[i],
    requestBody: {
      name: `Hasil Generate ${i + 1}`, // Nama unik untuk setiap dokumen
    },
  });

  // Beri izin ke user
  const drive_created = await drive.permissions.create({
    fileId: cloned_document.data.id,
    requestBody: {
      type: "user",
      role: "writer",
      emailAddress: process.env.TARGET_EMAIL,
    },
    fields: "id",
  });

  // Update isi dokumen berdasarkan formData
  const updated_document = await docs.documents.batchUpdate({
    documentId: cloned_document.data.id,
    requestBody: {
      requests: Object.keys(formData).map((key) => ({
        replaceAllText: {
          containsText: {
            text: `<<${key}>>`,
            matchCase: true,
          },
          replaceText: String(formData[key]),
        },
      })),
    },
  });

  // Tambahkan hasil ke array
  generatedDocuments.push({
    ok: true,
    message: `Dokumen ${i + 1} berhasil digenerate`,
    process_response: [cloned_document, drive_created, updated_document],
  });
}

// Return semua hasil proses
return {
  ok: true,
  message: "Proses generate selesai",
  results: generatedDocuments,
};
});