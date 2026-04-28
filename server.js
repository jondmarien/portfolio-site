const express = require('express');
const path = require('path');

const app = express();

// JSON body parsing
app.use(express.json());

// Static files from the Vite production build.
app.use(express.static(path.join(__dirname, 'dist')));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Fallback: serve index.html for SPA-style routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
