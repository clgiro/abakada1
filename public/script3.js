const riddles = [
    // ... (your riddles data here)
    { question: "Dalawang batong itim, malayo ang nararating", choices: ["mata", "bibig", "ilong", "paa"], answer: "mata" },
    { question: "Nakayuko ang reyna di nalalaglag ang korona", choices: ["mansanas", "bayabas", "tsokolate", "sampalok"], answer: "bayabas" },
    { question: "Ate mo, ate ko, ate ng lahat ng tao.", choices: ["mangga", "bayabas", "atis", "sampalol"], answer: "atis" },
    { question: "Isang prinsesa nakaupo sa tasa.", choices: ["sibuyas", "bawang", "ibon", "kasoy"], answer: "kasoy" },
    { question: "Isda ko sa maribeles nasa loob ang kaliskis", choices: ["sili", "paminta", "asin", "mantika"], answer: "sili" },
    { question: "Ulan nang ulan, hindi pa rin mabasa ang tiyan.", choices: ["dahon ng saging", "dahon ng gabi", "dahon ng atis", "dahon ng bayabas"], answer: "dahon ng gabi" },
    { question: "Maliit na bahay, puno ng mga patay.", choices: ["aparador", "damit", "posporo", "suklay"], answer: "posporo" },
    { question: "May puno walang bunga, may dahon walang sanga.", choices: ["baso", "tinedor", "kutsara", "sandok"], answer: "sandok" },
    { question: "Hayan na si kaka bubuka-bukaka.", choices: ["gunting", "papel", "lapis", "bakal"], answer: "gunting" },
    { question: "Nagtago si Pedro nakalabas ang ulo", choices: ["pusa", "pako", "damit", "santol"], answer: "pako" },
    { question: "Dumaan ang hari, nagkagatan ang mga pari.", choices: ["bahay", "pako", "zipper", "lapis"], answer: "zipper" },
    { question: "Bumili ako ng alipin, mataas pa sa akin.", choices: ["pusa", "damit", "ibon", "sumbrero"], answer: "sumbrero" },
    { question: "Isa ang pasukan, tatlo ang labasan.", choices: ["blusa", "kamiseta", "ibon", "palda"], answer: "kamiseta" },
    { question: "Kung kailan mo pinatay, saka pa humaba ang buhay.", choices: ["kandila", "apoy", "bahay", "kubo"], answer: "kandila" },
    { question: "Ako’y aklat ng panahon, binabago taun-taon.", choices: ["kakanin", "aso", "kalendaryo", "blusa"], answer: "kalendaryo" },
    {question: "Maraming paa, walang kamay, may pamigkis sa baywang ang ulo’y parang tagayan, alagad ng kalinisan.", choices:["gulay", "gagamba","tela", "walis"], answer: "walis"},
    {question: "Alalay kong bilugan, puro tubig ang tiyan.", choices:["batya", "tsinelas","damit", "upuan"], answer: "batya"},
    {question: "Nagbibihis araw-araw, nag-iiba ng pangalan.", choices:["telebisyon", "papel","kalendaryo", "libro"], answer: "kalendaryo"},
    {question: "Itapon mo kahit saan, babalik sa pinanggalingan.", choices:["suklay", "torompo","yoyo", "alitaptap"], answer: "yoyo"},
    {question: "Walang paa, lumalakad, walang bibig, nangungusap, walang hindi hinaharap na may dala-dalang sulat.", choices:["sobre", "gunting","dahon", "walis"], answer: "sobre"},
    {question: "Isang panyong parisukat, kung buksa’y nakakausap.", choices:["guhit", "libro","liham", "sulat"], answer: "sulat"},
    {question: "Dalawang magkaibigan, magkadikit ang baywang; kapag silay’y nag papasyal, nahahawi ang daanan.", choices:["yoyo", "gunting","langgam", "alitaptap"], answer: "gunting"},
    {question: "Pitong bundok, pitong lubak, tig-pitong anak.", choices:["gulay", "kalendaryo","sungkaan", "dama"], answer: "sungkaaan"},
    {question: "Matanda na ang nuno di pa naliligo ", choices:["langgam", "gagamba","aso", "pusa"], answer: "pusa"},
    {question: "Maliit pa si kumpare, nakakaakyat na sa tore.", choices:["lanngam", "pusa","gagamba", "ipis"], answer: "langgam"},
    {question: "Heto na si Kaka, bubuka-bukaka.", choices:["kutsara", "gunting","papel", "pera"], answer: "gunting"},
    {question: "Kaaway ni Bantay, may siyam na buhay.", choices:["gagamba", "ipis","ibon", "pusa"], answer: "pusa "},
    {question: "Maliit pa si kumare, marunong ng humuni", choices:["kuliglig", "gagamba","ibon", "tigre"], answer: "kuliglig"},
    {question: "Kahoy ko sa Marigundong, sumasanga’y walang dahon.", choices:["sungay ng kalabaw", "sungay ng usa","sungay ng ipis", "sungay ng baka"], answer: "sungay ng usa"},
    {question: "Hindi pari, hindi hari, nagdadamit ng sari-sari.", choices:["tutubi", "ipis","paruparo", "ibon"], answer: "paruparo"},
    {question: "Mataas kung nakaupo mababa kung nakatayo.", choices:["koneho", "ibon","pusa", "aso"], answer: "aso"},
    {question: "Nakakaluto’y walang init, umuusok kahit na malamig.", choices:["yelo", "apoy","tubig", "lupa"], answer: "yelo"},
    {question: "Hindi naman hari, hindi naman pare, nagsusuot ng sarisari", choices:["tindahan", "sampayan","gusali", "bahay"], answer: "sampayan"},
    {question: "Baka ko sa palupandan, unga’y nakakarating kahit saan.", choices:["ulan", "buhawi","kulog", "lindol"], answer: "kulog"},
    {question: "May bintana nguni’t walang bubungan, may pinto nguni’t walang hagdanan.", choices:["pintuan", "paaralan","simbahan", "kumpisalan"], answer: "kumpisalan"},
    {question: "Palda ni Santa Maria, ang kulay ay iba-iba", choices:["bahaghari", "ulap","araw", "bituin"], answer: "bahaghari"},
    {question: "Ako ay may kaibigan, kasama ko kahit saan.", choices:["suka", "anino","liwanag", "amoy"], answer: "anino"},
    {question: "Puno ay layu-layo, dulo’y tagpu-tagpo.", choices:["paaralan", "tindahan","bahay", "kubo"], answer: "bahay"},
    {question: "Buto’t balat lumilipad.", choices:["kotse", "eroplano","tsokolate", "saranggola"], answer: "saranggola"},




];  

let currentRiddleIndex = 0;
let score = 0;
let timer;
let gameName='riddle'
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
    messageElement.textContent = `Laro natapos! Iyong Score: ${score} sa ${riddles.length}`;
   
   alert(`Laro natapos! Iyong Score: ${score} sa ${riddles.length}`)
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
    fetch('/get-leaderboard?gameName=riddle') // Provide the specific gameName for testing
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
    if (entry.scores && entry.scores.riddle !== undefined) {
      usernameCell.textContent = entry.username;
      scoreCell.textContent = entry.scores.riddle;
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

  