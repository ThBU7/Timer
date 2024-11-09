let workTime = 60;
let restTime = 30;
let isWorking = true;
let remainingTime = workTime;
let timerRunning = false;
let timerId;
let audio;  // Variable pour stocker la musique

const timerLabel = document.getElementById("timer");
const statusLabel = document.getElementById("status");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const setTimeButton = document.getElementById("setTimeButton");
const workTimeInput = document.getElementById("workTime");
const restTimeInput = document.getElementById("restTime");
const playMusicButton = document.getElementById("playMusicButton");
const stopMusicButton = document.getElementById("stopMusicButton");
const workMusicSelect = document.getElementById("workMusicSelect");
const restMusicSelect = document.getElementById("restMusicSelect");

// Fonction pour mettre à jour le chronomètre
function updateTimer() {
    if (remainingTime > 0) {
        remainingTime--;
        timerLabel.textContent = remainingTime;
    } else {
        isWorking = !isWorking;
        remainingTime = isWorking ? workTime : restTime;
        statusLabel.textContent = isWorking ? "Travail" : "Pause";

        // Changer la musique selon l'état
        playMusic(isWorking);
    }
}

// Fonction pour démarrer le chronomètre
function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        timerId = setInterval(updateTimer, 1000);
        playMusic(isWorking); // Commence à jouer la musique selon l'état actuel
    }
}

// Fonction pour arrêter le chronomètre
function stopTimer() {
    if (timerRunning) {
        timerRunning = false;
        clearInterval(timerId);
        stopMusic();  // Arrête la musique quand le chronomètre est arrêté
    }
}

// Fonction pour modifier les temps de travail et de pause
function setTime() {
    workTime = parseInt(workTimeInput.value);
    restTime = parseInt(restTimeInput.value);
    remainingTime = isWorking ? workTime : restTime;
    timerLabel.textContent = remainingTime;
}

// Fonction pour lire la musique selon l'état (travail ou pause)
function playMusic(isWork) {
    const selectedMusic = isWork ? workMusicSelect.value : restMusicSelect.value; // Chemin de la musique sélectionnée
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    audio = new Audio(selectedMusic);
    audio.play();
}

// Fonction pour arrêter la musique
function stopMusic() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

// Ajouter les événements pour les boutons
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
setTimeButton.addEventListener("click", setTime);
playMusicButton.addEventListener("click", () => playMusic(isWorking));
stopMusicButton.addEventListener("click", stopMusic);
