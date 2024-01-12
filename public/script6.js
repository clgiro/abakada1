// Array of Abakada letters
const abakadaLetters = ["A", "B", "K", "D", "E", "G", "H", "I", "L", "M", "N", "NG", "O", "P", "R", "S", "T", "U", "W", "Y"];
const sentences = [
    "Ang bahay ay malaki",
    "Si Maria ay estudyante",
    "Kumain ako ng masarap na pagkain",
    "Mahalaga ang edukasyon",
    "Nagluto ako ng adobo",
    "Ang mga bulaklak ay maganda",
    "Nagaaral ako ng wikang Filipino",
    "Maglinis ka ng iyong kwarto",
    "Mahilig akong magbasa ng libro",
    "Ang Pilipinas ay may magandang tanawin",
    "Sumiklab ang malupit na bagyo",
    "Ang buhay ay may pagsubok",
    "Masarap ang halo-halo",
    "Nagaaral ako ang Abakada",
    "Si Ana ay naglalaro",
    "Nagpunta kami sa simbahan",
    "Gusto kong matutong mag gitara.",
    "Ang asukal ay matamis",
    "Napakaganda ng tanawin",
    "Ang pamilya ay mahalaga"
  ];
// Create letter buttons
let currentSentenceIndex = 0;
let score = 0;
let gameStartTime;
let timerInterval;
let playerName= 0;
let gameOver = false;
let gameName='sentence'

const stopGameButton= document.getElementById("stopgame-button")
const gameDuration = 70000; // 120 seconds
const playerNameInput = document.getElementById("player-name-input")
const gameContainer= document.getElementById("game-container")
const submitButton=document.getElementById("submit-button")
const newGameButton=document.getElementById("newgame-button")
const leaderboardContainer= document.getElementById("leaderboard-container")
const welcomeScreen=document.getElementById("welcome-screen")



newGameButton.addEventListener("click", function(){
  location.reload();

})

document.getElementById("start-game-button").addEventListener("click", function () {
  
 
 startGame();

  // Start the game
        
        
        }
    )
    

 

  

    const letterButtons = document.getElementById("letter-buttons");
    const commonButtons = [" ", ",", ".", "?", "!", "'", "\""];
    
    // Add buttons for uppercase letters
    abakadaLetters.forEach((letter) => {
      addButton(letter);
    });
    
    // Add buttons for lowercase letters
    abakadaLetters.forEach((letter) => {
      addButton(letter.toLowerCase());
    });
    
    // Add buttons for common symbols
    commonButtons.forEach((symbol) => {
      addButton(symbol);
    });
    
    function addButton(character) {
      const button = document.createElement("div");
      button.classList.add("button");
      button.textContent = character;
      button.addEventListener("click", () => {
        // Check if the game is over
        if (!gameOver) {
          // Add the clicked character to the input field
          const input = document.getElementById("sentence-input");
          input.value += character;
        }
      });
      letterButtons.appendChild(button);
    }
    

// Listen for Enter key press in the input field
const inputField = document.getElementById("sentence-input");
inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkSentence(inputField.value);
  }
});
document.getElementById("sentence-input").addEventListener("input", function() {
  checkSentence(this.value);
});
// Function to check the sentence


// Add a click event listener to the space button
const spaceButton = document.getElementById("space-button");
spaceButton.addEventListener("click", () => {
  // Add a space to the input field
  const input = document.getElementById("sentence-input");
  input.value += " ";
});

function updateScoreHistory(gameName, score) {
  // Verify inputs
  console.log('gameName:', gameName);
  console.log('score:', score);

  // Calculate percentage (assuming the maximum score is 50)
  const percentage = (score / 2700) * 100;

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

// Add a click event listener to the backspace button
const backspaceButton = document.getElementById("backspace-button");
backspaceButton.addEventListener("click", () => {
  // Remove the last character from the input field
  const input = document.getElementById("sentence-input");
  const currentInput = input.value;
  input.value = currentInput.slice(0, -1);
})
// Disable physical keyboard input
document.getElementById("sentence-input").addEventListener("keydown", function (event) {
    event.preventDefault();
  });
  function startGame() {
   playBackgroundMusic();
    displayNextSentence();
  }
  function displayNextSentence() {
    if (currentSentenceIndex < sentences.length) {
      document.getElementById("sentence-input").value = "";
      document.getElementById("current-sentence").textContent = sentences[currentSentenceIndex];
    } else {
      endGame();
    }
    gameContainer.style.display = "block";
    leaderboardContainer.style.display = "block";
    welcomeScreen.style.display = "none";
  
    // Clear the previous timer interval
    clearInterval(timerInterval);
  
    gameStartTime = new Date().getTime();
    const endTime = new Date(gameStartTime + gameDuration);
    updateTimer(endTime);
    timerInterval = setInterval(() => updateTimer(endTime), 1000);
    displayLeaderboard();
  }
  
 

stopGameButton.addEventListener("click", confirmStopGame);
    function confirmStopGame() {
        const confirmation = window.confirm("Are you sure you want to stop the game?");
        if (confirmation) {
                endGame();
            }
        }

        function checkSentence(input) {
          const inputWords = input.trim().toLowerCase().split(' ');
          const targetSentenceWords = sentences[currentSentenceIndex].toLowerCase().split(' ');
        
          const isCorrect = inputWords.every((word, index) => {
            return word === targetSentenceWords[index];
          });
        
          if (isCorrect) {
            score++;
            currentSentenceIndex++;
            displayNextSentence();
            displayMessage("Tama! Magpatuloy ka!"); // Display a congratulatory message for correct sentences
            playCorrectAudio()
          } else {
            displayMessage("Mali ang iyong nilagay na pangungusap"); // Display an error message for incorrect sentences
         playWrongAudio();
          }
        }
        
  function displayMessage(message) {
    const messageContainer = document.getElementById("message-container");
    messageContainer.textContent = message;
  }
  // Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle the sentences array
shuffleArray(sentences);
  
  function endGame() {
    clearInterval(timerInterval); // Stop the timer interval
    const gameEndTime = new Date().getTime();
    const elapsedTime = gameEndTime - gameStartTime;
    const messageContainer = document.getElementById("message-container");
    
    if (currentSentenceIndex >= sentences.length) {
      const message = `Mabuhay! Ang iyong puntos ay: ${score} `;
      messageContainer.textContent = message;
      
      // Update the high score in local storage if needed
      const highScore = localStorage.getItem("Pinakamataas na puntos") || 0;
      if (score > highScore) {
        localStorage.setItem("Pinakamataas na puntos", score);
      }
    } else {
      messageContainer.textContent = `Ang iyong puntos: ${score}`;
     alert(`Ang iyong puntos: ${score}`) 
    } 
   
    stopGameButton.style.display='none'
    submitButton.style.display='none'
    newGameButton.style.display='inline'
    displayLeaderboard();
    savePlayerScore(gameName, score); 
    updateScoreHistory(gameName, score);
    gameOver = true; // Set gameOver to true

    // Disable letter buttons
    abakadaLetters.forEach((letter) => {
      const button = document.querySelector(`.button:contains('${letter}')`);
      if (button) {
        button.disabled = true;
      }
    });
  }
  
  
  document.getElementById("sentence-input").addEventListener("input", function() {
    checkSentence(this.value);

  
  });

  
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
  function updateTimer(endTime) {
    const currentTime = new Date();
    const timeRemaining = endTime - currentTime;
    if (timeRemaining <= 0) {
      endGame();
    } else {
      const secondsRemaining = Math.floor(timeRemaining / 1000);
      document.getElementById("timer").textContent = `Time remaining: ${secondsRemaining} seconds`;
    }
  }
 

document.getElementById("submit-button").addEventListener("click", function () {
  const input = document.getElementById("sentence-input").value;
  checkSentence(input);
});

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

function updateScoreHistory(gameName, score) {
    // Verify inputs
    console.log('gameName:', gameName);
    console.log('score:', score);

    // Calculate percentage (assuming the maximum score is 50)
    const percentage = (score / 1000) * 100;

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




function displayLeaderboard() {
  // Fetch the leaderboard data from your server
  fetch('http://localhost:3000/sentence_get_score')
      .then(response => response.json())
      .then(scores => {
          // Get a reference to the leaderboard table
          const leaderboardTable = document.getElementById('leaderboard-table');
          const leaderboardBody = leaderboardTable.getElementsByTagName('tbody')[0];

          // Clear the existing leaderboard data
          leaderboardBody.innerHTML = '';

          // Iterate through the scores and populate the table
          scores.forEach(score => {
              const row = leaderboardBody.insertRow();
              const playerNameCell = row.insertCell(0);
              const scoreCell = row.insertCell(1);
              playerNameCell.textContent = score.name;
              scoreCell.textContent = score.score;
          });
      })
      .catch(error => {
          console.error('Error:', error);
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
function displayLeaderboard() {
  // Update the part of your client-side code that handles the /get-leaderboard response
  fetch('/get-leaderboard?gameName=sentence') // Provide the specific gameName for testing
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
  if (entry.scores && entry.scores.sentence !== undefined) {
    usernameCell.textContent = entry.username;
    scoreCell.textContent = entry.scores.sentence;
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
