// --- Core State Variables ---
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 0;

// --- DOM Nodes Elements ---
const display = document.getElementById('display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const lapList = document.getElementById('lap-list');

// --- Event Triggers ---
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetTimer);

// --- Operational Functions ---
function startTimer() {
    // Sync starting point base reference anchor
    startTime = Date.now() - elapsedTime;
    
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = formatTime(elapsedTime);
    }, 10); // Update roughly every 10ms for highly fluid rendering

    // Handle button interface visibility rules
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    
    // Clear out stored timeline memories
    elapsedTime = 0;
    lapCount = 0;
    
    // Reset DOM defaults safely
    display.innerHTML = '00:00:00.<span class="ms">00</span>';
    lapList.innerHTML = '';
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLap() {
    lapCount++;
    const formattedLapTime = formatTime(elapsedTime);
    
    // Construct dynamic list item component
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="lap-index">Lap ${String(lapCount).padStart(2, '0')}</span>
        <span class="lap-time">${formattedLapTime}</span>
    `;
    
    // Insert new lap directly at the top of history sequence stack
    lapList.insertBefore(li, lapList.firstChild);
}

// --- Time Parsing Helper Engine ---
function formatTime(msTotal) {
    let milliseconds = Math.floor((msTotal % 1000) / 10);
    let seconds = Math.floor((msTotal / 1000) % 60);
    let minutes = Math.floor((msTotal / (1000 * 60)) % 60);
    let hours = Math.floor((msTotal / (1000 * 60 * 60)) % 24);

    // Padding parameters formatting numbers systematically
    let hrsStr = String(hours).padStart(2, '0');
    let minsStr = String(minutes).padStart(2, '0');
    let secsStr = String(seconds).padStart(2, '0');
    let msStr = String(milliseconds).padStart(2, '0');

    return `${hrsStr}:${minsStr}:${secsStr}.<span class="ms">${msStr}</span>`;
}