import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoints for future enhancements
app.get('/api/birthday-wishes', (req, res) => {
  const wishes = [
    "🎂 Wishing you the happiest birthday ever!",
    "🌟 May all your dreams come true this year!",
    "💖 You deserve all the love and happiness in the world!",
    "🎉 Hope your special day is absolutely amazing!",
    "✨ Another year of being absolutely wonderful!"
  ];
  res.json({ wishes });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎉 Birthday app is running on port ${PORT}!`);
  console.log(`💖 Open http://localhost:${PORT} to see Mansi's special surprise!`);
});
