const abakadaAlphabet = ['A', 'B', 'K', 'D', 'E', 'G', 'H', 'I', 'L', 'M'];

const levels = [
    // Define your levels here
    { gridSize: 4, cardValues: ['A', 'A', 'B', 'B'] },
    { gridSize: 4, cardValues: ['K', 'K', 'D', 'D'] },
    { gridSize: 4, cardValues: ['E', 'E', 'G', 'G'] },
    { gridSize: 4, cardValues: ['H', 'H', 'I', 'I'] },
    { gridSize: 4, cardValues: ['L', 'L', 'M', 'M'] },
    { gridSize: 4, cardValues: ['N', 'N', 'NG', 'NG'] },
    { gridSize: 4, cardValues: ['O', 'O', 'P', 'P'] },
    { gridSize: 4, cardValues: ['R', 'R', 'S', 'S'] },
    { gridSize: 4, cardValues: ['T', 'T', 'U', 'U'] },
    { gridSize: 4, cardValues: ['W', 'W', 'Y', 'Y'] },
    { gridSize: 6, cardValues: ['A', 'A', 'B', 'B', 'K', 'K'] },
    { gridSize: 6, cardValues: ['D', 'D', 'E', 'E', 'G', 'G'] },
    { gridSize: 6, cardValues: ['H', 'H', 'I', 'I', 'L', 'L'] },
    { gridSize: 6, cardValues: ['M', 'M', 'N', 'N', 'NG', 'NG'] },
    { gridSize: 6, cardValues: ['O', 'O', 'P', 'P', 'R', 'R'] },
    { gridSize: 6, cardValues: ['S', 'S', 'T', 'T', 'U', 'U'] },
    { gridSize: 6, cardValues: ['W', 'W', 'Y', 'Y', 'A', 'A'] },
    { gridSize: 6, cardValues: ['B', 'B', 'K', 'K', 'D', 'D'] },
    { gridSize: 6, cardValues: ['E', 'E', 'G', 'G', 'H', 'H'] },
    { gridSize: 6, cardValues: ['I', 'I', 'L', 'L', 'M', 'M'] },
    { gridSize: 8, cardValues: ['N', 'N', 'NG', 'NG', 'O', 'O', 'P', 'P'] },
    { gridSize: 8, cardValues: ['R', 'R', 'S', 'S', 'T', 'T', 'U', 'U'] },
    { gridSize: 8, cardValues: ['W', 'W', 'Y', 'Y', 'A', 'A', 'B', 'B'] },
    { gridSize: 8, cardValues: ['K', 'K', 'D', 'D', 'E', 'E', 'G', 'G'] },
    { gridSize: 8, cardValues: ['H', 'H', 'I', 'I', 'L', 'L', 'M', 'M'] },
    { gridSize: 8, cardValues: ['N', 'N', 'NG', 'NG', 'O', 'O', 'P', 'P'] },
    { gridSize: 8, cardValues: ['R', 'R', 'S', 'S', 'T', 'T', 'U', 'U'] },
    { gridSize: 8, cardValues: ['W', 'W', 'Y', 'Y', 'A', 'A', 'B', 'B'] },
    { gridSize: 10, cardValues: ['K', 'K', 'D', 'D', 'E', 'E', 'G', 'G', 'H', 'H'] },
    { gridSize: 10, cardValues: ['I', 'I', 'L', 'L', 'M', 'M', 'N', 'N', 'NG', 'NG'] },
    { gridSize: 10, cardValues: ['O', 'O', 'P', 'P', 'R', 'R', 'S', 'S', 'T', 'T'] },
    { gridSize: 10, cardValues: ['U', 'U', 'W', 'W', 'Y', 'Y', 'A', 'A', 'B', 'B'] },
    { gridSize: 10, cardValues: ['K', 'K', 'D', 'D', 'E', 'E', 'G', 'G', 'H', 'H'] },
];

let currentLevel = 0;
let flippedCards = [];
let locked = false;
let moves = 0;
let timerInterval;
let timeLeft = 60; // 1 minute in seconds
let gameStarted = false; // Flag to track if the game is in progress

document.getElementById('stop-game').addEventListener('click', function () {
    stopGame();
});

document.getElementById('new-game').addEventListener('click', function () {
    newGame();
})
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

function stopTimer() {
    clearInterval(timerInterval);
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

    // Display the highest level record
    const highestLevelElement = document.getElementById('highest-level');
    if (currentLevel > parseInt(highestLevelElement.textContent)) {
        highestLevelElement.textContent = currentLevel;
    }
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
    currentLevel = 0;
    flippedCards = [];
    locked = false;
    moves = 0;
}

function newGame() {
    // Stop the existing timer if it's running
    stopTimer();

    // Initialize a new game
    document.getElementById('custom-message').style.display = 'none';
    document.getElementById('message-text').textContent = '';
    document.getElementById('play-again').style.display = 'none';
    document.getElementById('new-game').style.display = 'inline';
    document.getElementById('stop-game').style.display = 'inline';
    resetGame();
  
    // Initialize the timer
    initializeTimer();

    // Start the timer for the new game
    startTimer();
    gameStarted = true;

    // Reattach event listeners to the cards
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
    locked = false;
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
    card.innerHTML = value;
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

    document.getElementById('level-indicator').textContent = `Level ${currentLevel + 1}`;
}

function flipCard() {
    if (locked || !gameStarted) return; // Check if the game is locked or not started
    const card = this;
    if (card.classList.contains('flipped') || flippedCards.length >= 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;

        if (card1.dataset.cardValue === card2.dataset.cardValue) {
            // Matched cards, change their color
            card1.style.backgroundColor = 'green';
            card2.style.backgroundColor = 'green';

            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            flippedCards = [];
        } else {
            locked = true;
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                locked = false;
            }, 1000);
        }
        moves++;
    }

    checkWin();
}

function checkWin() {
    if (document.querySelectorAll('.memory-card.flipped').length === levels[currentLevel].gridSize * 2) {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            resetGame();
            startTimer();
        } else {
            endGame();
        }
    }
}

function resetGame() {
    document.getElementById('game-board').innerHTML = '';
    moves = 0;
    createGameBoard(currentLevel);
}

// Start a new game automatically when the page loads
// window.onload = function() {
//     newGame();
// };
