const mongoose = require('mongoose');

const RiddleSchema = new mongoose.Schema({
    question: String,
    choices: [String],
    answer: String,
});

const Riddle = mongoose.model('Riddle', RiddleSchema);



module.exports = Riddle;
