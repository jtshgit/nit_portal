const mongoose = require('mongoose');
require('dotenv').config();
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    role: { type: Number, default: 0 }// Default is current date and time
});

module.exports = mongoose.model('admin', userSchema);
