import { google } from 'googleapis';
import googleapis_docs from '@googleapis/docs';
import { defineEventHandler, readBody } from 'h3'; // Import readBody to access request body

// export default defineEventHandler(async (event) => {
//     const formData = await readBody(event); // Read the incoming JSON data from the request body

//     if (!formData || typeof formData !== 'object') {
//         return {
//             ok: false,
//             message: 'Invalid form data received.',
//         };
//     }

export default defineEventHandler(async () => {
    const formData: {
        [key: string]: string
    } = {
        'Pekerjaan_UP': 'Tentang perkembangan proyek pembangunan Pelabuhan Patimban',
        'Perusahaan_P1': 'PT. Pelindo II',
        'Reg_P1': 'IIX: 112432423235',
        'Perusahaan_P2': 'PT. Pelindo III',
        'Alamat_P2': 'Jl. Pelabuhan No. 1, Jakarta',
    }

    // * SETUP AUTH
    const auth = new googleapis_docs.auth.GoogleAuth({
        credentials: {
            "type": "service_account",
            "project_id": "test-uesfh-213",
            "private_key_id": "2983fjeufsjf8723fsf",
            "private_key": "-----BEGIN PRIVATE KEY-----\sjhfusaknsduiv329482u3r==\n-----END PRIVATE KEY-----\n",
            "client_email": "gdocsamel@test-gwafjsadfs15.iam.gserviceaccount.com",
            "client_id": "aefajisdfu8ejnf",
            "universe_domain": "googleapis.com"
        },
        scopes: [
            'https://www.googleapis.com/auth/documents',
            'https://www.googleapis.com/auth/drive'
        ]
    });

    const authClient = await auth.getClient();
    if (!authClient) return {
        ok: false,
        message: 'Error in authClient'
    }

    // * SETUP CLIENT API
    const docs = google.docs({ version: 'v1', auth: authClient });
    const drive = google.drive({ version: 'v3', auth: authClient });

    // * CLONE DOCUMENT FROM TEMPLATE DOCUMENT
    const templateDocumentId = '17J-B-dMWowZ3y-eT3MDME5izrer0VeKkjEcUZjBQXaU';
    const cloned_document = await drive.files.copy({
        fileId: templateDocumentId,
        requestBody: {
            name: 'Undangan - Cloned Document from Template',
        },
    });
    if (!cloned_document || !cloned_document?.data?.id) return {
        ok: false,
        message: 'Error in cloned_document'
    }

    // * GIVE PERMISSION TO USER
    const drive_created = await drive.permissions.create({
        fileId: cloned_document.data.id,
        requestBody: {
            type: 'user',
            role: 'writer',
            emailAddress: 'viandwicyber@gmail.com',
        },
        fields: 'id',
    });
    if (!drive_created || !drive_created?.data?.id) return {
        ok: false,
        message: 'Error in drive_created'
    }

    // * REPLACE TEXT IN DOCUMENT WITH FORM DATA VARIABLE KEY
    const updated_document = await docs.documents.batchUpdate({
        documentId: cloned_document.data.id,
        requestBody: {
            requests: Object.keys(formData).map(key => ({
                replaceAllText: {
                    containsText: {
                        text: `<<${key}>>`,
                        matchCase: true,
                    },
                    replaceText: formData[key],
                },
            }))
        },
    });
    if (!updated_document || !updated_document?.data) return {
        ok: false,
        message: 'Error in updated_document'
    }

    // return
    return {
        ok: true,
        message: 'Document generated successfully',
        process_response: [
            cloned_document,
            drive_created,
            updated_document,
        ]
    }
});
