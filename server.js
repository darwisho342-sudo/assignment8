import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve paths reliably regardless of current working directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

// Immutable data constants
const PROGRAMME_INFO = Object.freeze({
  name: 'BSc in Applied Web Systems',
  description: 'A practical programme focused on HTTP fundamentals, server-side JavaScript, and modern web standards.'
});

const COURSES = Object.freeze([
  Object.freeze({ id: 'WEB101', title: 'Foundations of HTTP & HTML', credits: 6 }),
  Object.freeze({ id: 'JS202', title: 'Asynchronous JavaScript & ES Modules', credits: 6 }),
  Object.freeze({ id: 'SRV303', title: 'Backend Architecture with Node.js', credits: 9 })
]);

// Application state
let requestsServed = 0;

// 1. Request Logger Middleware
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}

// 2. Request Counter Middleware
function requestCounter(req, res, next) {
  requestsServed += 1;
  next();
}

// Register middlewares BEFORE routes and static files
app.use(requestLogger);
app.use(requestCounter);

// Serve static files from /public (automatically serves index.html on GET /)
app.use(express.static(publicDir));

// --- Routes ---

app.get('/hello', (req, res) => {
  res.type('text/plain').send("Hello from Ada's server");
});

app.get('/robots.txt', (req, res) => {
  const robotsContent = [
    'User-agent: *',
    'Disallow: /api/admin',
    'Allow: /'
  ].join('\n');

  res.type('text/plain').send(robotsContent);
});

app.get('/old-page', (req, res) => {
  res.redirect(302, '/hello');
});

app.get('/api/courses', (req, res) => {
  res.json(COURSES);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime())
  });
});

app.get('/api/headers', (req, res) => {
  res.json({
    userAgent: req.get('User-Agent') || null,
    accept: req.get('Accept') || null
  });
});

app.post('/api/subscribe', (req, res) => {
  res.status(201).json({ subscribed: true });
});

app.get('/api/admin', (req, res) => {
  res.status(403).json({ error: 'Forbidden' });
});

app.get('/api/stats', (req, res) => {
  res.json({ requestsServed });
});

// --- 404 Fallback (Must be registered LAST, Express 5 compatible) ---
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(404).type('text/plain').send('404 - Page not found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});