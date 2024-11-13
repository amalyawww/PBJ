import { google } from 'googleapis'
import googleapis_docs from '@googleapis/docs'
import { SuratFormInputSchema } from '@/schemas/surat'
import { gmail } from 'googleapis/build/src/apis/gmail';
import path from 'path';
import fs from 'fs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const data = SuratFormInputSchema.parse(body)

  // variable kusus
  const formData: any = {
    Nomor_SP3: data.Nomor_SP3 || " ",
    Jenis_Tender_UP: data.Jenis_Tender_UP || " ",
    Pekerjaan_UP: data.Pekerjaan_UP || " ",
    Tanggal_Email: data.Tanggal_Email || " ",
    Jenis_Tender: data.Jenis_Tender || " ",
    Pekerjaan: data.Pekerjaan || " ",
    Perusahaan_P2: data.Perusahaan_P2 || " ",
    Alamat_P2: data.Alamat_P2 || " ",
    NPWP_P2: data.NPWP_P2 || " ",
    Biaya_Pekerjaan: data.Biaya_Pekerjaan || 0,
    Terbilang_Biaya_Pekerjaan: data.Terbilang_Biaya_Pekerjaan || " ",
    Jangka_Waktu_Pelaksanaan: data.Jangka_Waktu_Pelaksanaan || 0,
    Terbilang_Jangka_Waktu_Pelaksanaan: data.Terbilang_Jangka_Waktu_Pelaksanaan || " ",
    Jangka_Waktu_Pemeliharaan: data.Jangka_Waktu_Pemeliharaan || 0,
    Terbilang_Jangka_Waktu_Pemeliharaan: data.Terbilang_Jangka_Waktu_Pemeliharaan || " ",
    TKDN: data.TKDN || 0,
    Terbilang_TKDN: data.Terbilang_TKDN || " ",
    Tanggal_Penetapan: data.Tanggal_Penetapan || " ",
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
  const templateDocumentId = process.env.DOC_TEMPLATE_ID;
  const cloned_document = await drive.files.copy({
    fileId: templateDocumentId,
    requestBody: {
      name: "Undangan - Cloned Document from Template",
    },
  });
  if (!cloned_document || !cloned_document?.data?.id)
    return {
      ok: false,
      message: "njir ada error mama di cloned_document",
    };

  // * GIVE PERMISSION TO USER
  const drive_created = await drive.permissions.create({
    fileId: cloned_document.data.id,
    requestBody: {
      type: "user",
      role: "writer",
      // emailAddress: process.env.TARGET_EMAIL,
      emailAddress: process.env.TARGET_EMAIL,
    },
    fields: "id",
  });
  if (!drive_created || !drive_created?.data?.id)
    return {
      ok: false,
      message: "njir ada error mama di drive_created",
    };

  // * REPLACE TEXT IN DOCUMENT WITH FORM DATA VARIABLE KEY
  // pattern: <<key>>
  const updated_document = await docs.documents.batchUpdate({
    documentId: cloned_document.data.id,
    requestBody: {
      requests: Object.keys(formData).map((key) => ({
        replaceAllText: {
          containsText: {
            text: `<<${key}>>`,
            matchCase: true,
          },
          replaceText: formData[key],
        },
      })),
    },
  });
  if (!updated_document || !updated_document?.data)
    return {
      ok: false,
      message: "njir ada error mama di updated_document",
    };

  // return
  return {
    ok: true,
    message: "mantap bang",
    process_response: [cloned_document, drive_created, updated_document],
  };
});