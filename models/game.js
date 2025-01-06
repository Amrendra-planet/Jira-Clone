
const mongoose = require('mongoose');

// Define the schema
const gameSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true,
        trim: true
    },
    gameId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    difficultyLevel: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'], // Define allowed values
        required: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

 