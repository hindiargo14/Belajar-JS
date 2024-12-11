// Variabel untuk menyimpan waktu, interval, dan status
let time = 0;
let interval;
let isRunning = false;
let lapTimes = [];

// Elemen UI
const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const lapButton = document.getElementById('lapButton');
const resetButton = document.getElementById('resetButton');
const lapTimesDisplay = document.getElementById('lapTimes');

// Fungsi untuk format waktu dalam menit:detik
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Fungsi untuk memulai stopwatch
function startStopwatch() {
    interval = setInterval(() => {
        time++;
        timeDisplay.textContent = formatTime(time);
    }, 1000);
    isRunning = true;
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');
    lapButton.classList.remove('hidden');
    resetButton.classList.add('hidden');
}

// Fungsi untuk menghentikan stopwatch
function stopStopwatch() {
    clearInterval(interval);
    isRunning = false;
    stopButton.classList.add('hidden');
    lapButton.classList.add('hidden');
    resetButton.classList.remove('hidden');
}

// Fungsi untuk mencatat waktu Lap
function lapStopwatch() {
    lapTimes.push(formatTime(time));
    lapTimesDisplay.innerHTML = '<h3>Lap Times</h3>' + lapTimes.map((lap, index) => `<p>Lap ${index + 1}: ${lap}</p>`).join('');
}

// Fungsi untuk mereset stopwatch dan lap times
function resetStopwatch() {
    clearInterval(interval);
    time = 0;
    lapTimes = [];
    timeDisplay.textContent = formatTime(time);
    lapTimesDisplay.innerHTML = '';
    startButton.classList.remove('hidden');
    stopButton.classList.add('hidden');
    lapButton.classList.add('hidden');
    resetButton.classList.add('hidden');
}

// Event listener untuk tombol
startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
lapButton.addEventListener('click', lapStopwatch);
resetButton.addEventListener('click', resetStopwatch);
