const mongoose = require('mongoose');
require('dotenv').config();
const userSchema = new mongoose.Schema({
    roll_numbers: { type: String, required: true },
    result_type : { type: String, required: true },
    course : { type: String, required: true },
    sem : { type: String, required: true },
    branch : { type: String, required: true },
    url : { type: String, required: true },
    name : { type: String, required: true },
    attachment : { type: Number, required: true }
});

module.exports = mongoose.model('nitresult', userSchema);