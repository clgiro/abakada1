const mongoose = require('mongoose');

const QuizQuestionSchema = new mongoose.Schema({
    question: String,
    choices: [String],
    answer: String,
});

const QuizQuestion = mongoose.model('QuizQuestion', QuizQuestionSchema);

// Example of inserting a sample question

module.exports = QuizQuestion;
