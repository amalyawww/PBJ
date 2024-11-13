import { z } from 'zod';

export const SuratFormInputSchema = z.object({
  Nomor_SP3: z.string().min(1, 'Nomor SP3 is required'),
  Jenis_Tender_UP: z.string().min(1, 'Jenis Tender UP is required'),
  Pekerjaan_UP: z.string().min(1, 'Pekerjaan UP is required'),
  Tanggal_Email: z.string().min(1, 'Tanggal Email is required'),
  Jenis_Tender: z.string().min(1, 'Jenis Tender is required'),
  Pekerjaan: z.string().min(1, 'Pekerjaan is required'),
  Perusahaan_P2: z.string().min(1, 'Perusahaan P2 is required'),
  Alamat_P2: z.string().min(1, 'Alamat P2 is required'),
  NPWP_P2: z.string().min(1, 'NPWP P2 is required'),
  Biaya_Pekerjaan: z.string().min(0, 'Biaya Pekerjaan must be a positive number'),
  Terbilang_Biaya_Pekerjaan: z.string().min(1, 'Terbilang Biaya Pekerjaan is required'),
  Jangka_Waktu_Pelaksanaan: z.string().min(0, 'Jangka Waktu Pelaksanaan must be a positive number'),
  Terbilang_Jangka_Waktu_Pelaksanaan: z.string().min(1, 'Terbilang Jangka Waktu Pelaksanaan is required'),
  Jangka_Waktu_Pemeliharaan: z.string().min(0, 'Jangka Waktu Pemeliharaan must be a positive number'),
  Terbilang_Jangka_Waktu_Pemeliharaan: z.string().min(1, 'Terbilang Jangka Waktu Pemeliharaan is required'),
  TKDN: z.string().min(0, 'TKDN must be a positive number'),
  Terbilang_TKDN: z.string().min(1, 'Terbilang TKDN is required'),
  Tanggal_Penetapan: z.string().min(1, 'Tanggal Penetapan is required'),
});
