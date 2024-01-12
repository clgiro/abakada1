function getHighestScore() {
    const highestScore = localStorage.getItem("highestScore");
    return highestScore ? parseInt(highestScore) : 0;
}

// Function to update and save the highest score in localStorage
function updateHighestScore(newScore) {
    const highestScore = getHighestScore();
    if (newScore > highestScore) {
        localStorage.setItem("highestScore", newScore.toString());
    }
}

// Define an array of word objects, each with a correctly spelled Filipino word, a jumbled version, and an image URL
const wordObjects = [
    
        
        {
            correct: "bahay", // House
            imageUrl: "photos/4979878_50819.jpg"
        },
        {
            correct: "puno", // Tree
            imageUrl: "photos/simon-wilkes-S297j2CsdlM-unsplash.jpg"
        },
        {
            correct: "araw", // Sun
            imageUrl: "photos/18324946_p1qs_4h7q_210525.jpg"
        },
        {
            correct: "lupa", // Earth
            imageUrl: "photos/brown-background-natural-sand-texture.jpg"
        },
        {
            correct: "tubig", // Water
            imageUrl: "photos/david-becker-rrfdqjJWwmU-unsplash.jpg"
        },
        {
            correct: "libro", // Book
            imageUrl: "photos/studio-media-9DaOYUYnOls-unsplash.jpg"
        },
        {
            correct: "bulaklak", // Flower
            imageUrl: "photos/tirza-van-dijk-cNGUw-CEsp0-unsplash.jpg"
        },
        {
            correct: "tindahan", // Store
            imageUrl: "photos/nathalia-rosa-rWMIbqmOxrY-unsplash.jpg"
        },
        {
            correct: "tsokolate", // Chocolate
            imageUrl: "photos/michele-blackwell-evRB-x0TJkM-unsplash.jpg"
        },
        {
            correct: "simbahan", // Church
            imageUrl: "photos/daniel-tseng-QCjC1KpA4nA-unsplash.jpg"
        },
        {
            correct: "libro", // Church
            imageUrl: "photos/reading.jpg"
        },
        {
            correct: "kalsada", // Church
            imageUrl: "photos/running.jpg"
        },
        {
            correct: "magkakaibigan", // Church
            imageUrl: "photos/eating.jpg"
        },
        {
            correct: "pera", // Church
            imageUrl: "photos/money.jpg"
        },
        {
            correct: "bisekleta", // Church
            imageUrl: "photos/bike.jpg"
        },
        {
            correct: "kotse", // Church
            imageUrl: "photos/car.jpg"
        },
        {
            correct: "babae", // House
            imageUrl: "photos2/bady-abbas-VmYZe_yqxL0-unsplash.jpg"
        },
        {
            correct: "bisekleta", // Tree
            imageUrl: "photos2/bicycle-8029570_1280.jpg"
        },
        {
            correct: "libro", // Sun
            imageUrl: "photos2/boys-1844435_1280.png"
        },
        {
            correct: "guro", // Earth
            imageUrl: "photos2/businessman-607831_1280.png"
        },
        {
            correct: "pusa", // Water
            imageUrl: "photos2/cat-7347316_1280.png"
        },
        {
            correct: "sumisigaw", // Book
            imageUrl: "photos2/loudspeaker-1459128_1280.png"
        },
        {
            correct: "kumakanta", // Flower
            imageUrl: "photos2/man-7833617_1280.jpg"
        },
        {
            correct: "bangka", // Store
            imageUrl: "photos2/sailboat-23801_1280.png"
        },
        {
            correct: "sumasayaw", // Chocolate
            imageUrl: "photos2/sports-center-for-the-elderly-6702147_1280.jpg"
        },
        {
            correct: "nagpipinta", // Church
            imageUrl: "photos2/woman-6691311_1280.jpg"
        },
        
            {
                correct: "maliit na bahay", // House
                imageUrl: "photos/4979878_50819.jpg"
            },
            {
                correct: "mataas na puno", // Tree
                imageUrl: "photos/simon-wilkes-S297j2CsdlM-unsplash.jpg"
            },
            {
                correct: "init ng araw", // Sun
                imageUrl: "photos/18324946_p1qs_4h7q_210525.jpg"
            },
            {
                correct: "matabang lupa", // Earth
                imageUrl: "photos/brown-background-natural-sand-texture.jpg"
            },
            {
                correct: "malinis na tubig", // Water
                imageUrl: "photos/david-becker-rrfdqjJWwmU-unsplash.jpg"
            },
            {
                correct: "makapal na libro", // Book
                imageUrl: "photos/studio-media-9DaOYUYnOls-unsplash.jpg"
            },
            {
                correct: "mabangong bulaklak", // Flower
                imageUrl: "photos/tirza-van-dijk-cNGUw-CEsp0-unsplash.jpg"
            },
            {
                correct: "masikip na tindahan", // Store
                imageUrl: "photos/nathalia-rosa-rWMIbqmOxrY-unsplash.jpg"
            },
            {
                correct: "matamis na tsokolate", // Chocolate
                imageUrl: "photos/michele-blackwell-evRB-x0TJkM-unsplash.jpg"
            },
            {
                correct: "lumang simbahan", // Church
                imageUrl: "photos/daniel-tseng-QCjC1KpA4nA-unsplash.jpg"
            },
            {
                correct: "nagbabasa ng libro", // Church
                imageUrl: "photos/reading.jpg"
            },
            {
                correct: "tumatakbo sa kalsada", // Church
                imageUrl: "photos/running.jpg"
            },
            {
                correct: "sikat na kainan", // Church
                imageUrl: "photos/eating.jpg"
            },
            {
                correct: "maraming pera", // Church
                imageUrl: "photos/money.jpg"
            },
            {
                correct: "matibay na bisekleta", // Church
                imageUrl: "photos/bike.jpg"
            },
            {
                correct: "magarang kotse", // Church
                imageUrl: "photos/car.jpg"
            },
            {
                correct: "umaakyat na babae", // House
                imageUrl: "photos2/bady-abbas-VmYZe_yqxL0-unsplash.jpg"
            },
            {
                correct: "bisekleta sa daan", // Tree
                imageUrl: "photos2/bicycle-8029570_1280.jpg"
            },
            {
                correct: "masipag magaral", // Sun
                imageUrl: "photos2/boys-1844435_1280.png"
            },
            {
                correct: "masayang nagtuturo", // Earth
                imageUrl: "photos2/businessman-607831_1280.png"
            },
            {
                correct: "sumasayaw na pusa", // Water
                imageUrl: "photos2/cat-7347316_1280.png"
            },
            {
                correct: "sumisigaw na lalaki", // Book
                imageUrl: "photos2/loudspeaker-1459128_1280.png"
            },
            {
                correct: "lalaking kumakanta", // Flower
                imageUrl: "photos2/man-7833617_1280.jpg"
            },
            {
                correct: "maliit na bangka", // Store
                imageUrl: "photos2/sailboat-23801_1280.png"
            },
            {
                correct: "matatandang nageehersisyo", // Chocolate
                imageUrl: "photos2/sports-center-for-the-elderly-6702147_1280.jpg"
            },
            {
                correct: "babaeng nagpipinta", // Church
                imageUrl: "photos2/woman-6691311_1280.jpg"
            },
            
    
    ] 
    

let score = 0;
let timeLeft = 60;
let lastWordIndex = -1; // Initialize the last word index to an invalid value
let stopped = false; // Flag to track if the game is stopped
let wordTimer;
let gameName='wordpuzzle'

const wordDisplay = document.getElementById("word-display");
const wordImage = document.getElementById("word-image"); // Add an element for displaying the image
const wordInput = document.getElementById("word-input");
const scoreValue = document.getElementById("score-value");
const timeLeftDisplay = document.getElementById("time-left");
const messageDisplay = document.getElementById("message-display"); // Add an element for displaying messages
const stopButton = document.getElementById("stop-button");
const playAgainButton = document.getElementById("play-again-button");
const newGameButton = document.getElementById("new-game-button"); // New Game button
const submitButton = document.getElementById("submit-button");
const hintButton = document.getElementById("hint-button");

let gameInterval; // Variable to store the game interval

// Event listener for the Stop button
stopButton.addEventListener('click', function(){
    const confirmed = window.confirm('Gusto mona bang itigil ang laro?');
    if(!confirmed){
        return
    }
    endGame()
})

// Event listener for the Play Again button
playAgainButton.addEventListener('click', function (){
    location.reload();

})

// Event listener for the New Game button
newGameButton.addEventListener("click", startNewGame);

// Hide the game container and leaderboard initially
const gameContainer = document.querySelector(".game-container");
const leaderboardContainer = document.querySelector(".leaderboard-container");
gameContainer.style.display = "none";
leaderboardContainer.style.display = "none";

function shuffleWord(word) {
    // Split the word into an array of characters
    const wordArray = word.split(' ');

    // Shuffle the letters within each word
    const shuffledWordArray = wordArray.map((originalWord) => {
        return originalWord
            .split('')
            .sort(() => Math.random() - 0.5) // Randomly shuffle the letters
            .join('');
    });

    // Join the shuffled words back into a sentence
    const shuffledSentence = shuffledWordArray.join(' ');

    return shuffledSentence;
}

function getDynamicHint() {
    const originalWord = currentCorrectWord;
    let dynamicJumbledWord;

    // Ensure the dynamic jumbled word is different from the original one
    do {
        dynamicJumbledWord = shuffleWord(originalWord);
    } while (dynamicJumbledWord === wordDisplay.textContent || dynamicJumbledWord === currentCorrectWord);

    wordDisplay.textContent = dynamicJumbledWord;
}

// Sort the wordObjects array from short to long correct word
// Sort the wordObjects array from short to long correct word without alternating
// Sort the wordObjects array from short to long correct word without alternating
// ... (previous code)

// Sort the wordObjects array from short to long correct word
wordObjects.sort((a, b) => {
    const lengthDiff = a.correct.replace(/ /g, '').length - b.correct.replace(/ /g, '').length;

    // If the lengths are equal, maintain the original order
    return lengthDiff !== 0 ? lengthDiff : wordObjects.indexOf(a) - wordObjects.indexOf(b);
});

// ... (continue with the rest of the code)

function updateScoreHistory(gameName, score) {
    // Verify inputs
    console.log('gameName:', gameName);
    console.log('score:', score);

    // Calculate percentage (assuming the maximum score is 50)
    const percentage = (score / 1900) * 100;

    // Add the percentage to the user's scoreHistory
    fetch('/update-score-history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameName, percentage }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Score history updated successfully:', data);
        } else {
            console.error('Failed to update score history. Server response:', data);
            // Handle error if needed
        }
    })
    .catch(error => {
        console.error('Error updating score history:', error);
        // Handle error if needed
    });
}
// Function to start the game
function startGame() {
    playAgainButton.style.display = "none"; // Hide the Play Again button
    newGameButton.style.display = "none"; // Hide the New Game button
    timeLeft = 60; // Reset the timer to 60 seconds
    score = 0; // Reset the score
    scoreValue.textContent = score;
    messageDisplay.textContent = ""; // Clear any previous messages
    stopped = false;
    stopButton.disabled = false; // Enable the Stop button
    generateRandomWord();
playBackgroundMusic();
    // Clear any existing game interval
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    // Start a new game interval
    gameInterval = setInterval(updateTime, 1000);
    displayLeaderboard();
  
}

function playWrongAudio() {
    const wrongAudio = document.getElementById("wrongAudio");
    wrongAudio.play().catch(error => {
        console.error("Error playing wrong answer audio:", error);
    });
}

function playCorrectAudio() {
    const wrongAudio = document.getElementById("correctAudio");
    wrongAudio.play().catch(error => {
        console.error("Error playing wrong answer audio:", error);
    });
}


// Function to generate a random word object and display the jumbled word and image
// Function to generate a random word object and display the jumbled word and image
function generateRandomWord() {
    let randomIndex;
    timeLeft = 60; // Reset the timer to 60 seconds

    timeLeftDisplay.textContent = timeLeft + "s";
    // Ensure the next word is not the same as the last one
    do {
        randomIndex = Math.floor(Math.random() * wordObjects.length);
    } while (randomIndex === lastWordIndex);

    lastWordIndex = randomIndex; // Update the last word index

    const randomWordObject = wordObjects[randomIndex];
    wordDisplay.textContent = randomWordObject.jumbled;
    wordImage.src = randomWordObject.imageUrl; // Update the image source
    currentCorrectWord = randomWordObject.correct;

    // Call getDynamicHint to update the displayed word with a shuffled version
    getDynamicHint();

    // Clear existing timers
    clearTimeout(wordTimer);

    // Set a timer for each word (60 seconds)
   updateTime()
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    // Start a new game interval
    gameInterval = setInterval(updateTime, 1000);
}


let currentCorrectWord = "";

// Function to check if the input word is correct and update the score
// Function to check if the input word is correct and update the score
function checkWord() {
    if (stopped) {
        showMessage("Nahinto.");
        return;
    }

    const inputWord = wordInput.value.trim().toLowerCase();

    if (inputWord === currentCorrectWord) {
        score += 50; // Add 50 points for each correct answer
        scoreValue.textContent = score;
        wordInput.value = "";
        generateRandomWord();
        showMessage("Tama!");
        playCorrectAudio();
    } else {
        showMessage("Mali! Subukan Muli.");
        playWrongAudio();
    }
}


function playBackgroundMusic() {
    const backgroundMusic = document.getElementById("backgroundMusic");
    if (backgroundMusic) {
        // Initiate playback on user action (e.g., button click)
        document.addEventListener("click", () => {
            backgroundMusic.play().catch(error => {
                console.error("Error playing background music:", error);
            });
        }, { once: true }); // Remove the event listener after the first click
    }
}
// Function to end the game
function endGame() {
    if (stopped) {
        return;
    }

    clearInterval(gameInterval); // Clear the game interval
    clearTimeout(wordTimer); // Clear the word timer

    const finalScore = score;
    const highestScore = getHighestScore(); // Retrieve the highest score
    let message = "Ang iyong puntos: " + finalScore;
    alert("Ang iyong puntos: " + finalScore)

    if (finalScore > highestScore) {
        message += "\Nakuha mo ang pinakamataas na puntos";
        updateHighestScore(finalScore); // Update and save the new highest score
    } else {
        message += "\nPinakamataas na Puntos: " + highestScore;
    }

    message += "\nPindutin ang bagong laro, para sa panibagong laro";
    playAgainButton.style.display = "block"; // Show the Play Again button
    showMessage(message);
    wordInput.disabled = true;
    submitButton.style.display = "none";
    stopButton.style.display = "none";
    hintButton.style.display = "none";
    savePlayerScore( gameName, score);
    updateScoreHistory( gameName, score)
    displayLeaderboard();
}

// Function to start a new game
function startNewGame() {
    clearInterval(gameInterval); // Clear the game interval
    score = 0; // Reset the score
    timeLeft = 60; // Reset the timer to 60 seconds
    scoreValue.textContent = score;
    timeLeftDisplay.textContent = timeLeft + "s";
    messageDisplay.textContent = ""; // Clear any previous messages
    stopped = false;
    stopButton.disabled = false; // Enable the Stop button
    generateRandomWord();
   
    // Hide the New Game button again
    newGameButton.style.display = "none";

    // Clear any existing game interval
   
}

// Function to update the timer
function updateTime() {
    if (timeLeft > 0) {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft + "s";
    } else {
        endGame();
    }
}

// Function to display messages
function showMessage(message) {
    messageDisplay.textContent = message;
}

// Event listener for the Submit button
document.getElementById("submit-button").addEventListener("click", checkWord);
wordInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        checkWord();
    }
});

// Start the game when the page loads
// Event listener for the "Start Game" button on the welcome screen
// Event listener for the "Start Game" button on the welcome screen
document.getElementById("start-game-button").addEventListener("click", function () {
    
            document.getElementById("welcome-screen").style.display = "none";
    
            // Display the game container and leaderboard
            gameContainer.style.display = "block";
            leaderboardContainer.style.display = "block";
        
            // Start the game
            startGame();
        
        }
    )
    function savePlayerScore(gameName, score) {
        // Check if the score is higher than the stored highest score
        
        fetch('/save-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameName, score }), // Pass the gameName along with the score
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`Score for ${gameName} saved successfully:`, data);
                scoreSaved = true;
            } else {
                console.error(`Failed to save score for ${gameName}. Server response:`, data);
                // Handle error if needed
            }
        })
        .catch(error => {
            console.error(`Error saving score for ${gameName}:`, error);
            // Handle error if needed
        });
    }
    
    
    
    // Example usage:
    // Assuming gameName is 'wordpuzzle' and score is the player's score
  

function displayLeaderboard() {
  // Update the part of your client-side code that handles the /get-leaderboard response
  fetch('/get-leaderboard?gameName=wordpuzzle') // Provide the specific gameName for testing
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        if (Array.isArray(data.leaderboard)) {
          // Process the leaderboard data
          console.log('Leaderboard Data:', data.leaderboard);

          // Assuming you have an element with the id 'leaderboard-table' to display the leaderboard
          const leaderboardTable = document.getElementById('leaderboard-table');
          leaderboardTable.innerHTML = ''; // Clear existing content

          // Create table header
          const headerRow = leaderboardTable.insertRow(0);
          const usernameHeader = headerRow.insertCell(0);
          const scoreHeader = headerRow.insertCell(1);
          usernameHeader.textContent = 'Username';
          scoreHeader.textContent = 'Score';

          // Populate the table with leaderboard data
        // Inside the forEach loop
data.leaderboard.forEach((entry, index) => {
  const row = leaderboardTable.insertRow(index + 1);
  const usernameCell = row.insertCell(0);
  const scoreCell = row.insertCell(1);

  // Add additional logging
  console.log('Entry:', entry);

  // Check if scores is defined before accessing memorymatch
  if (entry.scores && entry.scores.wordpuzzle !== undefined) {
    usernameCell.textContent = entry.username;
    scoreCell.textContent = entry.scores.wordpuzzle;
  } else {
    console.error('Invalid leaderboard entry:', entry);
  }
});

        } else {
          console.error('Invalid leaderboard data structure:', data.leaderboard);
        }
      } else {
        console.error('Failed to fetch leaderboard data:', data.error);
      }
    })
    .catch(error => {
      console.error('Error fetching leaderboard data:', error);
    });
}
