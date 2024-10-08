const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  homeTeam: { type: String, default: 'Home' },
  awayTeam: { type: String, default: 'Away' },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  homeFouls: { type: Number, default: 0 },
  awayFouls: { type: Number, default: 0 },
  quarter: { type: Number, default: 1 },
  overtime: { type: Number, default: 0 },
  timeRemaining: { type: Number, default: 720 },
  possessionTime: { type: Number, default: 24 },
  possessionTeam: { type: String, default: 'home' },
  homeTimeouts: { type: Number, default: 7 }, // NBA teams start with 7 timeouts per game
  awayTimeouts: { type: Number, default: 7 },
});

module.exports = mongoose.model('Game', GameSchema);
