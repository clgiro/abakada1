const express = require('express');
const session = require('express-session');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
// Create a Set to store registered usernames
const registeredUsernames = new Set();

app.use(express.static('public'));
app.use(session({
  secret: 'your_secret_key', // Replace with a secret key
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.json());

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tcsAtwtsttbmd10', // Replace with your MySQL password
  database: 'abakada_db', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  // Check if the username is already registered
  if (registeredUsernames.has(username)) {
    return res.json({ isUnique: false });
  }

  // Insert user into the database
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (error, results) => {
    if (error) {
      console.error('Error executing SQL:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Add the registered username to the set
    registeredUsernames.add(username);

    console.log('User signed up successfully');
    res.json({ isUnique: true });
  });
});



app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check the username and password against your database
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (error, results) => {
      if (error) {
          console.error('Error executing SQL:', error);
          return res.status(500).json({ error: 'Internal server error' });
      }

      // Check if the user exists
      if (results.length > 0) {
          // Store user information in the session
          req.session.user = results[0];
          res.json({ success: true });
      } else {
          res.status(401).json({ error: 'Invalid credentials' });
      }
  });
})





app.get('/check-login', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// ... (your existing code)

// Endpoint for handling logout requests
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

// ... (your existing code)
const checkLoggedIn = (req, res, next) => {
  if (req.session.user) {
    // User is logged in, proceed to the next middleware
    next();
  } else {
    // User is not logged in, send an error response
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.get('/lessonpage', checkLoggedIn, (req, res) => {
  // Render the lesson page
  res.sendFile(__dirname + '/index.html');
});

// When a user reads an HTML file
app.post('/mark-file-as-read/:file', checkLoggedIn, async (req, res) => {
  const { file } = req.params;
  const userId = req.session.user.id;

  try {
    // Check if the file is already marked as read
    const [existingRecord] = await db.promise().query(
      'SELECT id FROM user_reading_progress WHERE user_id = ? AND file_name = ?',
      [userId, file]
    );

    if (!existingRecord.length) {
      // If the file is not marked as read, insert a record
      await db.promise().query(
        'INSERT INTO user_reading_progress (user_id, file_name) VALUES (?, ?)',
        [userId, file]
      );
      res.json({ success: true });
    } else {
      // If the file is already marked as read, return success
      res.json({ success: true });
    }
  } catch (error) {
    console.error('Error marking file as read:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Check if the user can proceed to games

app.post('/check-username', (req, res) => {
  const { username } = req.body;

  // Check if the username already exists in the database
  const sql = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
  db.query(sql, [username], (error, results) => {
    if (error) {
      console.error('Error checking username:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const isUnique = results[0].count === 0;

    // Send the response
    res.json({ isUnique });
  });
});
// Endpoint for saving scores
app.post('/save-score', checkLoggedIn, (req, res) => {
  const { score } = req.body;
  const userId = req.session.user.id; // Assuming user.id is the foreign key

  // Basic validation
  if (!score || isNaN(score)) {
    return res.status(400).json({ error: 'Invalid score' });
  }

  // Check if the user has an existing record in the database
  const selectSQL = 'SELECT score FROM memorymatch_tbl WHERE id = ?';
  db.query(selectSQL, [userId], (error, results) => {
    if (error) {
      console.error('Error executing SELECT SQL:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      // If the user doesn't have a record, INSERT a new one
      const insertSQL = 'INSERT INTO memorymatch_tbl (id, username, score) VALUES (?, ?, ?)';
      db.query(insertSQL, [userId, req.session.user.username, score], (insertError, insertResults) => {
        if (insertError) {
          console.error('Error executing INSERT SQL:', insertError);
          return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Score saved successfully');
        const insertedId = insertResults.insertId;
        res.json({ success: true, id: insertedId });
      });
    } else {
      // If the user has a record, compare the scores and UPDATE if the new score is higher
      const previousScore = results[0].score;

      if (score > previousScore) {
        const updateSQL = 'UPDATE memorymatch_tbl SET score = ? WHERE id = ?';
        db.query(updateSQL, [score, userId], (updateError, updateResults) => {
          if (updateError) {
            console.error('Error executing UPDATE SQL:', updateError);
            return res.status(500).json({ error: 'Internal server error' });
          }
          console.log('Score updated successfully');
          res.json({ success: true });
        });
      } else {
        console.log('Previous score is higher, no update needed');
        res.json({ success: true });
      }
    }
  });
})


app.get('/get-leaderboard', async (req, res) => {
  try {
      // Fetch the leaderboard data from the database
      // You might want to sort the data by points in descending order
      const leaderboardData = await fetchLeaderboardData();

      res.json({ success: true, leaderboard: leaderboardData });
  } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      res.json({ success: false, error: 'Error fetching leaderboard data' });
  }
});
// Function to fetch leaderboard data from the database
async function fetchLeaderboardData() {
  try {
    const [rows] = await db.promise().query(
      'SELECT username, score FROM memorymatch_tbl ORDER BY score DESC LIMIT 10'
    );

    // Process the rows to create an array of objects
    const leaderboardData = rows.map(row => ({
      username: row.username,
      score: row.score,
    }));

    return leaderboardData;
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error;
  }
}
// Example endpoint to get user information

app.get('/get-highest-score', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.json({ success: true, highestScore: user.highestScore });
  } else {
    res.json({ success: false, message: 'User not authenticated.' });
  }
});

app.get('/get-username', (req, res) => {
  const username = req.username || ''; // Retrieve the username from the request object
  res.json({ username });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

