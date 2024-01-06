
    // Define an array of target letters for 20 challenges (Abakada alphabet)
    const targetLetters = ["A", "B", "K", "D", "E", "G", "H", "I", "L", "M", "N", "NG", "O", "P", "R", "S", "T", "U", "W", "Y"];
    const questions = [
        "Hanapin ang titik 'A':",
        "Hanapin ang titik 'B':",
        "Hanapin ang titik 'K':",
        "Hanapin ang titik 'D':",
        "Hanapin ang titik 'E':",
        "Hanapin ang titik 'G':",
        "Hanapin ang titik 'H':",
        "Hanapin ang titik 'I':",
        "Hanapin ang titik 'L':",
        "Hanapin ang titik 'M':",
        "Hanapin ang titik 'N':",
        "Hanapin ang titik 'NG':",
        "Hanapin ang titik 'O':",
        "Hanapin ang titik 'P':",
        "Hanapin ang titik 'R':",
        "Hanapin ang titik 'S':",
        "Hanapin ang titik 'T':",
        "Hanapin ang titik 'U':",
        "Hanapin ang titik 'W':",
        "Hanapin ang titik 'Y':"
    ];
    

    const gameContainer = document.getElementById("game-container");
    const questionContainer = document.getElementById("question");
    const startButton = document.getElementById("start-game-button");
    const timerDisplay = document.getElementById("timer");
    const messageDisplay = document.getElementById("message");
    const scoreDisplay = document.getElementById("score");
    const startGameButton = document.getElementById("start-game-button");
    const welcomeScreen = document.getElementById("welcome-screen");
    const container = document.getElementById("container");
    const starContainer = document.getElementById("star-mcontainer");
    const newGame = document.getElementById("new-game");
    const leaderboardContainer= document.getElementById("leaderboard-container");
   


    let currentChallengeIndex = 0;
    let targetLetter;
    const attempts = 2;
    let maxWrongAttempts = 3;
    let wrongAttemptsCount = 0;
    let remainingAttempts = attempts;
    let score = 0;
    let isGameOver = false;
    const reshuffleInterval = 1000;
    let boxLetters;
    let gameName='catchtheletter';
     let scoreSaved = false;
 
    startGameButton.addEventListener("click", startGame);

    function startGame() {
        wrongAttemptsCount = 0;
        playBackgroundMusic();
        gameContainer.innerHTML = '';
        remainingAttempts = attempts;
        gameContainer.style.display = 'flex';
       leaderboardContainer.style.display='inline'
       displayLeaderboard()
        targetLetter = targetLetters[currentChallengeIndex];
        questionContainer.textContent = `Tanong ${currentChallengeIndex + 1}: ${questions[currentChallengeIndex]}`;

        welcomeScreen.style.display = "none";

        boxLetters = generateRandomLetters(targetLetter);

        let reshuffleCount = 0;
        const totalReshuffles = 4;

        const reshuffleIntervalId = setInterval(() => {
            shuffleArray(boxLetters);
            updateBoxLetters(boxLetters);
            reshuffleCount++;

            if (reshuffleCount >= totalReshuffles) {
                clearInterval(reshuffleIntervalId);

                setTimeout(() => {
                    hideLetters();
                    enableBoxClicks(targetLetter);
                }, 1000);
            }
        }, 1000);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i].letter, array[i].color, array[j].letter, array[j].color] =
                [array[j].letter, array[j].color, array[i].letter, array[i].color];
        }
    }

    function handleBoxClick(event, targetLetter) {
        const clickedBox = event.target;

        if (clickedBox.textContent === targetLetter) {
            clickedBox.style.backgroundColor = "blue";
            clickedBox.textContent = targetLetter;
            score += 50;
            scoreDisplay.textContent = `Puntos: ${score}`;

            playSound(targetLetter);

            currentChallengeIndex++;

            if (currentChallengeIndex === targetLetters.length || currentChallengeIndex >= 20) {
                showMessage(`Natapos mo na ang lahat ng mga hamon. Iyong puntos: ${score}.`, true);
                startButton.style.display = "none";
            } else {
                setTimeout(startGame, 2000);
            }
        } else {
            playWrongAudio();
            wrongAttemptsCount++;

            if (wrongAttemptsCount >= maxWrongAttempts) {
                gameOver();
            } else if (remainingAttempts === 0) {
                revealCorrectBox();

                showMessage(`Maling kahon! ${remainingAttempts} natitirang pagkakataon.`, false);
                currentChallengeIndex++;

                if (currentChallengeIndex === targetLetters.length || currentChallengeIndex >= 20) {
                    showMessage(`Natapos mo na ang lahat ng mga hamon. Iyong puntos: ${score}.`, true);
                    startButton.style.display = "none";
                } else {
                    setTimeout(startGame, 2000);
                }
            } else {
                showMessage(`Maling kahon! ${remainingAttempts} natitirang pagkakataon.`, false);
            }
        }
    }

    function gameOver() {
        isGameOver = true;
        alert(`Game over! Nasira mo ang laro. Iyong puntos: ${score}.`);
        startButton.style.display = "none";
        disableBoxClicks(); // Disable box clicks
        currentChallengeIndex = 0;
        scoreDisplay.textContent = `Puntos: ${score}`;
        messageDisplay.textContent = '';
        isGameOver = false;
    
        savePlayerScore(gameName, score);
        displayLeaderboard();
    
        // Call startGame after the player clicks "OK"
        startGame();
    }
 
    function playWrongAudio() {
        const wrongAudio = document.getElementById("wrongAudio");
        wrongAudio.play().catch(error => {
            console.error("Error playing wrong answer audio:", error);
        });
    }
    
   

    function disableBoxClicks() {
        const boxes = document.querySelectorAll(".box");
        boxes.forEach(box => box.removeEventListener("click", boxClickHandler));
    }

    function boxClickHandler(event) {
        handleBoxClick(event, targetLetter);
    }

    function revealCorrectBox() {
        const boxes = document.querySelectorAll(".box");
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].textContent === targetLetter) {
                boxes[i].classList.add("revealed-correct-box");
                break;
            }
        }
    }

    function playSound(letter) {
        const audioId = `sound${letter}`;
        const audio = document.getElementById(audioId);

        if (audio) {
            audio.play();
        }
    }

    function showMessage(message, isWin) {
        messageDisplay.textContent = message;
        messageDisplay.style.color = isWin ? "green" : "red";
        setTimeout(() => {
            messageDisplay.textContent = '';
        }, 2000);
    }

    function generateRandomLetters(targetLetter) {
        const abakadaLetters = ["A", "B", "K", "D", "E", "G", "H", "I", "L", "M", "N", "NG", "O", "P", "R", "S", "T", "U", "W", "Y"];

        const availableLetters = abakadaLetters.filter(letter => letter !== targetLetter);
        shuffleArray(availableLetters);

        const selectedLetters = availableLetters.slice(0, 19).map(letter => ({ letter, color: getRandomColor() }));
        selectedLetters.push({ letter: targetLetter, color: getRandomColor() });

        for (let i = 0; i < 20; i++) {
            const box = document.createElement("div");
            box.className = "box";

            const boxContent = document.createElement("span");
            boxContent.className = "box-content";
            boxContent.textContent = selectedLetters[i].letter;

            box.appendChild(boxContent);
            box.style.backgroundColor = selectedLetters[i].color;
            gameContainer.appendChild(box);

            if (selectedLetters[i].letter === targetLetter) {
                box.classList.add("target-box");
            }
        }

        return selectedLetters;
    }

    function updateBoxLetters(letters) {
        const boxes = document.querySelectorAll(".box-content");
        boxes.forEach((box, index) => {
            box.textContent = letters[index].letter;
            box.style.color = "white";
            box.classList.remove("hide-letter");
        });
    }

    function hideLetters() {
        const boxContents = document.querySelectorAll(".box-content");
        boxContents.forEach(boxContent => {
            boxContent.classList.add("hide-letter");
        });
    }

    function getRandomColor() {
        const availableColors = ["#1eb0bd", "#5ebd1e", "#7bbd1e"];
        return availableColors[Math.floor(Math.random() * availableColors.length)];
    }

    function enableBoxClicks(targetLetter) {
        const boxes = document.querySelectorAll(".box");
    
        function boxClickHandler(event) {
            handleBoxClick(event, targetLetter);
            // Remove the click event listener after the correct box is clicked
            event.target.removeEventListener("click", boxClickHandler);
        }
    
        boxes.forEach(box => box.addEventListener("click", boxClickHandler));
    }
    
    function playAgain() {
        currentChallengeIndex = 0;
        score = 0;
        scoreDisplay.textContent = `Puntos: ${score}`;
        messageDisplay.textContent = '';
        startGame();
    }

    // Initial game start
    function playBackgroundMusic() {
        const backgroundMusic = document.getElementById("backgroundMusic");
        if (backgroundMusic) {
            document.addEventListener("click", () => {
                backgroundMusic.play().catch(error => {
                    console.error("Error playing background music:", error);
                });
            }, { once: true });
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

  
 
  function displayLeaderboard() {
    // Update the part of your client-side code that handles the /get-leaderboard response
    fetch('/get-leaderboard?gameName=catchtheletter') // Provide the specific gameName for testing
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
    if (entry.scores && entry.scores.catchtheletter !== undefined) {
      usernameCell.textContent = entry.username;
      scoreCell.textContent = entry.scores.catchtheletter;
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



  
  