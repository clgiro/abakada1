const abakadaAlphabet = ['A', 'B', 'K', 'D', 'E', 'G', 'H', 'I', 'L', 'M','N','Ng','O','P','R','S','T','U','W','Y'];

const levels = [
    // Define your levels here
    { gridSize: 4, cardValues: ['A', 'A', 'B', 'B'] },
    { gridSize: 6, cardValues: ['K', 'K', 'D', 'D','E', 'E'] },
    { gridSize: 8, cardValues: ['G', 'G', 'H', 'H', 'I','I','L','L'] },
    { gridSize: 10, cardValues: ['M', 'M', 'N', 'N', 'Ng','Ng','O','O', 'P','P'] },
    { gridSize: 12, cardValues: ['R', 'R', 'S', 'S', 'T','T','U','U', 'W','W','Y','Y'] },
    { gridSize: 14, cardValues: ['A', 'A', 'B', 'B', 'K','K','D','D', 'E','E','G','G','H','H'] },
    { gridSize: 16, cardValues: ['I', 'I', 'L', 'L', 'M','M','N','N', 'Ng','Ng','O','O','P','P','R','R'] },
    { gridSize: 18, cardValues: ['S', 'S', 'T', 'T', 'U','U','W','W', 'Y','Y','A','A','B','B','K','K','D','D'] },
    { gridSize: 20, cardValues: ['E', 'E', 'G', 'G', 'H','H','I','I', 'L','L','M','M','N','N','Ng','Ng','O','O','P','P'] },
  
];
let currentLevel = 0;
let flippedCards = [];
let locked = false;
let moves = 0;
let timerInterval;
let timeLeft = 60; // 1 minute in seconds
let gameStarted = false; // Flag to track if the game is in progress
let highestLevelReached = 0;
let score = 0; // Added score variable
let scoreSaved = false;
let leaderboardDisplayed = false;
let gameName='memorymatch'
const startGameButton = document.getElementById('start-game-button');
const welcomeScreen = document.getElementById('welcome-screen');
const gameContainer = document.getElementById('game-container');
const leaderboardContainer = document.getElementById("leaderboard-container")
const newGameB= document.getElementById("new-game")
const starContainer=document.getElementById("star-mcontainer")

// Event listener for capturing the player's name


document.getElementById("new-game").addEventListener('click', function (){
    newGame();

})
startGameButton.addEventListener("click", startGameButtonClick);

function startGameButtonClick(){
        
            // Display the game container and leaderboard
          

            // Start the game
            newGame();
            // Retrieve the saved currentLevel from local storage...
   
};



// Save currentLevel to local storage
localStorage.setItem('currentLevel', currentLevel);

// Retrieve currentLevel from local storage
const savedCurrentLevel = localStorage.getItem('currentLevel');
if (savedCurrentLevel !== null) {
    currentLevel = parseInt(savedCurrentLevel, 10);
}


document.getElementById('stop-game').addEventListener('click', function () {
endGame();
});

function initializeTimer() {
    timeLeft = 60;
    updateTimerDisplay();
}

// Disable card clicking by removing the event listeners
const cards = document.querySelectorAll('.memory-card');
cards.forEach(card => card.removeEventListener('click', flipCard));

function shuffleLevels(levelsArray) {
    for (let i = levelsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [levelsArray[i], levelsArray[j]] = [levelsArray[j], levelsArray[i]];
    }
}
function playerWinsLevel() {
    if (currentLevel < levels.length - 1) {
        currentLevel++; // Increment the current level
        resetGame(); // Reset the game for the next level
    } else {
        // Handle game completion
        // endGame();
    }
}
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').textContent = `Time Left: ${formattedTime}`;
}


function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000); // Update every second
}


// Function to save the current level to local storage
function saveCurrentLevelToLocalStorage() {
    localStorage.setItem('currentLevel', currentLevel);
}

// Function to load the current level from local storage
function loadCurrentLevelFromLocalStorage() {
    const savedCurrentLevel = localStorage.getItem('currentLevel');
    if (savedCurrentLevel !== null) {
        currentLevel = parseInt(savedCurrentLevel, 10);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
}

const stopGameButton = document.getElementById("stop-game");
stopGameButton.addEventListener("click", confirmStopGame);
    function confirmStopGame() {
        const confirmation = window.confirm("Gusto mon naba itigil ang laro?");
        if (confirmation) {
            endGame();
        }
    }
    function endGame() {
        stopTimer(); // Stop the timer
        locked = true; // Disable card clicking
        gameStarted = false; // Set gameStarted to false
    
        // Hide all unnecessary elements
        document.getElementById('custom-message').style.display = 'none';
        document.getElementById('message-text').textContent = '';
        document.getElementById('play-again').style.display = 'none';
        document.getElementById('new-game').style.display = 'inline';
    
        document.getElementById('stop-game').style.display = 'none';
        starContainer.style.display = 'block';
        // Display the highest level record
        const highestLevelElement = document.getElementById('highest-level');
        if (currentLevel > parseInt(highestLevelElement.textContent)) {
            highestLevelElement.textContent = currentLevel;
        }
    
        // Display the score
        document.getElementById('score').textContent = `Score: ${score}`;
      
        if (!leaderboardDisplayed) {
            displayLeaderboard();
            leaderboardDisplayed = true; // Set the flag to true after displaying the leaderboard
        }
        const starRating = calculateStarRating(score);
        displayStarRating(starRating);

        // Display a personalized message
        const usernameMessage = `Hi!  Ang iyong puntos ay ${score}. `;

    // Update the game message element
    const gameMessageElement = document.getElementById('game-message');
    gameMessageElement.textContent = usernameMessage;

        
    }
    


function stopGame() {
    stopTimer(); // Stop the timer
    gameStarted = false; // Set gameStarted to false

    // Disable card clicking by removing the event listeners
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.removeEventListener('click', flipCard));

    // Clear the game board
    document.getElementById('game-board').innerHTML = '';

    // Hide the "Stop Game" button and show the "New Game" button
    document.getElementById('stop-game').style.display = 'none';
    document.getElementById('new-game').style.display = 'inline';
    
    // Reset the game state to its initial values
    flippedCards = [];
    locked = false;
    moves = 0;
}
function newGame() {
    // Stop the existing timer if it's running
    stopTimer();

    // Reset the score
    score = 0;

    // Initialize a new game
    document.getElementById('custom-message').style.display = 'none';
    document.getElementById('message-text').textContent = '';
    document.getElementById('play-again').style.display = 'none';
    document.getElementById('stop-game').style.display = 'inline';
    gameContainer.style.display = 'inline';
    leaderboardContainer.style.display = 'block';
    welcomeScreen.style.display = 'none';
    newGameB.style.display = 'none';
    starContainer.style.display = 'none';
    console.log(currentLevel);
    resetGame();
    loadCurrentLevelFromLocalStorage(); // Load the current level from local storage
  
    // Initialize the timer
    initializeTimer();
    playBackgroundMusic();
    displayLeaderboard()    // Start the timer for the new game
    startTimer();
    gameStarted = true;

    // Reattach event listeners to the cards
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
 
}


function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}
function createCard(value, index) {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.cardValue = value;
    card.dataset.index = index;

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    cardContent.textContent = value;

    card.appendChild(cardContent);

    card.addEventListener('click', flipCard); // Add this line to attach the click event
    document.getElementById('game-board').appendChild(card);
}


function createGameBoard(level) {
    const { gridSize, cardValues } = levels[level];
    const shuffledCards = [...cardValues, ...cardValues];
    shuffleCards(shuffledCards);

    for (let i = 0; i < shuffledCards.length; i++) {
        createCard(shuffledCards[i], i);
    }
locked=true
    document.getElementById('level-indicator').textContent = `Level ${currentLevel + 1}`;

    // Add a delay before hiding the cards
    setTimeout(() => {
        hideCardValues();
        locked=false
    }, 2000); // 2000 milliseconds (2 seconds)
}

function hideCardValues() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        const cardContent = card.querySelector('.card-content');
        if (cardContent) {
            cardContent.style.visibility = 'hidden'; // Hide the card values
        }

        card.classList.remove('flipped'); // Ensure the flipped class is removed
    });

    // After hiding the values, allow the player to start flipping cards
    setTimeout(() => {
        // Reattach event listeners to the cards
        cards.forEach(card => card.addEventListener('click', flipCard));
    }, 500); // Add a delay of 500 milliseconds (0.5 seconds) to give a visual cue
}
function flipCard() {
    if (locked || !gameStarted) return;
    const card = this;
    if (card.classList.contains('flipped') || flippedCards.length >= 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);
    showCardContent(card);

    // Play the corresponding sound
    const audioId = 'audio' + card.dataset.cardValue.toUpperCase();
    const audioElement = document.getElementById(audioId);
    if (audioElement) {
        audioElement.play();
    }

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;

        if (card1.dataset.cardValue === card2.dataset.cardValue) {
            card1.style.backgroundColor = 'green';
            card2.style.backgroundColor = 'green';

            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            flippedCards = [];

            // Update the score on successful match
            score += 50;
            document.getElementById('score').textContent = `Score: ${score}`;
            timeLeft += 3;
            updateTimerDisplay();
        } else {
            locked = true;
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                hideCardContent(card1);
                hideCardContent(card2);
                flippedCards = [];
                locked = false;
            timeLeft -= 2;
    updateTimerDisplay(); }, 1000);
        }
        moves++;
    }
  

    checkWin();
}

// Function to hide the content of a card when it's hidden
function hideCardContent(card) {
    const cardContent = card.querySelector('.card-content');
    if (cardContent) {
        cardContent.style.visibility = 'hidden'; // Hide the card values
    }
}

function showCardContent(card) {
    const cardContent = card.querySelector('.card-content');
    if (cardContent) {
        cardContent.style.visibility = 'visible'; // Show the card values
    }
}


function checkWin() {
    if (document.querySelectorAll('.memory-card.flipped').length === levels[currentLevel].gridSize * 2) {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            resetGame();
           
           
        } else {
            // endGame();
        }
        
    }
}

function resetGame() {
    document.getElementById('game-board').innerHTML = '';
    moves = 0;
    createGameBoard(currentLevel);
}

;
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

  
  function getHighestScore() {
    fetch('/get-highest-score')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const highestScore = data.highestScore;
          // Do something with the highest score (update UI, etc.)
          console.log('Highest Score:', highestScore);
        } else {
          console.error('Failed to get highest score:', data.message);
          // Handle error if needed
        }
      })
      .catch(error => {
        console.error('Error getting highest score:', error);
        // Handle error if needed
      });
  }
  function displayLeaderboard() {
    // Update the part of your client-side code that handles the /get-leaderboard response
    fetch('/get-leaderboard?gameName=memorymatch') // Provide the specific gameName for testing
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
            usernameHeader.textContent = 'Pangalan';
            scoreHeader.textContent = 'Puntos';
  
            // Populate the table with leaderboard data
          // Inside the forEach loop
data.leaderboard.forEach((entry, index) => {
    const row = leaderboardTable.insertRow(index + 1);
    const usernameCell = row.insertCell(0);
    const scoreCell = row.insertCell(1);
  
    // Add additional logging
    console.log('Entry:', entry);
  
    // Check if scores is defined before accessing memorymatch
    if (entry.scores && entry.scores.memorymatch !== undefined) {
      usernameCell.textContent = entry.username;
      scoreCell.textContent = entry.scores.memorymatch;
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

  
  
  // Call this function with the appropriate gameName, e.g., displayLeaderboard('memorymatch');
  
  
function calculateStarRating(score) {
    if (score >= 700) {
        return 3; // 3 stars for 700 and above
    } else if (score >= 401 && score <= 609) {
        return 2; // 2 stars for 401 to 609
    } else {
        return 1; // 1 star for below 401
    }
}
function displayStarRating(starRating) {
    const starContainer = document.getElementById('star-container');
    starContainer.innerHTML = ''; // Clear existing content

    for (let i = 0; i < starRating; i++) {
        const starElement = document.createElement('span');
        starElement.className = 'star';
        starElement.textContent = '★'; // Use any star symbol you prefer
        starContainer.appendChild(starElement);
    }
   
    savePlayerScore(gameName, score)
    gameContainer.style.display='none'
}

