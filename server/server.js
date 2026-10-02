import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();
mongoose.set('bufferCommands', false);

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

const removeFile = file => { if (file) fs.unlink(file.path, () => {}); };

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/quotes', upload.single('artwork'), async (req, res) => {
  const { name, company, phone, service, description } = req.body;

  if (!name || !phone || !service || !description) {
    removeFile(req.file);
    return res.status(400).json({ message: 'Please fill in name, phone, service and description.' });
  }

  if (mongoose.connection.readyState !== 1) {
    removeFile(req.file);
    return res.status(503).json({ message: 'Our quote form is temporarily unavailable. Please call or WhatsApp us.' });
  }

  try {
    await Quote.create({ name, company, phone, service, description, file: req.file?.filename });
    res.status(201).json({ message: 'Quote request received.' });
  } catch (err) {
    console.error(err);
    removeFile(req.file);
    res.status(500).json({ message: 'Something went wrong on our side. Please call or WhatsApp us.' });
  }
});

// Unknown API addresses
app.use('/api', (_req, res) => res.status(404).json({ message: 'Not found.' }));

// Serve the built React site
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));

// Upload errors, such as a file that is too large
app.use((err, _req, res, _next) => {
  const message = err.code === 'LIMIT_FILE_SIZE' ? 'That file is too large. Please keep it under 15 MB.' : err.message;
  res.status(400).json({ message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running on port ' + port));

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(e => console.error('MongoDB connection failed:', e.message));
} else {
  console.log('MONGO_URI not set. Running without a database.');
}