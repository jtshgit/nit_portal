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
        type: String,
        default: 0
    },
    work2:{
        type: String,
        default: 0
    },
    branch:{
        type: String,
        default: 0
    }
});

module.exports = mongoose.model('nitupdates', nitUpdates);