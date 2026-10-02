import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const Quote = mongoose.model('Quote', new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  company: { type: String, trim: true },
  phone: { type: String, required: true, trim: true },
  service: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  file: String,
  createdAt: { type: Date, default: Date.now }
}));

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/[^\w.\-]/g, '_'))
});
const upload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024 } });

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/quotes', upload.single('artwork'), async (req, res) => {
  try {
    const { name, company, phone, service, description } = req.body;
    if (!name || !phone || !service || !description) {
      return res.status(400).json({ message: 'Please fill in name, phone, service and description.' });
    }
    await Quote.create({ name, company, phone, service, description, file: req.file?.filename });
    res.status(201).json({ message: 'Quote request received.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong on our side. Please call us instead.' });
  }
});
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));

app.use((err, _req, res, _next) => res.status(400).json({ message: err.message }));

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log('API running on port ' + port)))
  .catch(e => { console.error('MongoDB connection failed:', e.message); process.exit(1); });
