const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);

// JSON body parsing
app.use(express.json());

// Static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// WebSocket server on /ws/* (Caddy gives this a 1-hour timeout)
const wss = new WebSocketServer({ noServer: true });
server.on('upgrade', (req, socket, head) => {
  if (req.url && req.url.startsWith('/ws/')) {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  } else {
    socket.destroy();
  }
});

wss.on('connection', (ws, req) => {
  ws.on('message', (data) => {
    ws.send(data); // echo — replace with your app logic
  });
});

// Fallback: serve index.html for SPA-style routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
