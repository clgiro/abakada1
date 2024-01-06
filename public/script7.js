const riddles = [
    { question: "Ang ba-ta ay ma-sa-__", choices: ["ya", "wa", "sa", "ga"], answer: "ya" },
    { question: "Si Mi-na ay nag-ba-ba-__", choices: ["pa", "ga", "in", "sa"], answer: "sa" },
    { question: "Ang ba-hag-ha-ri ay ma-__-lay", choices: ["mu", "ti", "ku", "ya"], answer: "ku" },
    { question: "Si A-na ay na-ka-ba-bad sa a-__", choices: ["mu", "raw", "ku", "ya"], answer: "raw" },
    { question: "Ang a-la-___ ng a-tis ay ka-mang-ha-mang-ha", choices: ["kit", "yan", "mat", "kan"], answer: "mat" },
    { question: "Ang a-poy ay hu-__-hi-na", choices: ["ol", "ki","mi", "ta"], answer: "mi" },
    { question: "Si A-ni ay nag-ba-ba-sa ng ak-___", choices: ["lat", "wa", "sa", "ga"], answer: "lat" },
    { question: "Ang ale ay a-ba-lang gu-ma-__-wa ng a-pa-ra-dor", choices: ["ga", "ga", "in", "sa"], answer: "ga" },
    { question: "Bu-mi-li a-ko ng ba-gong ___-ro sa tin-da-han.", choices: ["mu", "lib", "ku", "ya"], answer: "lib" },
    { question: "Bu-__-si-ta ka-mi sa ma-gan-dang ba-hay ni Lo-la", choices: ["mi", "yan", "mat", "kan"], answer: "mi" },
    { question: "Bi-ni-si-ta na-min ang ba-___ ng a-ming ka-i-bi-gan.", choices: ["hay", "kat","tso", "pok"], answer: "hay" },
    { question: "Bu-mi-lang a-ko ng sam-pung bu-___-lak sa har-din.", choices: ["ya", "wa", "sa", "lak"], answer: "lak" },
    { question: "Nag-lu-to si Na-nay ng __-sa-rap na bi-ko.", choices: ["pa", "ga", "in", "ma"], answer: "ma" },
    { question: "Di-na-law ka-mi sa da-ti na-ming ba-___ sa Du-ma-gue-te.", choices: ["mu", "ti", "hay", "ya"], answer: "hay" },
    { question: "Du-mu-du-log sa duk-tor ang da-la-wang ___-ka-i-bi-gan..", choices: ["kit", "mag", "mat", "kan"], answer: "mag" },
    { question: "Du-ma-ting ang di-___, ka-ya't a-gad a-kong su-mi-long sa lo-ob ng ba-hay.", choices: ["yip", "lim","tso", "pok"], answer: "lim" },
    { question: "Du-ma-yo ka-mi sa da-lam-pa-si-gan at nag-la-ro sa bu-__-ngin.", choices: ["ha", "ti", "ku", "ya"], answer: "ha" },
    { question: "Da-la-wang da-ang pi-__ ang ha-la-ga ng ba-gong la-ru-an ni A-lex.", choices: ["so", "wa", "sa", "ga"], answer: "so" },
    { question: "Si E-ba ay na-sa Es-___-la-han", choices: ["pa", "ga", "kwe", "sa"], answer: "kwe" },
    { question: "Ma-ha-la-ga ang e-__-kas-yon", choices: ["mu", "ti", "ku", "du"], answer: "du" },
    { question: "Si E-ma ay su-__-kay sa E-ro-pla-no", choices: ["kit", "yan", "ma", "kan"], answer: "ma" },
    { question: "Nag e-e-her-sis-yo si El-yas tu-wing u-ma-ga", choices: ["yip", "kat","her", "pok"], answer: "her" },
    { question: "Ma-ta-as ang __-kul-tu-ra", choices: ["ya", "es", "sa", "ga"], answer: "es" },
    { question: "Gus-to ko ang gu-lay, la-lo na ang mga __-lay mu-la sa a-ming har-din.", choices: ["gu", "ti", "ku", "ya"], answer: "gu" },
    { question: "Gu-mi-sing ako nang ma-a-ga u-pang mag-si-mu-la sa a-king mga ga-__-in", choices: ["kit", "yan", "mat", "wa"], answer: "wa" },
    { question: "Gus-to na-min ng ma-___-dang pa-na-hon u-pang mag-la-ro sa la-bas.", choices: ["yip", "kat","gan", "pok"], answer: "gan" },
    { question: "Gus-to kong mag-ba-sa ng mga ma-ga-gan-dang ku-wen-to ba-go ma-__-log.", choices: ["tu", "yan", "mat", "wa"], answer: "tu" },
    { question: "Gus-to kong gu-mu-___ at mag-ku-lay ga-mit ang a-king mga la-pis.", choices: ["ya", "wa", "hit", "ga"], answer: "hit" },
    { question: "Ha-bang nag-la-la-ro sa ___-din, na-ki-ta na-min ang i-sang pa-ru-pa-ro.", choices: ["pa", "ga", "har", "sa"], answer: "har" },
    { question: "Hi-na-ya-an na-min ang a-ming mga __-ri-li na lu-ma-ngoy sa i-log nang wa-lang ka-ba.", choices: ["sa", "yan", "mat", "kan"], answer: "sa" },
    { question: "Hi-na-ha-nap-ha-nap na-min ang ba-___-yon tu-wing tag-init.", choices: ["yip", "kat","tso", "kas"], answer: "kas" },
    { question: "Ha-bang u-mu-ul-an, na-tu-tu-wa a-kong tu-ma-lon sa mga ma-la-la-king bu-___.", choices: ["mu", "tas", "ku", "ya"], answer: "tas" },
    { question: "Ma-sa-___ ang is-da", choices: ["ya", "wa", "sa", "rap"], answer: "rap" },
    { question: "ma-li-__-nag ang i-law", choices: ["wa", "ga", "in", "sa"], answer: "wa" },
    { question: "ang i-ngay ng ins-tru-___-to", choices: ["mu", "ti", "ku", "men"], answer: "men" },
    { question: "Ki-nu-ha ko ang a-king kwa-___-no sa me-sa", choices: ["kit", "der", "mat", "kan"], answer: "der" },
    { question: "Ki-nu-ha ng a-king ka-pa-tid ang a-king ___-ko-la-te.", choices: ["yip", "kat","tso", "pok"], answer: "tso" },
    { question: "Ang La-pis ay ka-ta-bi ng la-___-yan ng lu-mang da-mit", choices: ["lag", "wa", "sa", "ga"], answer: "lag" },
    { question: "Ang ___-do ay ma-la-ki", choices: ["pa", "ga", "in", "mun"], answer: "mun" },
    { question: "Mu-si-__ ang na-is ni Mi-lo na ma-tu-tu-nan", choices: ["ka", "ti", "ku", "ya"], answer: "ka" },
    { question: "Ma-ba-ngo ang __-nog na man-sa-nas", choices: ["kit", "yan", "mat", "hi"], answer: "hi" },
    { question: "Ang Ni-yog ay ma-ra-__ sa na-yon", choices: ["yip", "kat","tso", "mi"], answer: "mi" },
    { question: "Ang Nu-___ ni Ni-na ay ma-la-ki", choices: ["ya", "wa", "nal", "ga"], answer: "nal" },
    { question: "Ma-ra-ming Nu-no ang  ___-la-la-kad sa pun-so", choices: ["pa", "ga", "nag", "sa"], answer: "nag" },
    { question: "Sa Nor-te si Nin-ya nag-a-___ ng ing-les", choices: ["mu", "ral", "ku", "ya"], answer: "ral" },




];  

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
    messageElement.textContent = `Laro natapos! Iyong Score: ${score}`;
     alert(`Laro natapos! Iyong Score: ${score}`) ;
    clearInterval(timer);
    newGameButton.style.display = "block";
    savePlayerScore(gameName, score)
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
function savePlayerScore() {
    fetch('http://localhost:3000/riddle_save_score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playerName, score: score }),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
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

  