const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { Server } = require('socket.io');
const http = require('http');

dotenv.config();

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'http://localhost:5173', // Update this to match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);

// User-to-socket mapping
const users = {};

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Update this to match your frontend URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user login and map username to socket ID
  socket.on('userLogin', (username) => {
    users[username] = socket.id; // Map username to socket ID
    console.log(`${username} connected with socket ID ${socket.id}`);
  });

  // Handle private messages
  socket.on('privateMessage', ({ sender, receiver, message }) => {
    const receiverSocketId = users[receiver]; // Get receiver's socket ID
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receivePrivateMessage', { sender, message });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    // Remove user from the mapping when they disconnect
    const username = Object.keys(users).find((key) => users[key] === socket.id);
    if (username) {
      delete users[username];
    }
    console.log('User disconnected:', socket.id);
  });
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
