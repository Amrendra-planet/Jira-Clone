const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    participants: {
        type: String,
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
        likes: {
            type: Number,
            default: 0,
        },
        comments: [{
            commenter: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        }],
        image: {
            type: String,
            required: false,
        },
    }],
});

const dashboard = mongoose.model("dashboard", dashboardSchema);

module.exports = dashboard;
