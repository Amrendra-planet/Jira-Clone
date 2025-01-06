const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    participants: {
        type: [String],
        required: true,
    },
    messages: [{
        sender: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    }],
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
