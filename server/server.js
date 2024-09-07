const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

let gameState = {
  homeTeam: 'Home',
  awayTeam: 'Away',
  homeScore: 0,
  awayScore: 0,
  homeFouls: 0,
  awayFouls: 0,
  quarter: 1,
  possessionTeam: 'home',
  timeRemaining: 720,
  shotClock: 24,
  isRunning: false,
  homeTimeouts: 7,
  awayTimeouts: 7,
};

const TICK_RATE = 100; // Update every 100ms for smoother countdown
let gameTimer;

function startTimer() {
  if (!gameTimer) {
    gameTimer = setInterval(() => {
      gameState.timeRemaining = Math.max(0, gameState.timeRemaining - 0.1);
      gameState.shotClock = Math.max(0, gameState.shotClock - 0.1);

      if (gameState.timeRemaining <= 0 || gameState.shotClock <= 0) {
        clearInterval(gameTimer);
        gameTimer = null;
        gameState.isRunning = false;
      }

      io.emit('gameUpdated', gameState);
      console.log(`Time remaining: ${gameState.timeRemaining.toFixed(1)}`);
    }, TICK_RATE);
  }
}

function stopTimer() {
  if (gameTimer) {
    clearInterval(gameTimer);
    gameTimer = null;
  }
}

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('gameUpdated', gameState);

  socket.on('updateGame', (updatedState) => {
    gameState = { ...gameState, ...updatedState };
    console.log('Server received game update:', gameState);
    io.emit('gameUpdated', gameState);
  });

  socket.on('startTimer', () => {
    gameState.isRunning = true;
    startTimer();
    io.emit('gameUpdated', gameState);
  });

  socket.on('stopTimer', () => {
    gameState.isRunning = false;
    stopTimer();
    io.emit('gameUpdated', gameState);
  });

  socket.on('resetShotClock', () => {
    gameState.shotClock = 24;
    io.emit('gameUpdated', gameState);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));