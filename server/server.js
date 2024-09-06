const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

const Game = require('./models/Game');

mongoose.connect(process.env.MONGODB_URI);

io.on('connection', (socket) => {
  console.log('New client connected');

  // Function to initialize or get the current game
  const initializeGame = async () => {
    let game = await Game.findOne();
    if (!game) {
      game = new Game();
      await game.save();
    }
    return game;
  };

  socket.on('updateGame', async (gameData, callback) => {
    try {
      console.log('Received game update:', gameData);
      const updatedGame = await Game.findOneAndUpdate({}, gameData, { new: true, upsert: true, setDefaultsOnInsert: true });
      console.log('Game updated in database:', updatedGame);
      io.emit('gameUpdated', updatedGame);
      callback({ success: true });
    } catch (error) {
      console.error('Error updating game:', error);
      callback({ error: error.message });
    }
  });

  // Send initial game state when a client connects
  initializeGame().then((game) => {
    console.log('Sending initial game state:', game);
    socket.emit('initialGameState', game);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
