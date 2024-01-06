// Function to retrieve the highest score from localStorage
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
        jumbled: "ayahb",
        imageUrl: "photos/4979878_50819.jpg"
    },
    {
        correct: "puno", // Tree
        jumbled: "onup",
        imageUrl: "photos/simon-wilkes-S297j2CsdlM-unsplash.jpg"
    },
    {
        correct: "araw", // Sun
        jumbled: "wara",
        imageUrl: "photos/18324946_p1qs_4h7q_210525.jpg"
    },
    {
        correct: "lupa", // Earth
        jumbled: "apul",
        imageUrl: "photos/brown-background-natural-sand-texture.jpg"
    },
    {
        correct: "tubig", // Water
        jumbled: "gitub",
        imageUrl: "photos/david-becker-rrfdqjJWwmU-unsplash.jpg"
    },
    {
        correct: "libro", // Book
        jumbled: "bilor",
        imageUrl: "photos/studio-media-9DaOYUYnOls-unsplash.jpg"
    },
    {
        correct: "bulaklak", // Flower
        jumbled: "kalbulak",
        imageUrl: "photos/tirza-van-dijk-cNGUw-CEsp0-unsplash.jpg"
    },
    {
        correct: "tindahan", // Store
        jumbled: "ntinahad",
        imageUrl: "photos/nathalia-rosa-rWMIbqmOxrY-unsplash.jpg"
    },
    {
        correct: "tsokolate", // Chocolate
        jumbled: "ostlakoet",
        imageUrl: "photos/michele-blackwell-evRB-x0TJkM-unsplash.jpg"
    },
    {
        correct: "simbahan", // Church
        jumbled: "abimnahs",
        imageUrl: "photos/daniel-tseng-QCjC1KpA4nA-unsplash.jpg"
    }
];

let score = 0;
let timeLeft = 60;
let lastWordIndex = -1; // Initialize the last word index to an invalid value
let stopped = false; // Flag to track if the game is stopped

const wordDisplay = document.getElementById("word-display");
const wordImage = document.getElementById("word-image"); // Add an element for displaying the image
const wordInput = document.getElementById("word-input");
const scoreValue = document.getElementById("score-value");
const timeLeftDisplay = document.getElementById("time-left");
const messageDisplay = document.getElementById("message-display"); // Add an element for displaying messages
const stopButton = document.getElementById("stop-button");
const playAgainButton = document.getElementById("play-again-button");
const newGameButton = document.getElementById("new-game-button"); // New Game button
let gameInterval; // Variable to store the game interval

// Event listener for the Stop button
stopButton.addEventListener("click", stopGame);

// Event listener for the Play Again button
playAgainButton.addEventListener("click", startGame);

// Event listener for the New Game button
newGameButton.addEventListener("click", startNewGame);

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

    // Clear any existing game interval
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    // Start a new game interval
    gameInterval = setInterval(updateTime, 1000);
}

// Function to generate a random word object and display the jumbled word and image
function generateRandomWord() {
    let randomIndex;

    // Ensure the next word is not the same as the last one
    do {
        randomIndex = Math.floor(Math.random() * wordObjects.length);
    } while (randomIndex === lastWordIndex);

    lastWordIndex = randomIndex; // Update the last word index

    const randomWordObject = wordObjects[randomIndex];
    wordDisplay.textContent = randomWordObject.jumbled;
    wordImage.src = randomWordObject.imageUrl; // Update the image source
    currentCorrectWord = randomWordObject.correct;
}

let currentCorrectWord = "";

// Function to check if the input word is correct and update the score
function checkWord() {
    if (stopped) {
        showMessage("Game is stopped.");
        return;
    }

    const inputWord = wordInput.value.trim().toLowerCase();

    if (inputWord === currentCorrectWord) {
        score++;
        scoreValue.textContent = score;
        wordInput.value = "";
        generateRandomWord();
        showMessage("Correct word!");
    } else {
        showMessage("Incorrect word. Try again.");
    }
}

// Function to stop the game
function stopGame() {
    clearInterval(gameInterval); // Clear the game interval
    stopped = true;
    showMessage("Game stopped.");
    stopButton.disabled = true; // Disable the Stop button
    newGameButton.style.display = "block"; // Show the New Game button
}

// Function to end the game
function endGame() {
    if (stopped) {
        return;
    }

    clearInterval(gameInterval); // Clear the game interval
    const finalScore = score;
    const highestScore = getHighestScore(); // Retrieve the highest score
    let message = "Game Over! Your final score is: " + finalScore;

    if (finalScore > highestScore) {
        message += "\nCongratulations! You achieved a new high score!";
        updateHighestScore(finalScore); // Update and save the new highest score
    } else {
        message += "\nHighest Score: " + highestScore;
    }

    message += "\nClick 'Play Again' to start a new game.";
    playAgainButton.style.display = "block"; // Show the Play Again button
    showMessage(message);
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
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    // Start a new game interval
    gameInterval = setInterval(updateTime, 1000);
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
startGame();