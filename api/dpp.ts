import express from 'express';
import { Pool } from 'pg';

const app = express();
const router = express.Router();
app.use(express.json()); // Middleware untuk parsing JSON

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pelindo',
    password: 'amelcantik',
    port: 5432,
});

// Get all DPP
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dpp');
        res.status(200).json(result.rows);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error("An unknown error occurred");
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

// Add a DPP
router.post('/', async (req, res) => {
    const { nama, jabatan, alamat, perusahaan, deskripsi } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO dpp (nama, jabatan, alamat, perusahaan, deskripsi) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nama, jabatan, alamat, perusahaan, deskripsi]
        );
        res.status(201).json(result.rows[0]);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error("An unknown error occurred");
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

// Edit a DPP
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nama, jabatan, alamat, perusahaan, deskripsi } = req.body;
    try {
        const result = await pool.query(
            'UPDATE dpp SET nama = $1, jabatan = $2, alamat = $3, perusahaan = $4, deskripsi = $5 WHERE id = $6 RETURNING *',
            [nama, jabatan, alamat, perusahaan, deskripsi, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error("An unknown error occurred");
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

// Delete a DPP
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM dpp WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error("An unknown error occurred");
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

// Mount the router
app.use('/api/dpp', router);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
