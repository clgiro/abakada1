const mongoose = require('mongoose');

// const isValidAbakadaLetter = (value) => {
//   if (value === undefined) {
//     return true; // Allow undefined values
//   }

//   const validLetters = ['A', 'B', 'K', 'D', 'E', 'G', 'H', 'I', 'L', 'M', 'N', 'Ng', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y'];
//   return validLetters.includes(value);
// };


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


  // completedLessons: [
  //   {
  //     type: String,
  //     // unique: true, // Remove this line
  //     sparse: true,
  //     validate: {
  //       validator: isValidAbakadaLetter,
  //       message: '{VALUE} is not a valid abakada letter!',
  //     },
  //   },
  // ],
  
});

// Define a pre-save hook to calculate quiz progress


const User = mongoose.model('User', userSchema);

module.exports = User;
