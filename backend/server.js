const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const websocketService = require('./src/services/websocketService');
const triageRoutes = require('./src/routes/triageRoutes');
const queueRoutes = require('./src/routes/queueRoutes');

const app = express();
const server = http.createServer(app);

// Enable CORS
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json());

// Initialize WebSockets
const io = new Server(server, {
  cors: {
    origin: clientUrl,
    methods: ['GET', 'POST', 'PATCH']
  }
});
websocketService.init(io);

// Healthcheck Route
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'MedPulse ER - Smart Hospital Management System',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/v1/triage', triageRoutes);
app.use('/api/v1/queue', queueRoutes);

// Start HTTP + Socket.IO Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🏥 MedPulse ER Backend Server listening on port ${PORT}`);
  console.log(`📡 WebSocket Gateway ready on WS://localhost:${PORT}`);
  console.log(`=======================================================`);
});
