const mongoose = require('mongoose');

const historyEntrySchema = new mongoose.Schema({
    gameName: String,
    percentage: Number,
    timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    scores: {
        wordpuzzle: { type: Number, default: 0 },
        memorymatch: { type: Number, default: 0 },
        riddle: { type: Number, default: 0 },
        sentence: { type: Number, default: 0 },
        catchtheletter: { type: Number, default: 0 },
        quiz: { type: Number, default: 0 },
    },
    history: {
        wordpuzzle: [historyEntrySchema],
        memorymatch: [historyEntrySchema],
        riddle: [historyEntrySchema],
        sentence: [historyEntrySchema],
        catchtheletter: [historyEntrySchema],
        quiz: [historyEntrySchema],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
