const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Create a new game
router.post('/games', async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get current game state
router.get('/games/current', async (req, res) => {
  try {
    const game = await Game.findOne().sort({ _id: -1 });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update game state
router.put('/games/current', async (req, res) => {
  try {
    const game = await Game.findOneAndUpdate({}, req.body, { new: true, sort: { _id: -1 } });
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;