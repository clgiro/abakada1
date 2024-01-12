const riddles = [];

let currentRiddleIndex = 0;
let score = 0;
let timer;
let gameName='quiz'
const gameContainer= document.getElementById("game-container")
const leaderboardContainer= document.getElementById("leaderboard-container")
const welcomeScreen=document.getElementById("welcome-screen")





document.getElementById("start-game-button").addEventListener("click", function () {
   
            // Display the game container and leaderboard
           
           startNewGame();
        
        
  

    
});

async function getQuestions() {
    try {
        const response = await fetch('/get-questions');
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Server Response:', data); // Log the response

        if (data.success) {
            riddles.push(...data.questions);
            shuffleArray(riddles);
        } else {
            console.error('Failed to fetch questions:', data.error);
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}
getQuestions();
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(riddles);

function startTimer() {
    const timerElement = document.getElementById("timer");
    let seconds = 10; // 3 minutes

    function updateTimer() {
        timerElement.textContent = `Oras: ${seconds} segundo`;

        if (seconds <= 0) {
            clearInterval(timer);
            endGame();
        } else {
            seconds--;
        }
    }

    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function displayRiddle() {
    const riddleElement = document.getElementById("riddle");
    riddleElement.textContent = riddles[currentRiddleIndex].question;
    clearInterval(timer);

    startTimer()
}

function generateChoices() {
    const choicesElement = document.getElementById("choices");
    choicesElement.innerHTML = "";

    const choices = riddles[currentRiddleIndex].choices;
    for (const choice of choices) {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", () => {
            selectChoice(choice);
        });
        choicesElement.appendChild(choiceButton);
    }
}

function selectChoice(choice) {
    const messageElement = document.getElementById("message");

    const userAnswer = choice.toLowerCase();
    const correctAnswer = riddles[currentRiddleIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        messageElement.textContent = "Tama!";
        score++;
    } else {
        messageElement.textContent = "Hindi tama. Subukan ulit.";
    }

    currentRiddleIndex++;
    if (currentRiddleIndex < riddles.length) {
        displayRiddle();
        generateChoices();
        messageElement.textContent = "";
    } else {
        endGame();
    }
}

function endGame() {
    const messageElement = document.getElementById("message");
    const timerElement = document.getElementById("timer");
    const newGameButton = document.getElementById("new-game-button");
    const stopGameButton = document.getElementById("stop-game-button");

    // Disable choice buttons
    const choices = document.getElementById("choices").getElementsByTagName("button");
    for (const choiceButton of choices) {
        choiceButton.disabled = true;
    }

    stopGameButton.style.display = "none";
    messageElement.textContent = `Laro natapos! Iyong Score: ${score} sa ${riddles.length}`;
   
   alert(`Laro natapos! Iyong Score: ${score} sa ${riddles.length}`)
    clearInterval(timer);
    newGameButton.style.display = "block";
    savePlayerScore(gameName, score)
   updateScoreHistory(gameName, score)
    displayLeaderboard();
}

function startNewGame() {
    currentRiddleIndex = 0;
    score = 0;
    shuffleArray(riddles);
    displayRiddle();
    generateChoices();
    playBackgroundMusic();
    const messageElement = document.getElementById("message");
    messageElement.textContent = "";
    const newGameButton = document.getElementById("new-game-button");
    newGameButton.style.display = "none";
    stopGameButton.style.display="block";
    displayLeaderboard(); 
    
    gameContainer.style.display = 'block';
            leaderboardContainer.style.display = 'block';
            welcomeScreen.style.display='none'
}

const stopGameButton = document.getElementById("stop-game-button");
stopGameButton.addEventListener("click", confirmStopGame);

const newGameButton = document.getElementById("new-game-button");
newGameButton.addEventListener("click", function(){
    location.reload();
});

function confirmStopGame() {
    const confirmation = window.confirm("Gusto muna ba matigil ang laro?");
    if (confirmation) {
        endGame();
    }
}
function updateScoreHistory(gameName, score) {
    // Verify inputs
    console.log('gameName:', gameName);
    console.log('score:', score);

    // Fetch total number of questions
    fetch('/get-question-count') // Assuming you have an endpoint to get the question count
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Calculate percentage based on the total number of questions
                const totalQuestions = data.questionCount;
                const percentage = (score / totalQuestions) * 100;

                // Add the percentage to the user's scoreHistory
                return fetch('/update-score-history', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ gameName, percentage }),
                });
            } else {
                throw new Error('Failed to fetch question count.');
            }
        })
        .then(response => response.json())
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
// Function to save player scores


function savePlayerScore(gameName, score) {
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

function displayLeaderboard() {
    // Update the part of your client-side code that handles the /get-leaderboard response
    fetch('/get-leaderboard?gameName=quiz') // Provide the specific gameName for testing
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
    if (entry.scores && entry.scores.quiz !== undefined) {
      usernameCell.textContent = entry.username;
      scoreCell.textContent = entry.scores.quiz;
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

  