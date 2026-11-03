import rateLimit from 'express-rate-limit';

export default rateLimit({
  windowMs: 60_000,
  limit: Number(process.env.RATE_LIMIT_PER_MIN) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => res.status(429).json({ success: false, error: 'Too many requests, please wait a moment.' }),
});
