import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import recipeRoutes from './routes/recipe.js';

const app = express();
const defaultOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const origins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((s) => s.trim())
  : defaultOrigins;

app.set('trust proxy', 1); // correct client IP for rate limiting behind Render/Railway
app.use(cors({ origin: origins }));
app.use(express.json({ limit: '10mb' })); // Support base64 image uploads for Fridge Vision Scan

app.get('/', (_req, res) => res.json({ name: 'SmartChef API', status: 'running', endpoints: ['/api/health', '/api/generate-recipe', '/api/scan-fridge'] }));
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api', recipeRoutes);
app.use('/api', (_req, res) => res.status(404).json({ success: false, error: 'Not found.' }));

// Global error handler: log details server-side, send a safe message to the client.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ success: false, error: 'Invalid JSON body.' });
  if (err.type === 'entity.too.large') return res.status(413).json({ success: false, error: 'Request too large.' });
  console.error(err);
  res.status(err.status || 500).json({ success: false, error: err.status ? err.message : 'Something went wrong on the server.' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`SmartChef API on :${port} (LLM: ${process.env.LLM_PROVIDER || 'mock'}, images: ${process.env.IMAGE_PROVIDER || 'none'})`));
