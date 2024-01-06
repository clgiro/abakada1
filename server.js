const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');
const mongoose = require('mongoose');
const User = require('./Userm'); // Adjust the path accordingly
const path = require('path');
const cors = require('cors');
const http = require('http');



const bcrypt = require('bcrypt');



const app = express();
const server = http.createServer(app);
// WebSocket connection handling



const mongoURI = 'mongodb+srv://clarencegiro24:tcsAtwtsttbmd10@cluster0.k9msrmz.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB using mongoose
// Connect to MongoDB using mongoosec 
mongoose.connect(`${mongoURI}`, {
  
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a new instance of MongoDBStore
const store = MongoDBStore.create({
  mongoUrl: `${mongoURI}`,
  collection: 'sessions',
  autoRemove: 'interval',
  autoRemoveInterval: 10,
  // Add the client option with the MongoDB client instance
  client: db.client,
});

// Catch errors
store.on('error', function (error) {
  console.error('Error in MongoDBStore:', error);
});
app.use(express.json());
app.use(express.static('public'));

app.use(
  session({
    secret: 'tcsAtwtsttbmd10',
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    // Check if the username is already registered
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ isUnique: false });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database with the hashed password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    console.log('User signed up successfully');
    res.json({ isUnique: true });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Your other app configurations and routes...
app.post('/check-username', async (req, res) => {
  const { username } = req.body;

  try {
    // Check if the username is already registered
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ isUnique: false });
    }

    // Username is unique
    res.json({ isUnique: true });
  } catch (error) {
    console.error('Error checking username uniqueness:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check the username against your database
    const user = await User.findOne({ username });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Store user information in the session
      req.session.user = user;
      res.json({ success: true });
    } else {
      console.log('Password mismatch');
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const checkLoggedIn = (req, res, next) => {
  if (req.session.user) {
      // User is logged in, proceed to the next middleware
      next();
  } else {
      // User is not logged in, send an error response
      res.status(401).json({ error: 'Unauthorized' });
  }
};
app.get('/check-login', checkLoggedIn, (req, res) => {
  // User is logged in, provide necessary information (e.g., user data)
  res.json({ loggedIn: true, user: req.session.user });
});

app.get('/logout', (req, res) => {
  // Clear the user session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ success: true });
  });
});
app.post('/save-score', checkLoggedIn, async (req, res) => {
  const { gameName, score } = req.body;

  // Basic validation
  const user = req.session.user;

  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    const scoreField = `scores.${gameName}`;

    if (user.scores[gameName] === undefined || score > user.scores[gameName]) {
      user.scores[gameName] = score;
      await user.save();

      // Update the session with the new user information
      req.session.user = await User.findById(userId);

      console.log(`Score for ${gameName} updated successfully`);
      res.json({ success: true, user: req.session.user });
    } else {
      console.log(`New score for ${gameName} is not higher, keeping the previous score`);
      res.json({ success: false, user: req.session.user });
    }
  } catch (error) {
    console.error(`Error during score updating for ${gameName}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});








app.get('/get-leaderboard', async (req, res) => {
  const { gameName } = req.query;

  try {
    const leaderboardData = await User.find({}, `username scores.${gameName}`).sort({ [`scores.${gameName}`]: -1 }).limit(10);

    res.json({ success: true, leaderboard: leaderboardData });
  } catch (error) {
    console.error(`Error fetching leaderboard data for ${gameName}:`, error);
    res.status(500).json({ success: false, error: `Error fetching leaderboard data for ${gameName}` });
  }
});


// Update lessons completed for a user


// Define a middleware function to check if all lessons are completed




// Apply the middleware to the games route
app.get('/games', checkLoggedIn,  (req, res) => {
  // Render the games page
  res.render('games.ejs'); // Replace 'games' with the actual name of your games HTML file or template
});


// Apply the middleware to the games route






app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Adjust the path accordingly

// ... (other configurations)

// Apply the middleware to the games route


// Example: Update session on game state change

// Add this route before your app.listen() statement

app.get('/dashboard', checkLoggedIn, (req, res) => {
  console.log(req.session); // Log the session object
  const user = req.session.user;
  res.render('dashboard', { user });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})