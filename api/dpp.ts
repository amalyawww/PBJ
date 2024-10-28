// import { google } from 'googleapis'
// import googleapis_docs from '@googleapis/docs'

// export default defineEventHandler(async () => {
//     const formData: {
//         [key: string]: string
//     } = {
//         'Pekerjaan_UP': 'value1',
//         'Perusahaan_P1': 'value2',
//         'Reg_P1': 'value3',
//         'Perusahaan_P2': 'value4',
//         'Alamat_P2': 'value5',
//     }


//     // * SETUP AUTH
//     const auth = new googleapis_docs.auth.GoogleAuth({
//         credentials: {
//             "type": "service_account", 
//                 "project_id": "pbjpelindo",
//                 "private_key_id": "edf00c027cdc2666e659c5152885937e574572b2",
//                 "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD0lv1qr6GBr3is\nXTVby53bmPdbcRDEBgjRY2PSOxrCkrNvRSWK12dRlO/VepidR3425MDqWVJUpsKp\n5j81X/aO+eSHofs5CsqfWtTOhubj48ufyR2RIjrJRZHfGHr3dPbY0OWGrW7paPQ5\nQmCZeHnGgIiqFaX+MVz8Beu4wY5FjxtgsC7Aboz8WJe8DV5epIJSNxiHSDAvzwTW\nzgj7fdowslog0mWYW+Sp7qJlLPKoN6QJYxQAB8gvbmAEOEgaiQLA1RRXdWaLjQ4v\nglO/EkR2VyydjiIXzBJrSfyBcXJqLOy7wid7aKiXTh0Pre/JB5+6STZQNUcF4oBt\n87qesz6vAgMBAAECggEAWN5TjWPrBre+3MGxFX1SCev2VB8svEyE/69hIY2gF3o9\n//vbvCqvu5Cl46b7tIm5bjCHd56kr2U37YtfBAGuEBzzz+Qm537oSCY0lCWn1r15\nysDEIWuSeHbynWDDrQ2ucvDTtK9nUR91PSjE+H4xoNIq1cGv4kAFTPzJvQN2sgar\nT5k/FlHzyAttrYrEvZ0mwb3UM99rFZZSUbhyN2UqN5u8Yoch29yda4MYgBh+iVdb\nkILnLaBQslWeOrqYik34rcpvIpKq6wUNqNTN6baBO05zZes8yM5G0xzveeY2rWLI\nuMfurJTZfBCtoQeWZlF1gVFdXSkXOR0iA6zMqPG44QKBgQD8YhIQz2LFTPAMirjM\nW7hdTNSEzvq6kvyOxttDUTImPwLy046zkYwNmXzG6Kyb6vwJMaZtSdTytnUT/nWH\nHtEYwmqweQNo+2SZv0akkNlbd37iFZfAsGONXrSBjWzeqMwvD2hnsq18nkVPt+kP\nQn8cHOKiAuHdm4PNBjJ95Q5MCwKBgQD4GFPoMRwvTV5rXBIw/cjgs0j4EmYnl+eT\nsPeA0XqEM6yxwnRJBdbV/N9jIM6etRW1gZ4JOiOK60CXO2CVq0ZaR1DsDN6k9Sxy\nZaC2jNNY3waTrRbRr4kIzAnG6PKjdLraiIWIWNdRHjWM8r2dl29m5tHjJLRAaNFm\njJ8hvkNabQKBgQDl74N+BTN7hcj95DTRGo8xkZndFaWg7eFjQxDol8UUyzuod83/\nE4+BpGDl532636+XwMBbuXRlXI32FVKGNDFUWWxSMy5EKyVQXc/ChqVAi/HxkLKd\nPxaz6aCSl4KkqSy9g1Afic49RwTmyCtxV6fuuPJRoEafW9wMoqTFxjXsWQKBgQDw\nv0rNCrr6++0f6VyNxffkdJXehJw016eVHilPC/gDydFPPg9xvQTY6mYr324hfD/w\nvjMJaS2MZPVsy+XR1z6R5JqWNXboRDI5YH0wKD//AY10SIbYO6qSqsziBLNQAro/\nzjMmOG/Y+6OjfvqZrpYgGOSbssZnqk9pYBQbvnHFkQKBgQCTHSZH4VmMnY01fpbC\nFj7u/MjymyIc46mQdQMI1VMjSXG3tndHuRzekRnpjD37sdUjtgLwVP3bEFXEqzwI\ninqQypHEO31VtdyLj/qcurpWzahtfMAAV1V8pzjNqE53hGKQWByNFDMay7pxlRXG\nxKkneSh38efTyrR5qzJahmD1iA==\n-----END PRIVATE KEY-----\n",
//                 "client_email": "testpjb@pbjpelindo.iam.gserviceaccount.com",
//                 "client_id": "101754866875342377618",
//                 "universe_domain": "googleapis.com",



//         scopes: [
//             'https://www.googleapis.com/auth/documents',
//             'https://www.googleapis.com/auth/drive'
//         ]
//     })
//     const authClient = await auth.getClient();
//     if (!authClient) return {
//         ok: false,
//         message: 'njir ada error mama di authClient'
//     }


//     // * SETUP CLIENT API
//     // untuk terhubung memudahkan terhubung ke google apis
//     // @ts-ignore
//     const docs = google.docs({ version: 'v1', auth: authClient });
//     // @ts-ignore
//     const drive = google.drive({ version: 'v3', auth: authClient });


//     // * CLONE DOCUMENT FROM TEMPLATE DOCUMENT
//     const templateDocumentId = 17J-B-dMWowZ3y-eT3MDME5izrer0VeKkjEcUZjBQXaU
//     const cloned_document = await drive.files.copy({
//         fileId: templateDocumentId,
//         requestBody: {
//             name: 'Undangan - Cloned Document from Template',
//         },
//     })
//     if (!cloned_document || !cloned_document?.data?.id) return {
//         ok: false,
//         message: 'njir ada error mama di cloned_document'
//     }


//     // * GIVE PERMISSION TO USER
//     const drive_created = await drive.permissions.create({
//         fileId: cloned_document.data.id,
//         requestBody: {
//             type: 'user',
//             role: 'writer',
//             emailAddress: 'viandwicyber@gmail.com',
//         },
//         fields: 'id',
//     });
//     if (!drive_created || !drive_created?.data?.id) return {
//         ok: false,
//         message: 'njir ada error mama di drive_created'
//     }


//     // * REPLACE TEXT IN DOCUMENT WITH FORM DATA VARIABLE KEY
//     // pattern: <<key>>
//     const updated_document = await docs.documents.batchUpdate({
//         documentId: cloned_document.data.id,
//         requestBody: {
//             requests: Object.keys(formData).map(key => ({
//                 replaceAllText: {
//                     containsText: {
//                         text: <<${key}>>,
//                         matchCase: true,
//                     },
//                     replaceText: formData[key],
//                 },
//             }))
//         },
//     });
//     if (!updated_document || !updated_document?.data) return {
//         ok: false,
//         message: 'njir ada error mama di updated_document'
//     }


//     // return
//     return {
//         ok: true,
//         message: 'mantap bang',
//         process_response: [
//             cloned_document,
//             drive_created,
//             updated_document,
//         ]
//     }
// })