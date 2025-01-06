const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Ensure email is stored in lowercase for consistency
    },
    number: {
        type: Number,
    },
    city: {
        type: String,
    },
    companyName: {
        type: String,
    },
    type:{
type : String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'user' }
);

// Add a unique index on email for optimized searches
UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);
