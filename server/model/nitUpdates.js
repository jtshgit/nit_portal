const mongoose = require('mongoose');
require('dotenv').config();
const nitUpdates = new mongoose.Schema({
    name: String, 
    type: String, 
    url: String,
    sem: String,
    date: String,
    createdAt: {
        type: Date, default: Date.now
    },
    set: String,
    setup: {
        type: Number,
        default: 0
    },
    work:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('nitupdates', nitUpdates);
